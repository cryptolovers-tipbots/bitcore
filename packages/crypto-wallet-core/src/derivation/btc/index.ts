const AstracoreLib = require('astracore-lib');
import { IDeriver } from '..';
export abstract class AbstractAstracoreLibDeriver implements IDeriver {
  public abstract astracoreLib;

  deriveAddress(network, pubKey, addressIndex, isChange) {
    const xpub = new this.astracoreLib.HDPublicKey(pubKey, network);
    const changeNum = isChange ? 1 : 0;
    const path = `m/${changeNum}/${addressIndex}`;
    return this.astracoreLib.Address(xpub.derive(path).publicKey, network).toString();
  }

  derivePrivateKey(network, xPriv, addressIndex, isChange) {
    const xpriv = new this.astracoreLib.HDPrivateKey(xPriv, network);
    const changeNum = isChange ? 1 : 0;
    const path = `m/${changeNum}/${addressIndex}`;
    const privKey = xpriv.derive(path).privateKey;
    const pubKey = privKey.publicKey;
    const address = this.astracoreLib.Address(pubKey, network).toString();
    return { address, privKey: privKey.toString(), pubKey: pubKey.toString() };
  }
}
export class BtcDeriver extends AbstractAstracoreLibDeriver {
  astracoreLib = AstracoreLib;
}
