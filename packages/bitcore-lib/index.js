'use strict';

var astracore = module.exports;

// module information
astracore.version = 'v' + require('./package.json').version;
astracore.versionGuard = function (version) {
  if (version !== undefined) {
    var message =
      'More than one instance of astracore-lib found. ' +
      'Please make sure to require astracore-lib and check that submodules do' +
      ' not also include their own astracore-lib dependency.';
    throw new Error(message);
  }
};
astracore.versionGuard(global._astracore);
global._astracore = astracore.version;

// crypto
astracore.crypto = {};
astracore.crypto.BN = require('./lib/crypto/bn');
astracore.crypto.ECDSA = require('./lib/crypto/ecdsa');
astracore.crypto.Hash = require('./lib/crypto/hash');
astracore.crypto.Random = require('./lib/crypto/random');
astracore.crypto.Point = require('./lib/crypto/point');
astracore.crypto.Signature = require('./lib/crypto/signature');

// encoding
astracore.encoding = {};
astracore.encoding.Base58 = require('./lib/encoding/base58');
astracore.encoding.Base58Check = require('./lib/encoding/base58check');
astracore.encoding.BufferReader = require('./lib/encoding/bufferreader');
astracore.encoding.BufferWriter = require('./lib/encoding/bufferwriter');
astracore.encoding.Varint = require('./lib/encoding/varint');

// utilities
astracore.util = {};
astracore.util.buffer = require('./lib/util/buffer');
astracore.util.js = require('./lib/util/js');
astracore.util.preconditions = require('./lib/util/preconditions');

// errors thrown by the library
astracore.errors = require('./lib/errors');

// main bitcoin library
astracore.Address = require('./lib/address');
astracore.Block = require('./lib/block');
astracore.MerkleBlock = require('./lib/block/merkleblock');
astracore.BlockHeader = require('./lib/block/blockheader');
astracore.HDPrivateKey = require('./lib/hdprivatekey.js');
astracore.HDPublicKey = require('./lib/hdpublickey.js');
astracore.Message = require('./lib/message');
astracore.Networks = require('./lib/networks');
astracore.Opcode = require('./lib/opcode');
astracore.PrivateKey = require('./lib/privatekey');
astracore.PublicKey = require('./lib/publickey');
astracore.Script = require('./lib/script');
astracore.Transaction = require('./lib/transaction');
astracore.URI = require('./lib/uri');
astracore.Unit = require('./lib/unit');

// dependencies, subject to change
astracore.deps = {};
astracore.deps.bnjs = require('bn.js');
astracore.deps.bs58 = require('bs58');
astracore.deps.Buffer = Buffer;
astracore.deps.elliptic = require('elliptic');
astracore.deps._ = require('lodash');

// Internal usage, exposed for testing/advanced tweaking
astracore.Transaction.sighash = require('./lib/transaction/sighash');
