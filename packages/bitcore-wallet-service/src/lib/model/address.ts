import { Deriver } from 'crypto-wallet-core';
import _ from 'lodash';
import { AddressManager } from './addressmanager';

const $ = require('preconditions').singleton();
const Common = require('../common');
const Constants = Common.Constants,
  Defaults = Common.Defaults,
  Utils = Common.Utils;

export interface IAddress {
  version: string;
  createdOn: number;
  address: string;
  walletId: string;
  isChange: boolean;
  path: string;
  publicKeys: string[];
  coin: string;
  network: string;
  type: string;
  hasActivity: boolean;
  beRegistered: boolean;
}

export class Address {
  version: string;
  createdOn: number;
  address: string;
  walletId: string;
  isChange: boolean;
  path: string;
  publicKeys: string[];
  coin: string;
  network: string;
  type: string;
  hasActivity: boolean;
  beRegistered: boolean;

  static Astracore = {
    btc: require('astracore-lib'),
    bch: require('astracore-lib-cash'),
  };

  static create(opts) {
    opts = opts || {};

    const x = new Address();

    $.checkArgument(Utils.checkValueInCollection(opts.coin, Constants.COINS));

    x.version = '1.0.0';
    x.createdOn = Math.floor(Date.now() / 1000);
    x.address = opts.address;
    x.walletId = opts.walletId;
    x.isChange = opts.isChange;
    x.path = opts.path;
    x.publicKeys = opts.publicKeys;
    x.coin = opts.coin;
    x.network = Address.Astracore[opts.coin]
      ? Address.Astracore[opts.coin].Address(x.address).toObject().network
      : opts.network;
    x.type = opts.type || Constants.SCRIPT_TYPES.P2SH;
    x.hasActivity = undefined;
    x.beRegistered = null;
    return x;
  }

  static fromObj(obj) {
    const x = new Address();

    x.version = obj.version;
    x.createdOn = obj.createdOn;
    x.address = obj.address;
    x.walletId = obj.walletId;
    x.coin = obj.coin || Defaults.COIN;
    x.network = obj.network;
    x.isChange = obj.isChange;
    x.path = obj.path;
    x.publicKeys = obj.publicKeys;
    x.type = obj.type || Constants.SCRIPT_TYPES.P2SH;
    x.hasActivity = obj.hasActivity;
    x.beRegistered = obj.beRegistered;
    return x;
  }

  static _deriveAddress(scriptType, publicKeyRing, path, m, coin, network, noNativeCashAddr) {
    $.checkArgument(Utils.checkValueInCollection(scriptType, Constants.SCRIPT_TYPES));

    const publicKeys = _.map(publicKeyRing, (item) => {
      const xpub = Address.Astracore[coin]
        ? new Address.Astracore[coin].HDPublicKey(item.xPubKey)
        : new Address.Astracore.btc.HDPublicKey(item.xPubKey);
      return xpub.deriveChild(path).publicKey;
    });

    let astracoreAddress;
    switch (scriptType) {
      case Constants.SCRIPT_TYPES.P2WSH:
        const nestedWitness = false;
        astracoreAddress = Address.Astracore[coin].Address.createMultisig(
          publicKeys,
          m,
          network,
          nestedWitness,
          'witnessscripthash'
        );
        break;
      case Constants.SCRIPT_TYPES.P2SH:
        astracoreAddress = Address.Astracore[coin].Address.createMultisig(publicKeys, m, network);
        break;
      case Constants.SCRIPT_TYPES.P2WPKH:
        astracoreAddress = Address.Astracore.btc.Address.fromPublicKey(publicKeys[0], network, 'witnesspubkeyhash');
        break;
      case Constants.SCRIPT_TYPES.P2PKH:
        $.checkState(_.isArray(publicKeys) && publicKeys.length == 1);

        if (Address.Astracore[coin]) {
          astracoreAddress = Address.Astracore[coin].Address.fromPublicKey(publicKeys[0], network);
        } else {
          const { addressIndex, isChange } = new AddressManager().parseDerivationPath(path);
          const [{ xPubKey }] = publicKeyRing;
          astracoreAddress = Deriver.deriveAddress(coin.toUpperCase(), network, xPubKey, addressIndex, isChange);
        }
        break;
    }

    let addrStr = astracoreAddress.toString(true);
    if (noNativeCashAddr && coin == 'bch') {
      addrStr = astracoreAddress.toLegacyAddress();
    }

    return {
      // bws still use legacy addresses for BCH
      address: addrStr,
      path,
      publicKeys: _.invokeMap(publicKeys, 'toString'),
    };
  }

  // noNativeCashAddr only for testing
  static derive(walletId, scriptType, publicKeyRing, path, m, coin, network, isChange, noNativeCashAddr = false) {
    const raw = Address._deriveAddress(scriptType, publicKeyRing, path, m, coin, network, noNativeCashAddr);
    return Address.create(
      _.extend(raw, {
        coin,
        network,
        walletId,
        type: scriptType,
        isChange,
      })
    );
  }
}
