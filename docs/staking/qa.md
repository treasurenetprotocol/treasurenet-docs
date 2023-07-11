---
sidebar_position: 4
---

# FAQ

## Can validators run away with delegated UNIT?

No, they cannot. By delegating to a validator, users delegate their staking rights. The more stake a validator holds, the greater their weight in consensus and general processes. However, this does not mean that validators can hold their delegators' UNIT.

:::info
When staking, you should always prioritize validators you trust. However, you do not need to worry about your delegated funds being stolen because validators cannot steal staked funds.
:::

While the delegated UNIT cannot be stolen by validators, if a validator behaves improperly, the staker still bears responsibility. In such cases, the staker's shares will be partially reduced based on their new relative share ratio.

## Why Stake?

Cryptocurrency investors seek staking rewards but may not want to go through the hassle of setting up a validating node or may not have enough cryptocurrency to meet the minimum requirements for becoming a validating node. Delegation comes into play in such situations.

Operating a validator node requires a certain level of technical expertise, and not everyone is capable of independently running a validating node. However, in order to encourage as many on-chain assets as possible to participate in consensus voting, Treasurenet allows any entity to delegate their on-chain assets to one or multiple active validators, who will participate in consensus voting on their behalf.

## What is Validator Commission?

When allocating rewards, the operator of an active validator can deduct a portion of the income from the delegated on-chain assets as a commission, rewarding their efforts in maintaining stable node operation. This mechanism of shared benefits and shared responsibility incentivizes validator operators to maintain the security, stability, and efficiency of the validator nodes, attracting more on-chain asset holders.

## How are fees distributed?

- Block rewards are distributed among active validators based on their voting weight.
- A fixed percentage of the total block rewards, determined by the CommunityTax parameter (default: 2%), is extracted as a community tax and stored in our community pool for future community development. This portion of token rewards can be allocated to contributors to the community through governance.
- Block proposers receive a fixed percentage of the current reward as BaseProposerReward (default: 1%) and TatReward (default: 80%).
- Additional rewards are allocated to block proposers based on the voting information contained in the block.
  - The percentage of additional rewards is determined by the voting information in the block and the BonusProposerReward parameter (default: 4%).
  - When all active validators have voted, and all votes are included in the block, the block proposer receives an increased percentage of additional rewards specified by the BonusProposerReward parameter.
  - If validators have received delegations of TAT, the block proposer receives an increased percentage of additional rewards specified by TatReward (default: 80%).
- After deducting the community tax, the base reward, and the additional reward of the block proposer, the remaining block rewards are distributed among all active validators (including the block proposer) based on their voting weight.
- Validators deduct a certain percentage of the overall income as their commission, specified by the Commission parameter.
- After deducting the commission, the remaining income is distributed among the validator's delegators based on their stake shares, and the validator's self-delegated amount is also included in this distribution.

## What are the rules for share reduction in case of improper validator behavior causing loss?

According to the [POS Mechanism Overview](./introduction.md), both the on-chain asset delegators and the operator of the validator node bear the benefits and risks. The distribution of rewards can be seen in the [Fee Distribution](./qa.md). On-chain penalties directly deduct a fixed percentage
