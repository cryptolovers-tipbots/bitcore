# Astracore Mnemonics

BIP39 Mnemonics for astracore

[![NPM Package](https://img.shields.io/npm/v/astracore-mnemonic.svg?style=flat-square)](https://www.npmjs.org/package/astracore-mnemonic)
[![Build Status](https://img.shields.io/travis/bitpay/astracore-mnemonic.svg?branch=master&style=flat-square)](https://travis-ci.org/bitpay/astracore-mnemonic)
[![Coverage Status](https://img.shields.io/coveralls/bitpay/astracore-mnemonic.svg?style=flat-square)](https://coveralls.io/r/bitpay/astracore-mnemonic)

**A module for [astracore](https://github.com/bitpay/astracore) that implements [Mnemonic code for generating deterministic keys](https://github.com/bitcoin/bips/blob/master/bip-0039.mediawiki).**

## Getting Started

This library is distributed in both the npm packaging systems.

```sh
npm install astracore-lib  #this to install astracore-lib since it is a peerDependecy
npm install astracore-mnemonic
```

There are many examples of how to use it on the developer guide [section for mnemonic](./docs/index.md). For example, the following code would generate a new random mnemonic code and convert it to a `HDPrivateKey`.

```javascript
var Mnemonic = require('astracore-mnemonic');
var code = new Mnemonic(Mnemonic.Words.SPANISH);
code.toString(); // natal hada sutil año sólido papel jamón combate aula flota ver esfera...
var xpriv = code.toHDPrivateKey();
```

## Contributing

See [CONTRIBUTING.md](https://github.com/bitpay/astracore/blob/master/CONTRIBUTING.md) on the main astracore repo for information about how to contribute.

## License

Code released under [the MIT license](https://github.com/bitpay/astracore/blob/master/LICENSE).

Copyright 2013-2019 Astracore, Inc. Astracore is a trademark maintained by Astracore, Inc.
