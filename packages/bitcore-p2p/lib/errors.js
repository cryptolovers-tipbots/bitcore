'use strict';

var spec = {
  name: 'P2P',
  message: 'Internal Error on astracore-p2p Module {0}',
};

module.exports = require('astracore-lib').errors.extend(spec);
