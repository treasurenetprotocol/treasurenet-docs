---
sidebar_position: 5
---

# Staking

## Introduction

The staking module is responsible for handling operations such as asset staking and delegation on the blockchain. These operations are carried out through the messages MsgCreateValidator, MsgEditValidator, MsgDelegate, and MsgBeginRedelegate.

- MsgCreateValidator: Stake assets on the chain and create a validator.
- MsgEditValidator: Modify parameters of a validator.
- MsgDelegate: Delegate on-chain assets to a specific validator.
- MsgBeginRedelegate: Begin the process of redelegation.
- MsgUndelegate: Withdraw a delegation.

The staking module's Keeper defines corresponding handling functions for these five messages. The entire logic of the staking module revolves around the Validator structure, which records validator information, and the Delegation structure, which records delegation operation information.

```golang
type Validator struct {
	OperatorAddress    string                                  // Validator node address
	ConsensusPubkey    *types1.Any                             // Validator's consensus public key
	Jailed             bool                                    // Whether the validator is jailed
	Status             BondStatus                              // Validator status
	Tokens             github_com_cosmos_cosmos_sdk_types.Int  // Amount of on-chain assets staked
	DelegatorShares    github_com_cosmos_cosmos_sdk_types.Dec  // Total shares allocated to the validator by delegators
	Description        Description                             // Validator description information
	UnbondingHeight    int64                                   // Block height at which the validator started the unbonding period
	UnbondingTime      time.Time                               // Earliest time at which the validator completes the unbonding period
	Commission         Commission                              // Validator's commission
	MinSelfDelegation  github_com_cosmos_cosmos_sdk_types.Int // Minimum self-delegation amount declared by the validator
	TatTokens          github_com_cosmos_cosmos_sdk_types.Int  // On-chain assets of TAT staked
	NewTokens          github_com_cosmos_cosmos_sdk_types.Int  // Total assets of TAT and UNIT allocated to the validator
	TatPower           github_com_cosmos_cosmos_sdk_types.Int  // Total shares allocated to the validator for TAT
	NewUnitPower       github_com_cosmos_cosmos_sdk_types.Int  // Total shares allocated to the validator for (TAT+UNIT)
}

```

```golang
type Delegation struct {
	DelegatorAddress string                                 // Delegator's address
	ValidatorAddress string                                 // Validator's address
	Shares github_com_cosmos_cosmos_sdk_types.Dec           // Delegated shares received (UNIT)
	TatShares github_com_cosmos_cosmos_sdk_types.Dec        // Delegated shares received (TAT)
}

```

According to the Proof-of-Stake (PoS) mechanism in the Cosmos Hub, both asset delegators and validator node operators bear the rewards and risks. The logic for distributing and extracting rewards is handled by the distribution module (see [distribution module](./distribution)), which calculates based on the specific quantity of on-chain assets. On-chain slashing involves directly deducting a fixed proportion of the staked on-chain assets. As a result, the total amount of on-chain assets delegated by validator proxies and the quantity of on-chain assets involved in delegation operations decrease when slashing events occur.

## Redelegation and Unbonding Rewards

Redelegation involves three parties: the delegator, the source validator, and the destination validator.
Unbonding involves two parties: the delegator and the validator.

Both operations are not immediate and require time. During the unbonding period, the on-chain assets involved in the unbounding operation do not earn any rewards. However, the on-chain assets involved in redelegation can participate in the reward distribution of the destination validator, even if the corresponding operation has not matured yet. The voting power of the destination validator will increase immediately, and the delegator will receive rewards immediately.
The reason for the time delay is the time gap between the occurrence of malicious behavior and the execution of on-chain slashing. If both operations were allowed to complete immediately, and the operations occurred before the validator's malicious behavior and slashing, the staked on-chain assets that once granted voting power to the malicious validator could evade punishment (see [slashing module](./slashing.md)).

The maturity period of the unbonding operation is independent of the validator's state. Regardless of the validator's state, the unbonding operation must wait for the complete unbonding period to mature. If a redelegation operation is awaiting maturity, it is not allowed to delegate the related on-chain assets again. The maturity period of the redelegation operation depends on the state of the original validator.

- For a source validator in the Bonded state, the maturity period for redelegation is the complete unbonding period.
- For a source validator in the Unbonding state, the maturity period for redelegation is the end time of the source validator's unbonding period.
- For a source validator in the Unbonded state, redelegation is immediately mature and does not require waiting.

## Validator State Transitions

Validators in Treasurenetd can have three states: Unbonded, Unbonding, and Bonded.
Newly created validators through the Msg-CreateValidator message are initialized in the Unbonded state with allocated shares and voting power. The EndBlocker() function of the staking module tracks changes in validator states for each block.

- If a newly created validator's voting power ranking is among the top 100, the state transitions from Unbonded to Bonded.
- If a newly created validator's voting power ranking is not among the top 100, the Unbonded state remains unchanged.
- State transitions when voting power increases and the ranking is among the top 100:
  - Unbonded to Bonded: Becomes an active validator for the first time.
  - Unbonding to Bonded: Becomes an active validator again.
  - Bonded remains unchanged: Already an active validator.

![Validator status transition process](/img/docs/validator_status.jpg)

## Parameters

- unbonding_time: Duration of the unbonding period.
- max_validators: Maximum number of validators.
- max_entries: Maximum number of unbonding delegation or redelegation entries.
- historical_entries: Number of historical entries to retain.
- bond_denom: Denomination of the staking coin.

## Validator

Validators are responsible for signing or proposing a block at each consensus round. It is important that the validators maintain excellent availability and network connectivity to perform their tasks. To incentivise the validator nodes to run the network, rewards are distributed to the validators according to their performance and amount of staked tokens (see [distribution](./distribution.md) and [mint](./mint.md)). On the other hand, a penalty should be imposed on validators' misbehaviour (see [slashing](./slashing.md)).

## Delegator

The staking module enables CRO owners to delegate their tokens to active validators and share part of the reward obtained by the validator during the proof of stake protocol(see [distribution module](./distribution.md)). Specifically, it allows token owners to take part in the consensus process without running a validator themselves.

It is important to point out that the delegator and the validator are on the same boat: they share the reward and the risk. In particular, part of their delegated token could be slashed due to validator's misbehaviour (see [slashing](./slashing.md)). Therefore, it is very important to choose a reliable validator to delegate to. Kindly refer to this link for detailed specification and state transitions of delegation.

## Transactions and Queries

### Transactions

> treasurenetd tx staking create-validator - Create new validator initialized with a self-delegation

```sh
$ treasurenetd tx staking create-validator \
--from=[name_of_your_key] \
--amount=[staking_amount] \
--pubkey=[treasurenetpub...]  \
--moniker="[moniker_id_of_your_node]" \
--security-contact="[security contact email/contact method]" \
--chain-id="[chain-id]" \
--commission-rate="[commission_rate]" \
--commission-max-rate="[maximum_commission_rate]" \
--commission-max-change-rate="[maximum_rate_of_change_of_commission]" \
--min-self-delegation="[min_self_delegation_amount]"
--keyring-backend test

## Transactions payload##
{"body":{"messages":[{"@type":"/cosmos.staking.v1beta1.MsgCreateValidator"...}
confirm transaction before signing and broadcasting [y/N]: y
```

> treasurenetd tx staking delegate [validator-address] [amount] - Delegate liquid tokens to a validator

```sh
treasurenetd tx staking delegate treasurenetvaloper1wf78qmzhfsjndy3v6wsdxjfqnmwnyy2gzs46zq 10unit
--from treasurenet1wf78qmzhfsjndy3v6wsdxjfqnmwnyy2grwxmrg
--home (defaule:"/root/.treasurenet/")
--fees 1unit
--gas auto
--keyring-backend test

## Transactions payload##
{"body":{"messages":[{"@type":"/cosmos.staking.v1beta1.MsgDelegate","delegator_address":"treasurenet1wf78qmzhfsjndy3v6wsdxjfqnmwnyy2grwxmrg","validator_address":"treasurenetvaloper1wf78qmzhfsjndy3v6wsdxjfqnmwnyy2gzs46zq","amount":{"denom":"aunit","amount":"10000000000000000000"}}],"memo":"","timeout_height":"0","extension_options":[],"non_critical_extension_options":[]},"auth_info":{"signer_infos":[],"fee":{"amount":[{"denom":"aunit","amount":"1000000000000000000"}],"gas_limit":"214201","payer":"","granter":""}},"signatures":[]}

confirm transaction before signing and broadcasting [y/N]: y
```

> treasurenetd tx staking unbond [validator-address] [amount] - Unbond shares from a validator
> 这里需要注意的是，在解绑委托后，不会立即生效，因为我们有个参数 unbonding_time(解绑时间)，资金只有在 unbonding_time 通过后才能生效

```sh
treasurenetd tx staking unbond treasurenetvaloper1wf78qmzhfsjndy3v6wsdxjfqnmwnyy2gzs46zq 10unit
--home (defaule:"/root/.treasurenet/")
--from treasurenet1wf78qmzhfsjndy3v6wsdxjfqnmwnyy2grwxmrg
--chain-id treasurenet_5005-1
--fees 1unit
--gas auto
--keyring-backend test

## Transactions payload##
{"body":{"messages":[{"@type":"/cosmos.staking.v1beta1.MsgUnDelegate","delegator_address":"treasurenet1wf78qmzhfsjndy3v6wsdxjfqnmwnyy2grwxmrg","validator_address":"treasurenetvaloper1wf78qmzhfsjndy3v6wsdxjfqnmwnyy2gzs46zq","amount":{"denom":"aunit","amount":"10000000000000000000"}}],"memo":"","timeout_height":"0","extension_options":[],"non_critical_extension_options":[]},"auth_info":{"signer_infos":[],"fee":{"amount":[{"denom":"aunit","amount":"1000000000000000000"}],"gas_limit":"214201","payer":"","granter":""}},"signatures":[]}

confirm transaction before signing and broadcasting [y/N]: y
```

> treasurenetd tx staking redelegate [validator-address] [validator-address2] [amount] - 将代币从一个验证者重新委托给另一个验证者
> 重新绑定操作需要注意几个方面:

1. When a user agrees to redelegate during the unbonding process, they need to wait until the account's unbonding is complete before performing the redelegation.

2. During the reauthorization period, there is no unbonding time, so rewards will not be missed. However, each validator can only be redelegated once until the unbonding time ends and a new redelegation can be performed.

3. Max_entries indicates the maximum number of entries for unbonding and redelegation. When redelegating, we need to stay within this parameter range. If the number of requests is too large, an error will occur stating "too many unbonding delegation entries in this delegator/validator duo, please wait for some entries to mature".

```sh
treasurenetd tx staking redelegate treasurenetvaloper1wf78qmzhfsjndy3v6wsdxjfqnmwnyy2gzs46zq treasurenetvaloper2as78dmzhesjndy3v6wsdxjfqnmwnyy2gzs32qq 10unit
--home (defaule:"/root/.treasurenet/")
--from treasurenet1wf78qmzhfsjndy3v6wsdxjfqnmwnyy2grwxmrg
--chain-id treasurenet_5005-1
--fees 1unit
--gas auto
--keyring-backend test

## Transactions payload##
{"body":{"messages":[{"@type":"/cosmos.staking.v1beta1.MsgBeginRedelegate","delegator_address":"treasurenet1wf78qmzhfsjndy3v6wsdxjfqnmwnyy2grwxmrg","validator_src_address":"treasurenetvaloper1wf78qmzhfsjndy3v6wsdxjfqnmwnyy2gzs46zq","validator_dst_address":"treasurenetvaloper2as78dmzhesjndy3v6wsdxjfqnmwnyy2gzs32qq","amount":{"denom":"aunit","amount":"10000000000000000000"}}],"memo":"","timeout_height":"0","extension_options":[],"non_critical_extension_options":[]},"auth_info":{"signer_infos":[],"fee":{"amount":[{"denom":"aunit","amount":"1000000000000000000"}],"gas_limit":"214201","payer":"","granter":""}},"signatures":[]}

confirm transaction before signing and broadcasting [y/N]: y
```

### Queries

> treasurenetd query staking validators --home --output json | jq - 查询所有验证者

```json
{
  "validators": [
    {
      "operator_address": "treasurenetvaloper1wf78qmzhfsjndy3v6wsdxjfqnmwnyy2gzs46zq",
      "consensus_pubkey": {
        "@type": "/cosmos.crypto.ed25519.PubKey",
        "key": "dGvx6FL1zdjKsmzZ7R/2EBfCgJcsneP0rUpMkxs9Si8="
      },
      "jailed": false,
      "status": "BOND_STATUS_BONDED",
      "tokens": "268000000000000000000",
      "delegator_shares": "268000000000000000000.000000000000000000",
      "description": {
        "moniker": "localtestnet",
        "identity": "",
        "website": "",
        "security_contact": "",
        "details": ""
      },
      "unbonding_height": "0",
      "unbonding_time": "1970-01-01T00:00:00Z",
      "commission": {
        "commission_rates": {
          "rate": "0.100000000000000000",
          "max_rate": "0.200000000000000000",
          "max_change_rate": "0.010000000000000000"
        },
        "update_time": "2023-02-02T10:48:47.611931848Z"
      },
      "min_self_delegation": "158000000000000000000",
      "tat_tokens": "0",
      "new_tokens": "0",
      "tat_power": "0",
      "newunit_power": "0"
    }
  ],
  "pagination": {
    "next_key": null,
    "total": "0"
  }
}
```

> treasurenetd query staking validator [validator-address] --home --output json | jq - 查看质押 validator 的情况

```json
{
  "operator_address": "treasurenetvaloper1wf78qmzhfsjndy3v6wsdxjfqnmwnyy2gzs46zq",
  "consensus_pubkey": {
    "@type": "/cosmos.crypto.ed25519.PubKey",
    "key": "dGvx6FL1zdjKsmzZ7R/2EBfCgJcsneP0rUpMkxs9Si8="
  },
  "jailed": false,
  "status": "BOND_STATUS_BONDED",
  "tokens": "268000000000000000000",
  "delegator_shares": "268000000000000000000.000000000000000000",
  "description": {
    "moniker": "localtestnet",
    "identity": "",
    "website": "",
    "security_contact": "",
    "details": ""
  },
  "unbonding_height": "0",
  "unbonding_time": "1970-01-01T00:00:00Z",
  "commission": {
    "commission_rates": {
      "rate": "0.100000000000000000",
      "max_rate": "0.200000000000000000",
      "max_change_rate": "0.010000000000000000"
    },
    "update_time": "2023-02-02T10:48:47.611931848Z"
  },
  "min_self_delegation": "158000000000000000000",
  "tat_tokens": "0",
  "new_tokens": "0",
  "tat_power": "0",
  "newunit_power": "0"
}
```

> treasurenetd query staking delegations [delegator-address] --home --output json | jq - 根据地址查询委托详情

```json
{
  "delegation_responses": [
    {
      "delegation": {
        "delegator_address": "treasurenet1wf78qmzhfsjndy3v6wsdxjfqnmwnyy2grwxmrg",
        "validator_address": "treasurenetvaloper1wf78qmzhfsjndy3v6wsdxjfqnmwnyy2gzs46zq",
        "shares": "268000000000000000000.000000000000000000",
        "tat_shares": "0"
      },
      "balance": {
        "denom": "aunit",
        "amount": "268000000000000000000"
      }
    }
  ],
  "pagination": {
    "next_key": null,
    "total": "0"
  }
}
```

> treasurenetd query staking delegations-to [validator-address] --home --output json | jq - 查询一个验证者的所有委托

```json
{
  "delegation_responses": [
    {
      "delegation": {
        "delegator_address": "treasurenet1wf78qmzhfsjndy3v6wsdxjfqnmwnyy2grwxmrg",
        "validator_address": "treasurenetvaloper1wf78qmzhfsjndy3v6wsdxjfqnmwnyy2gzs46zq",
        "shares": "268000000000000000000.000000000000000000",
        "tat_shares": "0"
      },
      "balance": {
        "denom": "aunit",
        "amount": "268000000000000000000"
      }
    }
  ],
  "pagination": {
    "next_key": null,
    "total": "0"
  }
}
```
