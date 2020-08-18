import _ from 'lodash';
const Astracore_ = {
  btc: require('astracore-lib'),
  bch: require('astracore-lib-cash'),
};

export class BCHAddressTranslator {
  static getAddressCoin(address) {
    try {
      new Astracore_['btc'].Address(address);
      return 'legacy';
    } catch (e) {
      try {
        const a = new Astracore_['bch'].Address(address);
        if (a.toLegacyAddress() == address) return 'copay';
        return 'cashaddr';
      } catch (e) {
        return;
      }
    }
  }

  // Supports 3 formats:  legacy (1xxx, mxxxx); Copay: (Cxxx, Hxxx), Cashaddr(qxxx);
  static translate(addresses, to, from?) {
    let wasArray = true;
    if (!_.isArray(addresses)) {
      wasArray = false;
      addresses = [addresses];
    }
    from = from || BCHAddressTranslator.getAddressCoin(addresses[0]);

    let ret;
    if (from == to) {
      ret = addresses;
    } else {
      ret = _.filter(
        _.map(addresses, (x) => {
          const astracore = Astracore_[from == 'legacy' ? 'btc' : 'bch'];
          let orig;

          try {
            orig = new astracore.Address(x).toObject();
          } catch (e) {
            return null;
          }

          if (to == 'cashaddr') {
            return Astracore_['bch'].Address.fromObject(orig).toCashAddress(true);
          } else if (to == 'copay') {
            return Astracore_['bch'].Address.fromObject(orig).toLegacyAddress();
          } else if (to == 'legacy') {
            return Astracore_['btc'].Address.fromObject(orig).toString();
          }
        })
      );
    }
    if (wasArray) return ret;
    else return ret[0];
  }
}

module.exports = BCHAddressTranslator;
