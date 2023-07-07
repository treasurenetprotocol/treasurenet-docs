---
sidebar_position: 1
---

# Incentives

To encourage active participation in the voting process, Treasurenet provides rewards for nodes involved in consensus, including delegators, active validators, and proposers.

Treasurenet will select a Proposer from the list of validators based on certain rules, who will be responsible for creating blocks. After a block is successfully created, the block reward (Unit Token) is distributed to the accounts of all participants in the consensus.

The consensus reward consists of the block issuance reward and the total transaction fees for each block. We allocate the consensus reward into different portions: community governance, block proposer reward, additional reward for validator, and PoS reward.

## Basic Reward Distribution Process

- Block rewards are distributed among active validators based on their voting weight.
- A portion of the block rewards, determined by the fixed parameter CommunityTax (default at 2%), is allocated as community tax. This tax is deposited in the community pool and will be utilized to support community development activities in the future. Individuals who have made significant contributions to the community through governance activities may be eligible to receive rewards in the form of tokens from this pool.
- The block proposer receives a fixed percentage of the current reward (BaseProposerReward, default 1%, and TatReward, default 80%).
- The extra reward is assigned to the block proposer based on the voting information contained in the block.
  - The voting information contained in the block and the parameter BonusProposerReward (default 4%) determine the percentage of extra rewards.
  - Once all active verifiers have cast their votes and the votes are included in the block, the proportion of extra rewards available to the block proposer increases, as determined by the BonusProposerReward parameter.
  - When a validator has a TAT for a proxy, the percentage of additional rewards the proponent receives increases, as specified by the TatReward (default is 80%).
- Once the community tax and block sponsor rewards have been deducted, the remaining block rewards are distributed among all active validators, including block sponsors, based on the weight of their votes.
- Validators will receive a commission as a percentage of the overall revenue, which can be set by the validator and is specified by the Commission parameter.
- After the commission is deducted, the remaining revenue is distributed among the validator's principals based on their collateral share, including the validator's self-collateralized portion.

The base bonus percentage for block sponsors is fixed, but the additional bonus percentage is floating and is calculated as:

```sh
BaseProposerReward + BonusProposerReward * (sumPrecommitPower / totalPower)
```

Here, totalPower represents the sum of the voting weights of the current set of active validators, and sumPrecommitPower represents the sum of the voting weights contained in the block.

Active validator operators can obtain self-staking income and commission income, while delegators receive only staking income. Delegators can retrieve the income accumulated from their staked assets by sending the MsgWithdrawDelegatorReward message. Validator operators can also retrieve their commission income by sending the MsgWithdrawValidatorCommission message. By default, the income is transferred to the account address that initially sent the delegation operation, but the receiving account address can be reset.

## Specific calculation formula

Consensus reward (S) = block reward + total transaction fee.

Community governance pool receives a reward (C) = S \* 1%.

Block proponent receives reward (A) = S `*` (1% + signature rate `*` 4%).

## Bonus Stake for additional rewards

Total Additional Rewards (T) = S `*` 60% `*` (number of super validators selected / total number of active validators)

Reward received per validator = Additional reward T \* (amount of TAT staked in the current round / total number of TAT staked in the current round)

## Validator and Delegator Rewards

Total Reward (R) = S - A - C - T

The reward per validator is calculated as follows:
Reward for each validator = Total Validator Reward R `*` (number of staked UNITs name of the validator / sum of staked UNITs under the name of all validators)

The reward for a delegator is calculated as follows:
Delegator reward = Staked validator reward `*` (number of UNITS staked by that delegator / total number of UNITS staked under that validator's name) `*` (1 - 1% of commission rate ).
