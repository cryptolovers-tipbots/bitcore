module.exports = {
  BTC: {
    lib: require('astracore-lib'),
    p2p: require('astracore-p2p'),
  },
  BCH: {
    lib: require('astracore-lib-cash'),
    p2p: require('astracore-p2p-cash'),
  },
};
