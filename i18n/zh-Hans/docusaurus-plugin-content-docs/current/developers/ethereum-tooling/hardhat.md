# 用 Hardhat 部署智能合约

[Hardhat](https://hardhat.org/) 是一个用于构建基于以太坊的智能合约的灵活开发环境。它的设计考虑了整合性和可扩展性。

## 安装依赖项

:::info
在继续之前，您需要安装 Node.js（我们将使用 v16.x 版本）和 npm 包管理器。
:::

## 创建 Hardhat 项目

要创建一个新项目，请导航到您的项目目录并运行以下命令：

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

按照提示，您应该在您的目录中创建一个新的项目结构。请参考 Hardhat 配置页面上的配置选项列表，以在 hardhat.config.js 中指定配置选项。最重要的是，您应该将 defaultNetwork 条目设置为指向您所需的 JSON-RPC 网络。

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
  },
  ...
}
```

为了确保您定位到正确的网络，您可以向默认的网络提供商查询可用于您的帐户列表。

```shell
$ npx hardhat accounts
0xf39Fd6e51aad88F6F4ce6aB88273c5d6ba293358
...
```

## 部署智能合约

您将会看到在 contracts/Greeter.sol 下已经提供了一个默认的智能合约，使用 Solidity 编写。

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

这份合同允许您设置和查询一个字符串问候语。Hardhat 还提供了一个脚本，用于将智能合约部署到目标网络；可以通过以下命令调用此脚本，将其目标定为您的默认网络：

```shell
npx hardhat run scripts/deploy.js
```

Hardhat 还可以通过 `--network \<your-network\>` 标志手动指定目标网络：

```shell
npx hardhat run --network {{ $themeConfig.project.rpc_url_testnet }} scripts/deploy.js
```

最后，尝试运行一个 Hardhat 测试：

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
