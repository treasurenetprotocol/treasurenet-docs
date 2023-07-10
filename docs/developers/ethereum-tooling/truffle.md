# Truffle: Deploying a Smart Contract

[Truffle ](https://www.trufflesuite.com/truffle)is a development framework for deploying and managing [Solidity ](https://github.com/ethereum/solidity)smart contracts.

## Install Dependencies

First, install the latest Truffle version on your machine globally.

```shell
yarn install truffle -g
```

## Create Truffle Project

In this step we will create a simple counter contract. Feel free to skip this step if you already have your own compiled contract.

Create a new directory to host the contracts and initialize it:

```shell
mkdir tn-truffle
cd tn-truffle
```

Initialize the Truffle suite with:

```shell
truffle init
```

create you contract.

Compile the contract using the compile command:

```shell
truffle compile
```

## Truffle configuration

Open truffle-config.js and uncomment the development section in networks:

```shell
    development: {
      host: "node1.testnet.treasurenet.io",
      port: 8545,
      network_id: "9000",
    }
```

This will allow your contract to connect to your Treasurenet testnet node.

## Deploy contract

In the Truffle terminal, migrate the contract using:

```shell
truffle migrate --network development
```
