# Hardhat: Deploying a Smart Contract

[Hardhat](https://hardhat.org/) is a versatile development environment specifically created for building smart contracts on the Ethereum network. It offers flexibility, allowing developers to easily integrate and extend its functionalities.

## Install Dependencies

:::info
Before proceeding, you need to install Node.js (we'll use v16.x) and the npm package manager.
:::

## Create Hardhat Project

To create a new project, navigate to your project directory and run:

```shell
$ npx hardhat

888    888                      888 888               888
888    888                      888 888               888
888    888                      888 888               888
8888888888  8888b.  888d888 .d88888 88888b.   8888b.  888888
888    888     "88b 888P"  d88" 888 888 "88b     "88b 888
888    888 .d888888 888    888  888 888  888 .d888888 888
888    888 888  888 888    Y88b 888 888  888 888  888 Y88b.
888    888 "Y888888 888     "Y88888 888  888 "Y888888  "Y888

👷 Welcome to Hardhat v2.9.3 👷‍

? What do you want to do? …
  Create a basic sample project
❯ Create an advanced sample project
  Create an advanced sample project that uses TypeScript
  Create an empty hardhat.config.js
  Quit
```

By following the prompts, you will be able to create a new project structure in your chosen directory. To configure your Hardhat project, you can refer to the Hardhat config page, which provides a list of configuration options that can be specified in the `hardhat.config.js` file. One crucial configuration is setting the `defaultNetwork` entry to point to your desired JSON-RPC network.

```shell
module.exports = {
  defaultNetwork: "testnet",
  networks: {
    hardhat: {
    },
    testnet: {
      url: "https://node1.testnet.treasurenet.io:8545",
      accounts: [privateKey1, privateKey2, ...]
    }
  }
}
```

To ensure you are targeting the correct network, you can query for a list of accounts available to you from your default network provider:

```shell
$ npx hardhat accounts
0xf39Fd6e51aad88F6F4ce6aB88273c5d6ba293358
```

## Deploying a Smart Contract

A default smart contract, written in Solidity, has already been provided under `contracts/Greeter.sol`:

```solidity
pragma solidity ^0.8.0;

import "hardhat/console.sol";

contract Greeter {
    string private greeting;

    constructor(string memory _greeting) {
        console.log("Deploying a Greeter with greeting:", _greeting);
        greeting = _greeting;
    }

    function greet() public view returns (string memory) {
        return greeting;
    }

    function setGreeting(string memory _greeting) public {
        console.log("Changing greeting from '%s' to '%s'", greeting, _greeting);
        greeting = _greeting;
    }
}

```

This contract allows you to set and query a string greeting.

Hardhat also provides a script to deploy smart contracts to a target network; this can be invoked via the following command, targeting your default network:

```shell
npx hardhat run scripts/deploy.js
```

Hardhat also lets you manually specify a target network via the --network your-network flag:

```shell
npx hardhat run --network {{ $themeConfig.project.rpc_url_testnet }} scripts/deploy.js
```

Finally, try running a Hardhat test:

```shell
$ npx hardhat test
Compiling 1 file with 0.8.4
Compilation finished successfully


  Greeter
Deploying a Greeter with greeting: Hello, world!
Changing greeting from 'Hello, world!' to 'Hola, mundo!'
    ✓ Should return the new greeting once it's changed (803ms)


  1 passing (805ms)
```
