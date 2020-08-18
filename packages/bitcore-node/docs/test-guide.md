# Set up to run the tests.

1. copy ../../astracore-test.config.json to ../../astracore.config.json
2. run mongod
3. run bitcoin-code's bitcoind (tested with version v0.19) with:
   `./bitcoind -regtest -rpcpassword=astracorenodetest -rpcuser=local321 --rpcport=18332 --addresstype=legacy`
