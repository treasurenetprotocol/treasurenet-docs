---
sidebar_position: 7
---

<<<<<<< HEAD
# 治理模块

## Introduction

gov 模块负责链上治理。

区块链应用的升级需要在全网就升级内容达成社区共识，而社区共识通常很难达成，为了应对达成社区共识的挑战，gov 模块实现了这一链上治理的功能。

任何人都可以通过发起链上提案来修改某一个参数，或者对代码进行升级，链上资产持有人可以通过对提案投票的方式来表达对提案的支持或者反对,只有通过抵押参与了共识投票的链上资产所代表的投票才算有效投票，当有足够多的投票支持提案时，提案生效。

## 相关参数

以下是 gov 模块的所有网络参数：

- deposit_params - 与抵押相关的参数：
  - min_deposit：最小抵押资金；
  - max_deposit_period：提案存款的最长期限。
- voting_params - 与投票相关的参数
  - voting_period：投票期间
- tally_params - 与计数相关的参数
  - quorum：为使提案有效需要投票权的最低百分比；
  - threshold：提案被选中的最低票数比例包括赞同、弃权投票类型的占比；
  - veto：否决提案的最低票数比例，包括反对、强烈反对投票类型。

## 提案的创建与投票

任何人都可以通过 MsgSubmitProposql 结构体类型的消息发起链上提案。

=======
# Gov

## Introduction

gov 模块负责链上治理

区块链应用的升级需要在全网就升级内容达成社区共识，而社区共识通常很难达成，为了应对达成社区共识的挑战，gov模块实现了这一链上治理的功能

任何人都可以通过发起链上提案来修改某一个参数，或者对代码进行升级，链上资产持有人可以通过对提案投票的方式来表达对提案的支持或者反对,只有通过抵押参与了共识投票的链上资产所代表的投票才算有效投票，当有足够多的投票支持提案时，提案生效。

## parameters
Below are all the network parameters for the gov module:

* deposit_params - Deposit related parameters:
  - min_deposit: 最小抵押资金;
  - max_deposit_period: 提案存款的最长期限。
* voting_params - Voting related parameters
  - voting_period: 投票期
* tally_params - Tally related parameters
  - quorum: 为使提案有效需要投票权的最低百分比;
  - threshold: 提案被选中的最低票数比例包括赞同、弃权投票类型的占比;
  - veto: 否决提案的最低票数比例，包括反对、强烈反对投票类型。

## 提案的创建与投票

任何人都可以通过MsgSubmitProposql结构体类型的消息发起链上提案。
>>>>>>> feature/1.0.1
```golang
type MsgSubmitProposal struct {
	Content        *types.Any                               // 提案内容
	InitialDeposit github_com_cosmos_cosmos_sdk_types.Coins // 初始抵押资金
	Proposer       string                                   // 提案者
}
```
<<<<<<< HEAD

为了防止发起垃圾提案，要求每个提案者为其发起的提案抵押一定的链上资产作为初始抵押资金，gov 模块要求初始抵押资金不为零。
如果提案者的初始抵押资金不满足最小抵押要求，链上资产持有人可以通过发送 MsgDeposit 消息为自己支持的提案追加抵押资金。

=======
为了防止发起垃圾提案，要求每个提案者为其发起的提案抵押一定的链上资产作为初始抵押资金，gov模块要求初始抵押资金不为零。
如果提案者的初始抵押资金不满足最小抵押要求，链上资产持有人可以通过发送MsgDeposit消息为自己支持的提案追加抵押资金。
>>>>>>> feature/1.0.1
```golang
type MsgDeposit struct {
	ProposalId uint64                                  // 提案标识
	Depositor  string                                  // 存款人
	Amount     github_com_cosmos_cosmos_sdk_types.Coins// 存款金额
}
```
<<<<<<< HEAD

最小抵押资金数由模块参数 MinDeposit 指定为了防止一个提案长期处于无法投票的状态，为了防止一个提案长期处于无法投票的状态,gov 模块通过参数 MaxDepositPeriod 指定了可以追加抵押资金的时间段，超时之后如果提案的抵押资金仍然没有达到最小抵押要求，则关闭提案并且"燃烧"相应的抵押资金。提案的抵押资金保存在 Gov 模块账户中。
=======
最小抵押资金数由模块参数MinDeposit指定为了防止一个提案长期处于无法投票的状态，为了防止一个提案长期处于无法投票的状态,gov模块通过参数MaxDepositPeriod指定了可以追加抵押资金的时间段，超时之后如果提案的抵押资金仍然没有达到最小抵押要求，则关闭提案并且"燃烧"相应的抵押资金。提案的抵押资金保存在Gov模块账户中。
>>>>>>> feature/1.0.1

### 提案类型

1. 纯文本提案: 该提案仅包含标题和描述，提案生效后并不会对链上的任何行为产生影响，只用来征求社区意见，文本提案不包含任何代码，提案一旦通过并不会直接对链造成任何更改。文本提案主要是对社区进行官方、公众民意调查的好方法，且文本提案会保留在链上并且任何人都可以查看，发起提案人可以通过文本提案来收集意见和观点，为后面的工作做准备。
<<<<<<< HEAD

#### TextProposal 结构体用来实现文本提案

=======
TextProposal结构体用来实现文本提案
>>>>>>> feature/1.0.1
```golang
type TextProposal struct {
	Title       string   // 标题
	Description string   // 描述
}
```

<<<<<<< HEAD
这里有三个组成部分：

1. 标题 - 提案的特别名称，通常是探索者列出提案的方式
2. 描述 - 提案的主体部分，进一步描述了提案的内容以及提案的相关细节
3. 存款 - 将从提交提案的账户贡献给存款的金额（以微原子 "uatom" 计）

实际例子

=======
There are three components:

  1. Title - the distinguishing name of the proposal, typically the way the that explorers list proposals
  2. Description - the body of the proposal that further describes what is being proposed and details surrounding the proposal
  3. Deposit - the amount that will be contributed to the deposit (in micro-ATOMs "uatom") from the account submitting the proposal
Real example
>>>>>>> feature/1.0.1
```json
{
  "title": "Test Proposal",
  "description": "My awesome proposal",
  "type": "Text",
  "deposit": "10unit"
}
```

2. 参数修改提案,每个模块都有自己的一组参数，这些参数中的任何一个都可以使用参数更改提案进行更新，目前这些模块中的参数可以通过治理提案进行更改，后期还会加入新的模块。
   - [auth](./auth.md) - 账户和交易认证模块
<<<<<<< HEAD
   - [bank](./bank.md) - token 传输
=======
   - [bank](./bank.md) - token传输
>>>>>>> feature/1.0.1
   - [mint](./mint.md) - 创建新的质押代币
   - [staking](./staking.md) - 链上资产抵押
   - [slashing](./slashing.md) - 验证者惩罚机制
   - [gov](./gov.md) - 链上治理提案和投票
   - [distribution](./distribution.md) - 奖励分配

<<<<<<< HEAD
关于参数变更提案，可以说有七个（7）组成部分，尽管其中三个被归类于'变更'之下：

1. 标题 - 提案的独特名称，通常是探索者列出提案的方式
2. 描述 - 进一步描述所提议的内容以及提案相关详细情况的提案正文
3. 变更 - 包含以下内容的组成部分
4. 子空间 - 带有将要更改的参数的 Cosmos Hub 模块
5. 键 - 将被改变的参数
6. 值 - 通过治理机制将被更改的参数的值
7. 存款 - 提交提案的账户将为存款（以微原子"uatom"为单位）贡献的金额

实际例子

=======
For parameter-change proposals, there are arguably seven (7) components, though three are nested beneath 'Changes':

  1. Title - the distinguishing name of the proposal, typically the way the that explorers list proposals
  2. Description - the body of the proposal that further describes what is being proposed and details surrounding the proposal
  3. Changes - a component containing
  4. Subspace - the Cosmos Hub module with the parameter that is being changed
  5. Key - the parameter that will be changed
  6. Value - the value of the parameter that will be changed by the governance mechanism
  7. Deposit - the amount that will be contributed to the deposit (in micro-ATOMs "uatom") from the account submitting the proposal
Real example
>>>>>>> feature/1.0.1
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

3. 社区储备资金花费提案,部分区块奖励会作为社区储备资金用于支持社区建设，社区储备资金花费提案将部分社区储备资金转到特定的地址,用来奖励做出贡献的账户。

<<<<<<< HEAD
以下是五（5）个组成部分：

1. 标题 - 提案的特殊名称，通常是探索者列出提案的方式
2. 描述 - 进一步描述提议内容及其细节的提案主体
3. 接收方 - 将从社区池中接收资金的 Cosmos Hub（基于 bech32 的）地址
4. 数额 - 接收方将以微 UNIT（uunit）接收的资金数量
5. 存款 - 将从提交提案的帐户中贡献给存款的金额（以微 UNIT "uunit"表示）

如果描述中说某个地址将接收到一定数量的 UNIT，那么也应该进行相应的编程，但可能并非如此（无意或有意）。请检查描述是否与“接收方”地址相符。

实际例子

=======
There are five (5) components:

  1. Title - the distinguishing name of the proposal, typically the way the that explorers list proposals
  2. Description - the body of the proposal that further describes what is being proposed and details surrounding the proposal
  3. Recipient - the Cosmos Hub (bech32-based) address that will receive funding from the Community Pool
  4. Amount - the amount of funding that the recipient will receive in micro-ATOMs (uatom)
  5. Deposit - the amount that will be contributed to the deposit (in micro-ATOMs "uatom") from the account submitting the proposal
If the description says that a certain address will receive a certain number of ATOMs, it should also be programmed to do that, but it's possible that that's not the case (accidentally or otherwise). Check that the description aligns with teh 'recipient' address.
Real example
>>>>>>> feature/1.0.1
```json
{
  "title": "Community Pool Spend",
  "description": "Pay me some Units!",
  "recipient": "treasurenet1wf78qmzhfsjndy3v6wsdxjfqnmwnyy2grwxmrg",
  "amount": "1000unit",
  "deposit": "1unit"
}
```

4. 软件升级提案。

在具体执行提案时，需要找到提案处理函数，每个模块都可以定义新的提案类型。

<<<<<<< HEAD
- params 模块定义了参数修改提案
- distribution 模块定义了社区储备金的花费提案。
- upgrade 模块定义了软件升级提案。

遵循模块化设计理念，各个模块独自管理自己存储空间，各个提案的执行只能定义在相应模块内部。gov 模块管理所有提案的投票,并在 EndBlocker()中出发对应的提案处理函数

gov 模块的 Keeper 为上述 5 个消息分别定义了相应的处理函数。而 staking 模块的所有逻辑都围绕验证者结构体 Validator 和委托结构体 Delegation 展开。前者记录验证者信息，后者记录委托操作信息。

举例：在 treasurenet/app 中定义了 gov 提案治理的路由信息

=======
* params模块定义了参数修改提案
* distribution模块定义了社区储备金的花费提案。
* upgrade模块定义了软件升级提案。

遵循模块化设计理念，各个模块独自管理自己存储空间，各个提案的执行只能定义在相应模块内部。gov模块管理所有提案的投票,并在EndBlocker()中出发对应的提案处理函数


gov模块的Keeper为上述5个消息分别定义了相应的处理函数。而staking模块的所有逻辑都围绕验证者结构体Validator和委托结构体Delegation展开。前者记录验证者信息，后者记录委托操作信息。

举例：在treasurenet/app中定义了gov提案治理的路由信息
>>>>>>> feature/1.0.1
```golang
govRouter := govtypes.NewRouter()
	govRouter.AddRoute(govtypes.RouterKey, govtypes.ProposalHandler).
		AddRoute(paramproposal.RouterKey, params.NewParamChangeProposalHandler(app.ParamsKeeper)).
```
<<<<<<< HEAD

对应 params 模块中的 NewParamChangeProposalHandler() 该函数仅处理提案类型参数修改的提案。
=======
对应params模块中的NewParamChangeProposalHandler()该函数仅处理提案类型参数修改的提案。
>>>>>>> feature/1.0.1

### 提案流程

![gov 流程](/img/docs/gov.jpg)

<<<<<<< HEAD
## 交易和查询

### 交易

> treasurenetd tx gov submit-proposal - 提交提案和初始存款

- treasurened tx gov submit-proposal (proposal type>):
  - proposal type 为空，则说明为文本提案
  - proposal type 为 param-change 说明我们正在提交参数修改提案
  - proposal type 为 community-pool-spend 说明正在提交社区池支出提案
  - proposal type 为 software-upgrade 说明正在提交软件升级的提案
  - proposal type 为 cancel-software-upgrade 说明正在提交取消软件升级的提案

=======
## Transactions and Queries

### Transactions

   > treasurenetd tx gov submit-proposal - 提交提案和初始存款
* treasurened tx gov submit-proposal (proposal type>):
  - proposal type 为空，则说明为文本提案
  - proposal type 为param-change 说明我们正在提交参数修改提案
  - proposal type 为community-pool-spend 说明正在提交社区池支出提案
  - proposal type 为software-upgrade 说明正在提交软件升级的提案
  - proposal type 为cancel-software-upgrade 说明正在提交取消软件升级的提案
>>>>>>> feature/1.0.1
#### 提交文本提案

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
<<<<<<< HEAD

=======
>>>>>>> feature/1.0.1
#### 提交参数修改提案

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
<<<<<<< HEAD

=======
>>>>>>> feature/1.0.1
#### 提交社区储备资金花费提案

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

<<<<<<< HEAD
> treasurenetd tx gov deposit [proposal-id] [deposit] - 为活跃提案存入代币
> 用户可以提交存款交易来资助和支持积极的提案

```sh
treasurenetd tx tx gov deposit 2 1unit
--from treasurenet1wf78qmzhfsjndy3v6wsdxjfqnmwnyy2grwxmrg
--home (defaule:"/root/.treasurenet/")
--fees 1unit
=======
   > treasurenetd tx gov deposit [proposal-id] [deposit] - 为活跃提案存入代币
用户可以提交存款交易来资助和支持积极的提案

```sh
treasurenetd tx tx gov deposit 2 1unit
--from treasurenet1wf78qmzhfsjndy3v6wsdxjfqnmwnyy2grwxmrg 
--home (defaule:"/root/.treasurenet/")  
--fees 1unit 
>>>>>>> feature/1.0.1
--gas auto
--keyring-backend test

## Transactions payload##
{"body":{"messages":[{"@type":"/cosmos.gov.v1beta1.MsgDeposit","proposal_id":"2","depositor":"treasurenet1wf78qmzhfsjndy3v6wsdxjfqnmwnyy2grwxmrg","amount":[{"denom":"aunit","amount":"1000000000000000000"}]}],"memo":"","timeout_height":"0","extension_options":[],"non_critical_extension_options":[]},"auth_info":{"signer_infos":[],"fee":{"amount":[{"denom":"aunit","amount":"1000000000000000000"}],"gas_limit":"125659","payer":"","granter":""}},"signatures":[]}

confirm transaction before signing and broadcasting [y/N]: y
```

<<<<<<< HEAD
> treasurenetd tx gov vote [proposal-id] [option] - 投票给一个积极的提案
> 用户可以投票给一个活跃的提案。字段的有效值"option"可以是"yes"、"no"、"no_with_veto"和"abstain"
=======
   >  treasurenetd tx gov vote [proposal-id] [option] - 投票给一个积极的提案
用户可以投票给一个活跃的提案。字段的有效值"option"可以是"yes"、"no"、"no_with_veto"和"abstain"
>>>>>>> feature/1.0.1

```sh
treasurenetd tx gov vote 2 yes
--home (defaule:"/root/.treasurenet/")
--from treasurenet1wf78qmzhfsjndy3v6wsdxjfqnmwnyy2grwxmrg
--chain-id treasurenet_9000-1
--fees 1unit
--gas auto
--keyring-backend test

## Transactions payload##
{"body":{"messages":[{"@type":"/cosmos.gov.v1beta1.MsgVote","proposal_id":"2","voter":"treasurenet1wf78qmzhfsjndy3v6wsdxjfqnmwnyy2grwxmrg","option":"VOTE_OPTION_YES"}],"memo":"","timeout_height":"0","extension_options":[],"non_critical_extension_options":[]},"auth_info":{"signer_infos":[],"fee":{"amount":[{"denom":"aunit","amount":"1000000000000000000"}],"gas_limit":"104034","payer":"","granter":""}},"signatures":[]}

confirm transaction before signing and broadcasting [y/N]: y
```

<<<<<<< HEAD
### 查询

> treasurenetd query gov proposals --home -o json | jq - 查询所有提案
=======
### Queries

   > treasurenetd query gov proposals --home -o json | jq - 查询所有提案
>>>>>>> feature/1.0.1

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

<<<<<<< HEAD
> treasurenetd query gov proposal [proposal-id] --home --output json | jq - 通过提案的 ID 查询单个提案的详情
=======
   > treasurenetd query gov proposal [proposal-id] --home --output json | jq - 通过提案的ID查询单个提案的详情
>>>>>>> feature/1.0.1

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

<<<<<<< HEAD
> treasurenetd query gov tally [proposal-id] --home -o json | jq - 获取提案投票的总数

```json
=======
   > treasurenetd query gov tally [proposal-id] --home  -o json | jq - 获取提案投票的总数

```json 
>>>>>>> feature/1.0.1
{
  "yes": "268000000000000000000", //票数和权重成正比，权重为多少票数就是多少
  "abstain": "0",
  "no": "0",
  "no_with_veto": "0"
}
<<<<<<< HEAD
```
=======
```
>>>>>>> feature/1.0.1
