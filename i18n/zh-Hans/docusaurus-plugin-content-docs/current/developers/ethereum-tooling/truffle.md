# 用 Truffle 部署智能合约

[Truffle ](https://www.trufflesuite.com/truffle) 是一个用于部署和管理 Solidity 智能合约的开发框架。

## 安装依赖项

首先，在您的机器上全局安装最新的 Truffle 版本。

```shell
yarn install truffle -g
```

## 创建 Truffle 项目

在这一步中，我们将创建一个简单的计数器合约。如果您已经有自己已编译的合约，可以随时跳过这一步。

创建一个新的目录来存放合约，并进行初始化：

```shell
mkdir tn-truffle
cd tn-truffle
```

使用以下命令初始化 Truffle 工具套件：

```shell
truffle init
```

创建你的智能合约。

使用编译命令编译合同：

```shell
truffle compile
```

## Truffle 配置

打开 truffle-config.js 文件并在 networks 中取消注释开发部分。

```shell
    development: {
      host: "node1.testnet.treasurenet.io",
      port: 8545,
      network_id: "5005",
    }
```

这将允许您的合约连接到您的 Treasurenet 测试网络节点。

## 部署智能合约

在 Truffle 终端中，使用以下命令迁移合约：

```shell
truffle migrate --network development
```
