---
sidebar_position: 6
---

# Slashing

## Introduction

Slashing is a punishment module that is divided into active slashing and passive slashing. Validators are responsible for signing or proposing a block in each round of consensus. Punishments should be imposed on validators for improper behavior to reinforce this.

Specifically, slashing aims to suppress observable behaviors on the network, such as faulty validations. Punishments may include loss of a certain amount of stake, temporary loss of the ability to perform network functions, or obtaining rewards.

Passive slashing refers to the poor availability of active validator nodes, specifically when the number of blocks signed by active validators falls below a certain threshold within a given time window.

Active slashing refers to active validators deviating from the consensus protocol, such as voting (signing) for different blocks at the same block height in violation of the consensus protocol.

### Passive Punishment

The pointer of the Commit type in the blocks built by Tendermint contains voting information for the previous block.

```golang
type Commit struct {
	Height     int64       `json:"height"`     // Block height
	Round      int32       `json:"round"`      // Indicates the round in which consensus was reached
	BlockID    BlockID     `json:"block_id"`   // Block identifier
	Signatures []CommitSig `json:"signatures"` // Voting information of the active validator set is included in signatures
	hash       tmbytes.HexBytes
	bitArray   *bits.BitArray
}

```

Due to possible network delays and other issues, it is possible that a certain active validator fails to receive a block identified as BlockID in a timely manner, or the proposer constructing that block fails to collect all the votes for that block. The consensus protocol allows active validators to vote for an empty value instead of a specific block. Therefore, it is necessary to distinguish among three situations: active validators voting for the actual block, voting for an empty value, and not voting at all.

```golang
type CommitSig struct {
	BlockIDFlag      BlockIDFlag `json:"block_id_flag"`
	ValidatorAddress Address     `json:"validator_address"`
	Timestamp        time.Time   `json:"timestamp"`
	Signature        []byte      `json:"signature"`
}
```

CommitSig distinguishes the situation through the BlockIDFlag field.
The bitArray in the Commit structure marks, in the form of bits, which active validators were included in the block during the voting process for the previous block, based on the value of BlockIDFlag in CommitSig: whenever a vote from an active validator is included in the Signature, the corresponding bit in the bitArray is set.

In the current Treasurenet network, the threshold is set at 5%, which means that as long as the missed blocks within a fixed time window are less than 95%, the slashing module will not impose any punishment.

After the end of the prison confinement period, validators need to actively apply for release in order to participate again as active validators. This is because when there is passive misbehavior, it may be due to operational issues with the node, and the time required for repairs is unknown. If the release is initiated but the node's operations are not resolved, it will continue to face passive punishments, resulting in multiple punishments for the same issue.

### Active Misbehavior

Active validators can engage in misbehavior in various ways, such as maliciously deviating from the consensus protocol and sending multiple messages. The prison confinement time for double-sign misbehavior is permanent. Since the information of the validator is not deleted on the chain, the permanent prison record regarding this malicious validator will remain on the chain, rendering the validator's address permanently invalid. Therefore, the operator can only participate in voting power competition again by recreating a new validator (using new consensus keys and address). Prior to that, a complete unbonding period is required to retrieve the on-chain assets staked with the misbehaving validator. The active punishment ratio is specified by the parameter slash_fraction_double_sign, with a default value of 5%.

Three scenarios of active misbehavior:

1. When executing BeginBlocker(), if the availability of a validator is poor, a small portion of the on-chain assets will be penalized, and the validator's "jailed" field will be set to true.
2. When executing BeginBlocker(), if evidence of valid double-signing by a validator is found, a proportionate amount of on-chain assets will be penalized, and the validator's "Jailed" field will be set to true.
3. Withdrawal or redelegation actions initiated by the validator operator result in insufficient on-chain assets for self-delegation.

## Network Parameters

The following are all the network parameters used to configure validator punishment behavior. Detailed information about all these parameters and their impact on validator punishment behavior will be discussed later in this document.

```json
signed_blocks_window: The number of blocks used to track activity for calculating uptime.
min_signed_per_window: The maximum percentage of blocks allowed to be signed/missed by the last account before blocking the signed_blocks_window.
downtime_jail_duration: Duration of the jail time.
slash_fraction_double_sign: The percentage of funds reduced when a validator commits a Byzantine error.
slash_fraction_downtime: The percentage of funds reduced when a validator is inactive.
```

## Transactions and Queries

### Transactions

> treasurenetd tx slashing unjail - release the validator
> You can see the status of the validator by using treasurenetd query staking validator [validator-address] --home --output json | jq 

```sh
$ treasurenetd query staking validator \
--from=[name_of_your_key] \
--keyring-backend test
--output json | jq
```

```json
{
  "operator_address": "treasurenetvaloper1wf78qmzhfsjndy3v6wsdxjfqnmwnyy2gzs46zq",
  "consensus_pubkey": .....,
  ......
  "jailed": true,
  "status": "BOND_STATUS_BONDED",
  "tokens": "268000000000000000000",
  "delegator_shares": "268000000000000000000.000000000000000000",
  .......
}
```

If the "jailed" status in the validator is true, it indicates that the validator is in a jailed state. After the jail term, the validator can be released.

```sh
treasurenetd tx slashing unjail
--from treasurenet1wf78qmzhfsjndy3v6wsdxjfqnmwnyy2grwxmrg
--home (defaule:"/root/.treasurenet/")
--chain-id
--fees 1unit
--gas auto
--keyring-backend test

## Transactions payload##
{"body":{"messages":[{"@type":"/cosmos.staking.v1beta1.MsgUnjail","delegator_address":"treasurenet1wf78qmzhfsjndy3v6wsdxjfqnmwnyy2grwxmrg","validator_address":"treasurenetvaloper1wf78qmzhfsjndy3v6wsdxjfqnmwnyy2gzs46zq","amount":{"denom":"aunit","amount":"10000000000000000000"}}],"memo":"","timeout_height":"0","extension_options":[],"non_critical_extension_options":[]},"auth_info":{"signer_infos":[],"fee":{"amount":[{"denom":"aunit","amount":"1000000000000000000"}],"gas_limit":"214201","payer":"","granter":""}},"signatures":[]}

confirm transaction before signing and broadcasting [y/N]: y
```

### Queries

> treasurenetd query slashing params --home --output json | jq - query the penalty parameters

```json
{
  "signed_blocks_window": "100",
  "min_signed_per_window": "0.500000000000000000",
  "downtime_jail_duration": "600s",
  "slash_fraction_double_sign": "0.050000000000000000",
  "slash_fraction_downtime": "0.010000000000000000"
}
```
