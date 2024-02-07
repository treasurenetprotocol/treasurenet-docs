---
sidebar_position: 4
---

# Mint

## Introduction

The mint module is responsible for creating tokens before the block execution starts, specifically minting coins in the BeginBlocker() function of this module. This is done to reward the validators participating in the proof-of-stake consensus process (refer to the [distribution module](./distribution.md)).

## Parameters

- "blocks_per_year" - The expected number of blocks being produced per year;
- "goal_bonded" - Goal of bonded tokens in percentage;
- "inflation_max" - Maximum annual inflation rate;
- "inflation_min" - Minimum annual inflation rate;
- "inflation_rate_change" - Maximum annual change in inflation rate;
- "mint_denom" - Type of on-chain asset.
- "height_block" - Monitoring height.
- "perReward" - Basic rewards.

The target annual inflation rate is recalculated every cycle.

## Queries

> treasurenetd query mint params --home --output json | jq -query the minting parameters

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

> treasurenetd query mint annual-provisions-query the current mint

> 5000000000000000000.000000000000000000
