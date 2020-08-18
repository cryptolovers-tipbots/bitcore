# Astracore P2P

[![NPM Package](https://img.shields.io/npm/v/astracore-p2p.svg?style=flat-square)](https://www.npmjs.org/package/astracore-p2p)
[![Build Status](https://img.shields.io/travis/bitpay/astracore-p2p.svg?branch=master&style=flat-square)](https://travis-ci.org/bitpay/astracore-p2p)
[![Coverage Status](https://img.shields.io/coveralls/bitpay/astracore-p2p.svg?style=flat-square)](https://coveralls.io/r/bitpay/astracore-p2p?branch=master)

**The peer-to-peer networking protocol for BTC.**

`astracore-p2p` adds [Bitcoin protocol](https://en.bitcoin.it/wiki/Protocol_documentation) support for Astracore.

See [the main astracore repo](https://github.com/bitpay/astracore) for more information.

## Getting Started

```sh
npm install astracore-p2p
```

In order to connect to the Bitcoin network, you'll need to know the IP address of at least one node of the network, or use [Pool](./docs/pool.md) to discover peers using a DNS seed.

```javascript
var Peer = require('astracore-p2p').Peer;

var peer = new Peer({ host: '127.0.0.1' });

peer.on('ready', function () {
  // peer info
  console.log(peer.version, peer.subversion, peer.bestHeight);
});
peer.on('disconnect', function () {
  console.log('connection closed');
});
peer.connect();
```

Then, you can get information from other peers by using:

```javascript
// handle events
peer.on('inv', function (message) {
  // message.inventory[]
});
peer.on('tx', function (message) {
  // message.transaction
});
```

Take a look at this [guide](./docs/peer.md) on the usage of the `Peer` class.

## Contributing

See [CONTRIBUTING.md](https://github.com/bitpay/astracore/blob/master/CONTRIBUTING.md) on the main astracore repo for information about how to contribute.

## License

Code released under [the MIT license](https://github.com/bitpay/astracore/blob/master/LICENSE).

Copyright 2013-2019 Astracore, Inc. Astracore is a trademark maintained by Astracore, Inc.
