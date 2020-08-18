FROM node:carbon
WORKDIR /usr/src/app
COPY package*.json ./
RUN npm install
COPY lerna.json ./

COPY ./packages/astracore-build/package.json ./packages/astracore-build/package.json
COPY ./packages/astracore-mnemonic/package.json ./packages/astracore-mnemonic/package.json
COPY ./packages/astracore-lib/package.json ./packages/astracore-lib/package.json
COPY ./packages/astracore-lib-cash/package.json ./packages/astracore-lib-cash/package.json
COPY ./packages/astracore-p2p/package.json ./packages/astracore-p2p/package.json
COPY ./packages/astracore-p2p-cash/package.json ./packages/astracore-p2p-cash/package.json
COPY ./packages/astracore-wallet-client/package.json ./packages/astracore-wallet-client/package.json
COPY ./packages/astracore-client/package.json ./packages/astracore-client/package.json
COPY ./packages/astracore-wallet/package.json ./packages/astracore-wallet/package.json
COPY ./packages/astracore-wallet-client/package.json ./packages/astracore-wallet-client/package.json
COPY ./packages/astracore-wallet-service/package.json ./packages/astracore-wallet-service/package.json
COPY ./packages/astracore-node/package.json ./packages/astracore-node/package.json
COPY ./packages/insight/package.json ./packages/insight/package.json
COPY ./packages/crypto-wallet-core/package.json ./packages/crypto-wallet-core/package.json

RUN ./node_modules/.bin/lerna bootstrap

COPY . .
EXPOSE 3000
EXPOSE 8100
CMD ["./node_modules/.bin/lerna", "run", "start"]
#CMD ["npm", "--prefix=./packages/astracore-node", "start"]
#CMD ["npm", "--prefix=./packages/insight", "start"]
