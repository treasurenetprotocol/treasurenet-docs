---
sidebar_position: 8
---

# Distribution

## Introduction

Distribution is responsible for allocating rewards to validators and delegators.

The on-chain assets minted by the [mint module](./mint.md) are distributed as block rewards along with transaction fees. These rewards are proportionally distributed among active validators based on their respective voting weights. Validators who receive rewards then distribute them to delegators according to each delegator's share. In Ethereum, block rewards are directly transferred to the target account through a transaction (Coinbase transaction). However, in Treasurenet, a different approach called passive reward distribution is implemented. In this approach, block rewards are not automatically transferred to the target account. Instead, validator operators or delegators need to initiate withdrawal transactions when they want to claim their rewards.
It is important to note that when the weight of a validator on the chain changes (due to operations such as re-delegation or delegation withdrawal), the block rewards will be automatically redistributed.

The process of reward distribution is as follows:

- Block rewards are distributed among active validators based on their voting weights.
- A fixed percentage of the total block rewards, defined by the CommunityTax parameter (default 2%), is allocated as community tax and stored in our community pool. These funds are used for community development and can be distributed to contributors through governance.
- The proposer of the block receives a fixed percentage of the current reward, determined by the BaseProposerReward parameter (default 1%) and TatReward parameter (default 80%).
- Additional rewards are allocated to the block proposer based on the voting information included in the block.
  - The proportion of additional rewards is determined by the voting information in the block and the BonusProposerReward parameter (default 4%).
  - When all active validators have voted and all votes are included in the block, the additional reward percentage for the block proposer increases and is specified by the BonusProposerReward parameter.
  - If a validator has received delegations of TAT, the additional reward percentage for the proposer increases to TatReward (default 80%).
- After deducting the community tax, base proposer reward, and additional rewards, the remaining block rewards are distributed among all active validators (including the block proposer) based on their voting weights.
- Validators deduct a certain percentage of the overall earnings as their commission, which is specified by the Commission parameter in the Validator.
- After deducting the commission, the remaining earnings are distributed among the validator's delegators based on their stake, including the validator's self-delegation.

```golang
type Validator struct {
	  OperatorAddress    string                                                      // Validator node address
	  ConsensusPubkey    *types1.Any                                                 // Validator's consensus public key
	  Jailed             bool                                                        // Whether the validator is jailed or not
	  Status             BondStatus                                                  // Validator status
	  Tokens             github_com_cosmos_cosmos_sdk_types.Int                       // Amount of on-chain assets staked by the validator
	  DelegatorShares    github_com_cosmos_cosmos_sdk_types.Dec                       // Total shares allocated to the validator by delegators
	  Description        Description                                                  // Validator description
	  UnbondingHeight    int64                                                       // Block height at which the validator began the unbonding period
	  UnbondingTime      time.Time                                                    // Earliest time at which the validator completes the unbonding period
  	Commission         Commission                                                  // Validator's commission
  	MinSelfDelegation  github_com_cosmos_cosmos_sdk_types.Int                       // Minimum self-delegation amount declared by the validator
	  TatTokens          github_com_cosmos_cosmos_sdk_types.Int                       // On-chain assets staked in TAT
	  NewTokens          github_com_cosmos_cosmos_sdk_types.Int                       // Total assets of the validator in TAT and UNIT
	  TatPower           github_com_cosmos_cosmos_sdk_types.Int                       // Total shares allocated to the validator for TAT
	  NewUnitPower       github_com_cosmos_cosmos_sdk_types.Int                       // Total shares allocated to the validator for (TAT+UNIT)
}
```

The base reward ratio for block proposers is fixed, but the additional reward ratio is variable, calculated as follows:

```sh
BaseProposerReward + BonusProposerReward * (sumPrecommitPower / totalPower)
```

Among them, totalPower represents the sum of voting weights of the current set of active validators, while sumPrecommitPower represents the sum of voting weights included in the block.

The rewards that the operator of active validators can receive include self-delegation rewards and commission rewards. Delegators can only receive delegation rewards. Delegators can withdraw the accumulated rewards of their staked assets on the chain by sending the message MsgWithdrawDelegatorReward (the operator of the validator also withdraws a portion of the self-delegation rewards by sending this message). At the same time, the operator of the validator can also withdraw commission rewards by sending the message MsgWithdrawValidatorCommission. The rewards are by default transferred to the account address that initially sent the delegation operation, but the receiving account address can also be reset.

## Network Parameters

The following is the distribution of all network parameters for the module:

- community_tax - Community tax rate;
- base_proposer_reward - The base reward percentage for transaction fees charged in valid blocks;
- bonus_proposer_reward - The maximum reward percentage for transaction fees charged in valid blocks;
- tat_reward - The percentage for obtaining TAT rewards;
- withdraw_addr_enabled - Whether delegators can set different addresses for withdrawing rewards.

## Transactions and Queries

### Transactions

> treasurenetd tx distribution withdraw-all-rewards - Withdraw all delegations rewards for a delegator
> The principal can withdraw their rewards from the validator they entrusted with all at once.

```sh
$ treasurenetd tx distribution withdraw-all-rewards \
--from="[name_of_your_key]" \
--chain-id="[chain-id]" \
--home="[default:/root/.treasurenetd/]" \
--fees="" \
--gas="auto" \
--keyring-backend test

## Transactions payload##
{"body":{"messages":[{"@type":"/cosmos.distribution.v1beta1.MsgWithdrawDelegatorReward","delegator_address":"treasurenet1wf78qmzhfsjndy3v6wsdxjfqnmwnyy2grwxmrg","validator_address":"treasurenetvaloper1wf78qmzhfsjndy3v6wsdxjfqnmwnyy2gzs46zq"}],"memo":"","timeout_height":"0","extension_options":[],"non_critical_extension_options":[]},"auth_info":{"signer_infos":[],"fee":{"amount":[{"denom":"aunit","amount":"1000000000000000000"}],"gas_limit":"164298","payer":"","granter":""}},"signatures":[]}

confirm transaction before signing and broadcasting [y/N]: y
```

> treasurenetd tx distribution withdraw-rewards [validator_address] - withdraw rewards from a given validator address
> The principal can withdraw rewards from specific validators.

> Validators can extract commissions by adding the commission flag, in addition to rewards --commission

> treasurenetd tx distribution withdraw-rewards [validator_address] --from [name_of_your_key] --commission

> Validators can extract rewards obtained through staking TAT by adding the commission flag --tatreward

> treasurenetd tx distribution withdraw-rewards [validator_address] --from [name_of_your_key] --tatreward

```sh
treasurenetd tx distribution withdraw-rewards treasurenetvaloper1gghjut3ccd8ay0zduzj64hwre2fxs9ldmqhffj
 --from="[name_of_your_key]" \
 --tatreward \
 --commission \
 --home="[default:/root/.treasurenetd/]" \
 --fees="" \
 --gas="auto" \
 --keyring-backend test

## Transactions payload##
{"body":{"messages":[{"@type":"/cosmos.distribution.v1beta1.MsgWithdrawDelegatorReward","delegator_address":"treasurenet1wf78qmzhfsjndy3v6wsdxjfqnmwnyy2grwxmrg","validator_address":"treasurenetvaloper1wf78qmzhfsjndy3v6wsdxjfqnmwnyy2gzs46zq"},{"@type":"/cosmos.distribution.v1beta1.MsgWithdrawValidatorCommission","validator_address":"treasurenetvaloper1wf78qmzhfsjndy3v6wsdxjfqnmwnyy2gzs46zq"}],"memo":"","timeout_height":"0","extension_options":[],"non_critical_extension_options":[]},"auth_info":{"signer_infos":[],"fee":{"amount":[{"denom":"aunit","amount":"1000000000000000000"}],"gas_limit":"185971","payer":"","granter":""}},"signatures":[]}

confirm transaction before signing and broadcasting [y/N]: y
```

> treasurenetd tx distribution set-withdraw-addr [withdraw-addr] - Change the default withdrawal address associated with rewards related to the address.
> The principal can set different addresses to claim their rewards

> treasurenetd tx distribution fund-community-pool [amount]- To provide funds for the community pool with a specified amount.
> Users can make a certain amount of contributions to the community pool.

### Queries

> treasurenetd query distribution commission [validator_address] --home --output json | jq - Query Validator Commission Allocation.
> We can check the commission of a specific validator

```json
{
  "commission": [
    {
      "denom": "aunit",
      "amount": "77814495000001386000.776000000000000000"
    }
  ]
}
```

> treasurenetd query distribution tatreward [validator_address] --home --output json | jq - Querying allocation verifier TaT rewards
> We can check the rewards obtained after pledging tat.

```json
{
  "tatreward": [
    {
      "denom": "aunit",
      "amount": "77814495000001386000.776000000000000000"
    }
  ]
}
```

> treasurenetd query distribution community-pool --home --output json | jq - Query the number of coins in the community pool.
> We can check the balance of the community pool

```json
{
  "pool": [
    {
      "denom": "aunit",
      "amount": "10876172761883064625556.240000000000000000"
    }
  ]
}
```

> treasurenetd query distribution rewards [delegator-addr] [validator-addr] --home --output json | jq - Query all rewards allocated to delegators or rewards from specific validators
> We can check the current reward delegated to a specific validator

```json
{
  "rewards": [
    {
      "denom": "aunit",
      "amount": "2304141592500043658976.000000000000000000"
    }
  ]
}
```

> treasurenetd query distribution validator-outstanding-rewards [validator_address] --home --output json | jq - Querying validators and their unallocated rewards for all delegations.
> We can check the unallocated (unclaimed) rewards of the validator and all its delegates

```json
{
  "rewards": [
    {
      "denom": "aunit",
      "amount": "2678957325000048510549.760000000000000000"
    }
  ]
}
```
