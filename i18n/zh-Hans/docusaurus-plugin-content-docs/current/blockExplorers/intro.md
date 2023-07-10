---
sidebar_position: 1
---

# 介绍

区块浏览器允许用户查询区块链中的数据，浏览器经常被比作区块链的搜索引擎。通过使用浏览器，用户可以查询、搜索和跟踪余额、账户、合约、交易和广播到区块链的其他数据。

Treasurenet 提供两种类型的区块浏览器：EVM Block Explorer 和 Cosmos Block Explorer。

每个资源管理器查询与其环境相关的数据，EVM 资源管理器查询以太坊格式的数据（块、交易、账户、智能合约等），Cosmos 资源管理器查询 Cosmos 格式的数据（Cosmos 和 IBC 交易、块、账户、模块数据，ETC）。

## 主网测试网区块链浏览器

### 主网

|                      | 类型   | 链接                                   |
| -------------------- | ------ | -------------------------------------- |
| EVM BlockExplorer    | evm    | https://evmexplorer.treasurenet.io/    |
| Cosmos BlockExplorer | cosmos | https://cosmosexplorer.treasurenet.io/ |

### 测试网

|                      | 类型   | 链接                                           |
| -------------------- | ------ | ---------------------------------------------- |
| EVM BlockExplorer    | evm    | https://evmexplorer.testnet.treasurenet.io/    |
| Cosmos BlockExplorer | cosmos | https://cosmosexplorer.testnet.treasurenet.io/ |

## 关于 Blockscout

您应该注意到了我们选择了开源的第三方项目 Blockscout 美化后作为 Evm 的 Block Explorer。

[Blockscout](https://github.com/blockscout/blockscout) 是一款采用 Elixir 的应用程序，是全面的、易于使用、易于查看、确认和检查区块链上交易的开源第三方区块链浏览器.

Blockscout 足够安全和高效的同时也足够开放，这是为什么我们选择它而不是再造一个车轮。
