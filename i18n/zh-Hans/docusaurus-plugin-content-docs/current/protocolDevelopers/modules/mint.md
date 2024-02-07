---
sidebar_position: 4
---

# Mint 模块

## 介绍

mint 模块在区块在区块开始执行之前负责创建代币，即铸币放在本模块的 BeginBlocker( )中，用来奖励参与权益证明共识过程的验证者(参见[distribution 模块](./distribution.md))。

## 参数

- "blocks_per_year" - 每年预期生成的区块数量；
- "goal_bonded" - 绑定代币的目标百分比；
- "inflation_max" - 最大年通胀率；
- "inflation_min" - 最小年通胀率；
- "inflation_rate_change" - 年通胀率的最大变化率；
- "mint_denom" - 链上资产种类；
- "height_block" - 监控高度；
- "perReward" - 基本奖励。

每个周期都会重新计算目标年通货膨胀率。

## 查询

> treasurenetd query mint params --home --output json | jq 查询铸币参数

```json
{
  "blocks_per_year": "6311520",
  "goal_bonded": "0.670000000000000000",
  "height_block": "0",
  "inflation_max": "0.200000000000000000",
  "inflation_min": "0.070000000000000000",
  "inflation_rate_change": "0.130000000000000000",
  "mint_denom": "aunit",
  "per_reward": "0"
}
```

> treasurenetd query mint annual-provisions 查询当前的铸币

> 5000000000000000000.000000000000000000
