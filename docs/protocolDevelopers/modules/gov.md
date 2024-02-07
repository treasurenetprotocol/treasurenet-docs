---
sidebar_position: 7
---

# Gov

## Introduction

Gov module is responsible for on-chain governance

The upgrade of blockchain applications requires community consensus on the upgrade content across the entire network. However, community consensus is often difficult to achieve. In order to address the challenges of reaching community consensus, the gov module implements the functionality of on-chain governance.

Anyone can modify a specific parameter or upgrade the code by initiating an on-chain proposal. On-chain asset holders can express their support or opposition to the proposal through voting. Only votes represented by on-chain assets that have participated in the consensus voting through staking are considered valid. When there is sufficient support for a proposal through voting, the proposal becomes effective.

## Parameters

Below are all the network parameters for the gov module:

- deposit_params - Deposit related parameters:
  - min_deposit: Minimum deposit amount.
  - max_deposit_period: Maximum period for proposal deposits.
- voting_params - Voting related parameters:
  - voting_period: Voting period.
- tally_params - Tally related parameters:
  - quorum: Minimum percentage of voting power required for a proposal to be considered valid.
  - threshold: Minimum proportion of votes required for a proposal to be accepted, including votes in favor and abstentions.
  - veto: Minimum proportion of votes required to veto a proposal, including votes against and strongly against.

## Proposal Creation and Voting

Anyone can initiate an on-chain proposal by sending a message of type MsgSubmitProposal using the struct type `MsgSubmitProposal`.

```golang
type MsgSubmitProposal struct {
	Content        *types.Any                               // Proposal content
	InitialDeposit github_com_cosmos_cosmos_sdk_types.Coins // Initial deposit
	Proposer       string                                   // Proposer
}

```

To prevent the submission of spam proposals, it is required that each proposer collateralizes a certain amount of on-chain assets as initial collateral for their proposal. The gov module mandates that the initial collateral must not be zero.
If the proposer's initial collateral fails to meet the minimum collateral requirement, on-chain asset holders can add additional collateral to the proposal they support by sending a MsgDeposit message.

```golang

type MsgDeposit struct {
  ProposalId uint64 // Proposal ID
  Depositor string // Depositor
  Amount github_com_cosmos_cosmos_sdk_types.Coins// Deposit Amount
}
```

The minimum required deposit amount is specified by the module parameter MinDeposit in order to prevent a proposal from being stuck in a non-voting state for an extended period. To further prevent a proposal from being stuck in a non-voting state, the gov module specifies a time period during which additional deposits can be made through the parameter MaxDepositPeriod. If the proposal's deposit does not reach the minimum requirement after the timeout, the proposal is closed and the corresponding deposit is "burned". The proposal's deposit is stored in the Gov module account.

### Proposal Types

1. Text Proposal: This type of proposal only contains a title and description. It does not have any impact on the on-chain behavior once it is enacted. It is used solely for gathering community feedback. A text proposal does not include any code, and its approval does not directly result in any changes to the chain. Text proposals serve as an official and public way to conduct community opinion surveys. They are stored on the chain and can be viewed by anyone. The initiator of a proposal can use a text proposal to collect opinions and perspectives in preparation for future work.

The TextProposal structure is used to implement a text proposal.

```golang
type TextProposal struct {
	Title       string
	Description string
}
```

There are three components:

1. Title - the distinguishing name of the proposal, typically the way the that explorers list proposals
2. Description - the body of the proposal that further describes what is being proposed and details surrounding the proposal
3. Deposit - the amount that will be contributed to the deposit from the account submitting the proposal
   Real example

```json
{
  "title": "Test Proposal",
  "description": "My awesome proposal",
  "type": "Text",
  "deposit": "10unit"
}
```

2. Proposal for Parameter Modification: Each module has its own set of parameters, and any of these parameters can be updated using a parameter modification proposal. Currently, the parameters in these modules can be changed through governance proposals, and new modules will be added in the future.
   - [auth](./auth.md) - Account and transaction authentication module
   - [bank](./bank.md) - Token transfer
   - [mint](./mint.md) - Creation of new staking tokens
   - [staking](./staking.md) - On-chain asset staking
   - [slashing](./slashing.md) - Validator punishment mechanism
   - [gov](./gov.md) - On-chain governance proposals and voting
   - [distribution](./distribution.md) - Reward distribution

For parameter-change proposals, there are arguably seven (7) components, though three are nested beneath 'Changes':

1. Title - the distinguishing name of the proposal, typically the way the that explorers list proposals
2. Description - the body of the proposal that further describes what is being proposed and details surrounding the proposal
3. Changes - a component containing
4. Subspace - the Cosmos Hub module with the parameter that is being changed
5. Key - the parameter that will be changed
6. Value - the value of the parameter that will be changed by the governance mechanism
7. Deposit - the amount that will be contributed to the deposit from the account submitting the proposal

   Real example

```json
{
  "title": "Staking Param Change",
  "description": "Update max validators",
  "changes": [
    {
      "subspace": "staking",
      "key": "MaxValidators",
      "value": 105
    }
  ],
  "deposit": "1000stake"
}
```

3. Community Reserve Fund Expenditure Proposal: A portion of the block rewards will be used as the community reserve fund to support community development. The community reserve fund expenditure proposal involves transferring a portion of the community reserve fund to a specific address for rewarding contributing accounts.

There are five components:

1. Title - the distinguishing name of the proposal, typically the way the that explorers list proposals
2. Description - the body of the proposal that further describes what is being proposed and details surrounding the proposal
3. Recipient - the Cosmos Hub (bech32-based) address that will receive funding from the Community Pool
4. Amount - the amount of funding that the recipient will receive
5. Deposit - the amount that will be contributed to the deposit from the account submitting the proposal
   If the description says that a certain address will receive a certain number of UNITs, it should also be programmed to do that, but it's possible that that's not the case (accidentally or otherwise). Check that the description aligns with teh 'recipient' address.
   Real example

```json
{
  "title": "Community Pool Spend",
  "description": "Pay me some Units!",
  "recipient": "treasurenet1wf78qmzhfsjndy3v6wsdxjfqnmwnyy2grwxmrg",
  "amount": "1000unit",
  "deposit": "1unit"
}
```

4. Software Upgrade Proposal.

When implementing the proposal, the proposal handling functions need to be identified, and each module can define new proposal types.

- The "params" module defines proposals for parameter modifications.
- The "distribution" module defines proposals for spending community reserves.
- The "upgrade" module defines proposals for software upgrades.

Following the principle of modular design, each module manages its own storage space, and the execution of each proposal can only be defined within the corresponding module. The "gov" module manages the voting for all proposals and triggers the corresponding proposal handling functions in the `EndBlocker()`.

The Keeper of the "gov" module defines respective handling functions for the above 5 messages. Meanwhile, the logic of the "staking" module revolves around the validator struct and the delegation struct. The former records validator information, while the latter records delegation operations.

For example, in the "treasurenet/app" file, the routing information for governance proposals is defined.

```golang
govRouter := govtypes.NewRouter()
	govRouter.AddRoute(govtypes.RouterKey, govtypes.ProposalHandler).
		AddRoute(paramproposal.RouterKey, params.NewParamChangeProposalHandler(app.ParamsKeeper)).
```

The function NewParamChangeProposalHandler() in the corresponding params module only handles proposals for modifying parameter types.

### Proposal Process

![Government Process](/img/docs/gov.jpg)

## Transactions and Queries

### Transactions

> treasurenetd tx gov submit-proposal - submit a proposal and initial deposit

- treasurened tx gov submit-proposal (proposal type>):
  - If the proposal type is empty, it means it is a text proposal.
  - If the proposal type is param-change, it means we are submitting a parameter change proposal.
  - If the proposal type is community-pool-spend, it means we are submitting a community pool spend proposal.
  - If the proposal type is software-upgrade, it means we are submitting a software upgrade proposal.
  - If the proposal type is cancel-software-upgrade, it means we are submitting a proposal to cancel a software upgrade.

#### Submitting Text Proposal

```sh
$ treasurenetd tx gov submit-proposal \
--proposal="/root/proposal_text.json" \
--from="[name_of_your_key]" \
--chain-id="[chain-id]" \
--fees="1unit" \
--gas="auto" \
--home="[defaule:/root/.treasurenet/]" \
--keyring-backend test

## Transactions payload##
{"body":{"messages":[{"@type":"/cosmos.gov.v1beta1.MsgSubmitProposal","content":{"@type":"/cosmos.gov.v1beta1.TextProposal","title":"Test Proposal","description":"My awesome proposal"},"initial_deposit":[{"denom":"aunit","amount":"10000000000000000000"}],"proposer":"treasurenet1wf78qmzhfsjndy3v6wsdxjfqnmwnyy2grwxmrg"}],"memo":"","timeout_height":"0","extension_options":[],"non_critical_extension_options":[]},"auth_info":{"signer_infos":[],"fee":{"amount":[{"denom":"aunit","amount":"1000000000000000000"}],"gas_limit":"152151","payer":"","granter":""}},"signatures":[]}

confirm transaction before signing and broadcasting [y/N]: y
```

#### Submit Parameter Modification Proposal

```sh
$ treasurenetd tx gov submit-proposal param-change /root/proposql_param.json \
--from="[name_of_your_key]" \
--chain-id="[chain-id]" \
--fees="1unit" \
--gas="auto" \
--home="[defaule:/root/.treasurenet/]" \
--keyring-backend test

## Transactions payload##
{"body":{"messages":[{"@type":"/cosmos.gov.v1beta1.MsgSubmitProposal","content":{"@type":"/cosmos.params.v1beta1.ParameterChangeProposal","title":"Staking Param Change","description":"Update max validators","changes":[{"subspace":"staking","key":"MaxValidators","value":"105"}]},"initial_deposit":[{"denom":"stake","amount":"1000"}],"proposer":"treasurenet1wf78qmzhfsjndy3v6wsdxjfqnmwnyy2grwxmrg"}],"memo":"","timeout_height":"0","extension_options":[],"non_critical_extension_options":[]},"auth_info":{"signer_infos":[],"fee":{"amount":[{"denom":"aunit","amount":"1000000000000000000"}],"gas_limit":"145519","payer":"","granter":""}},"signatures":[]}

confirm transaction before signing and broadcasting [y/N]: y
```

#### Submit Community Reserve Fund Expenditure Proposal.

```sh
$ treasurenetd tx gov submit-proposal community-pool-spend /root/proposal_community.json \
--from="[name_of_your_key]" \
--chain-id="[chain-id]" \
--fees="1unit" \
--gas="auto" \
--home="[defaule:/root/.treasurenet/]" \
--keyring-backend test

## Transactions payload##
{"body":{"messages":[{"@type":"/cosmos.gov.v1beta1.MsgSubmitProposal","content":{"@type":"/cosmos.distribution.v1beta1.CommunityPoolSpendProposal","title":"Community Pool Spend","description":"Pay me some Units!","recipient":"treasurenet1wf78qmzhfsjndy3v6wsdxjfqnmwnyy2grwxmrg","amount":[{"denom":"aunit","amount":"100000000000000000000"}]},"initial_deposit":[{"denom":"aunit","amount":"1000"}],"proposer":"treasurenet1wf78qmzhfsjndy3v6wsdxjfqnmwnyy2grwxmrg"}],"memo":"","timeout_height":"0","extension_options":[],"non_critical_extension_options":[]},"auth_info":{"signer_infos":[],"fee":{"amount":[{"denom":"aunit","amount":"1000000000000000000"}],"gas_limit":"163639","payer":"","granter":""}},"signatures":[]}

confirm transaction before signing and broadcasting [y/N]: y
```

> treasurenetd tx gov deposit [proposal-id] [deposit] - deposit tokens for active proposals
> Users can submit deposit transactions to fund and support positive proposals

```sh
treasurenetd tx tx gov deposit 2 1unit
--from treasurenet1wf78qmzhfsjndy3v6wsdxjfqnmwnyy2grwxmrg
--home (defaule:"/root/.treasurenet/")
--fees 1unit
--gas auto
--keyring-backend test

## Transactions payload##
{"body":{"messages":[{"@type":"/cosmos.gov.v1beta1.MsgDeposit","proposal_id":"2","depositor":"treasurenet1wf78qmzhfsjndy3v6wsdxjfqnmwnyy2grwxmrg","amount":[{"denom":"aunit","amount":"1000000000000000000"}]}],"memo":"","timeout_height":"0","extension_options":[],"non_critical_extension_options":[]},"auth_info":{"signer_infos":[],"fee":{"amount":[{"denom":"aunit","amount":"1000000000000000000"}],"gas_limit":"125659","payer":"","granter":""}},"signatures":[]}

confirm transaction before signing and broadcasting [y/N]: y
```

> treasurenetd tx gov vote [proposal-id] [option] - vote for a positive proposal
> Users can vote for an active proposal. Valid values for the field"option" can be "yes","no","no_with_veto",and "abstain"

```sh
treasurenetd tx gov vote 2 yes
--home (defaule:"/root/.treasurenet/")
--from treasurenet1wf78qmzhfsjndy3v6wsdxjfqnmwnyy2grwxmrg
--chain-id treasurenet_5005-1
--fees 1unit
--gas auto
--keyring-backend test

## Transactions payload##
{"body":{"messages":[{"@type":"/cosmos.gov.v1beta1.MsgVote","proposal_id":"2","voter":"treasurenet1wf78qmzhfsjndy3v6wsdxjfqnmwnyy2grwxmrg","option":"VOTE_OPTION_YES"}],"memo":"","timeout_height":"0","extension_options":[],"non_critical_extension_options":[]},"auth_info":{"signer_infos":[],"fee":{"amount":[{"denom":"aunit","amount":"1000000000000000000"}],"gas_limit":"104034","payer":"","granter":""}},"signatures":[]}

confirm transaction before signing and broadcasting [y/N]: y
```

### Queries

> treasurenetd query gov proposals --home -o json | jq - query all proposals

```json
{
  "proposals": [
    {
      "proposal_id": "1",
      "content": {
        "@type": "/cosmos.params.v1beta1.ParameterChangeProposal",
        "title": "Staking Param Change",
        "description": "Update max validators",
        "changes": [
          {
            "subspace": "staking",
            "key": "MaxValidators",
            "value": "105"
          }
        ]
      },
      "status": "PROPOSAL_STATUS_DEPOSIT_PERIOD",
      "final_tally_result": {
        "yes": "0",
        "abstain": "0",
        "no": "0",
        "no_with_veto": "0"
      },
      "submit_time": "2023-02-16T07:48:55.807762743Z",
      "deposit_end_time": "2023-02-18T07:48:55.807762743Z",
      "total_deposit": [
        {
          "denom": "stake",
          "amount": "1000"
        }
      ],
      "voting_start_time": "0001-01-01T00:00:00Z",
      "voting_end_time": "0001-01-01T00:00:00Z"
    },
    {
      "proposal_id": "2",
      "content": {
        "@type": "/cosmos.gov.v1beta1.TextProposal",
        "title": "Test Proposal",
        "description": "My awesome proposal"
      },
      "status": "PROPOSAL_STATUS_VOTING_PERIOD",
      "final_tally_result": {
        "yes": "0",
        "abstain": "0",
        "no": "0",
        "no_with_veto": "0"
      },
      "submit_time": "2023-02-16T08:02:28.455657793Z",
      "deposit_end_time": "2023-02-18T08:02:28.455657793Z",
      "total_deposit": [
        {
          "denom": "aunit",
          "amount": "11000000000000000000"
        }
      ],
      "voting_start_time": "2023-02-16T08:02:28.455657793Z",
      "voting_end_time": "2023-02-18T08:02:28.455657793Z"
    },
    {
      "proposal_id": "3",
      "content": {
        "@type": "/cosmos.distribution.v1beta1.CommunityPoolSpendProposal",
        "title": "Community Pool Spend",
        "description": "Pay me some Units!",
        "recipient": "treasurenet1wf78qmzhfsjndy3v6wsdxjfqnmwnyy2grwxmrg",
        "amount": [
          {
            "denom": "aunit",
            "amount": "100000000000000000000"
          }
        ]
      },
      "status": "PROPOSAL_STATUS_DEPOSIT_PERIOD",
      "final_tally_result": {
        "yes": "0",
        "abstain": "0",
        "no": "0",
        "no_with_veto": "0"
      },
      "submit_time": "2023-02-16T09:15:47.167996954Z",
      "deposit_end_time": "2023-02-18T09:15:47.167996954Z",
      "total_deposit": [
        {
          "denom": "aunit",
          "amount": "1000"
        }
      ],
      "voting_start_time": "0001-01-01T00:00:00Z",
      "voting_end_time": "0001-01-01T00:00:00Z"
    }
  ],
  "pagination": {
    "next_key": null,
    "total": "0"
  }
}
```

> treasurenetd query gov proposal [proposal-id] --home --output json | jq - query the details of an individual proposal by the ID of the proposal

```json
{
  "proposal_id": "2",
  "content": {
    "@type": "/cosmos.gov.v1beta1.TextProposal",
    "title": "Test Proposal",
    "description": "My awesome proposal"
  },
  "status": "PROPOSAL_STATUS_VOTING_PERIOD",
  "final_tally_result": {
    "yes": "0",
    "abstain": "0",
    "no": "0",
    "no_with_veto": "0"
  },
  "submit_time": "2023-02-16T08:02:28.455657793Z",
  "deposit_end_time": "2023-02-18T08:02:28.455657793Z",
  "total_deposit": [
    {
      "denom": "aunit",
      "amount": "11000000000000000000"
    }
  ],
  "voting_start_time": "2023-02-16T08:02:28.455657793Z",
  "voting_end_time": "2023-02-18T08:02:28.455657793Z"
}
```

> treasurenetd query gov tally [proposal-id] --home -o json | jq - query the details of an individual proposal by the ID of the proposal

```json
{
  "yes": "268000000000000000000", //The number of votes is proportional to the weight. The number of votes is the same as the weight.
  "abstain": "0",
  "no": "0",
  "no_with_veto": "0"
}
```
