---
sidebar_position: 1
---

# 介绍

Treasurenet 链利用 Cosmos SDK 和底层的 Tendermint 核心共识引擎。具体来说，Cosmos SDK 是一个框架，可促进在 Tendermint 之上开发安全状态机。

在本文档中，我们将重点介绍我们使用的一些重要模块.

- 基础模块: auth, bank
- 辅助模块: params
- 链上治理模块: gov
- PoS 模块: staking, mint, distribution, slashing
- 跨链通信模块: ibc/core

[Auth](./auth.md) - 为应用程序验证账户和交易，并负责指定基本交易和账户类型;

[Bank](./bank.md) - 代币转账功能和所有资产总供应量的查询支持；

[Distribution](./distribution.md) - 费用分配，并向验证者和委托人提供奖励；

[Gov](./gov.md) - 链上提案和投票；

[Mint](./mint.md) - 创建新的质押代币单位；

[Slashing](./slashing.md) - 验证者惩罚机制；

[Staking](./staking.md) - 公共区块链的权益证明层；

[Upgrade](./staking.md) - 有助于将 Treasurenet 链顺利升级到新的软件版本。
