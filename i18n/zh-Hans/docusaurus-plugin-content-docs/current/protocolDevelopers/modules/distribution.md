---
sidebar_position: 8
---


# Distribution分配模块

## 介绍

distribution 负责将奖励分配给验证者和委托者。

[mint 模块](./mint.md)铸造的链上资产与区块交易费一起作为区块奖励，在活跃验证者之间按照各自的投票权重按比例分发，分到奖励的验证者再根据当前每个委托人的份额将奖励分给委托人。在以太坊中区块奖励会通过一笔交易(Coinbase 交易)直接转入目标账户。在 Treasurenet 中采取了另外一种策略，我们称为被动奖励分发，即区块奖励不会主动转入目标账户，validator 运营方或者委托人想要提取奖励时，需要主动发起提现交易。
这里需要注意的是，当我们链上某一个 validator 的权重发生改变的时候(重新委托或者撤回委托等操作)，区块奖励会自动的分发下去。

distribution 奖励分发过程:

- 在活跃验证者之间按照投票权重分发区块奖励。
- 从所有的区块奖励中按照参数 CommunityTax(默认为 2%)抽取固定比例作为社区税，存放在我们的社区池中，用于后面我们的社区建设，可以通过 gov 的方式来讲这部分 token 奖励给对社区做出过贡献的。
- 区块提案者获得当前奖励的固定比例(由参数 BaseProposerReward 默认为 1%,TatReward 默认为 80%)。
- 根据区块中包含的投票信息，给区块提案者分配额外奖励。
  - 区块中包含的投票信息与参数 BonusProposerReward(默认为 4%)决定了额外奖励的比例。
  - 当所有活跃验证者都进行了投票并且所有投票都被打包进区块时区块提案者可以得到的额外奖励比例增大，比例由 BonusProposerReward 指定。
  - 当验证者有 TAT 进行了委托，提案者获取的额外奖励比例增大，比例为 TatReward(默认为 80%)。
- 扣除社区税、扣除区块提案者的基础奖励和额外奖励之后，剩余的区块奖励在所有的活跃验证者(包含区块提案者)之间按照投票权重进行分发。
- 验证者抽取整体收益的一定比例作为自己的佣金(commission)，这个比例由 Validator 中 Commission 指定。
- 扣除佣金之后的收益，按照抵押份额在验证者的委托人之间进行分发，验证者自抵押部分也在这一步中参与分成。

```golang
type Validator struct {
	OperatorAddress string                                  //验证者节点地址
	ConsensusPubkey *types1.Any                             //验证者的共识公钥
	Jailed bool                                             //验证者是否处于监禁惩罚
	Status BondStatus                                       //验证者状态
	Tokens github_com_cosmos_cosmos_sdk_types.Int           //质押链上资产数量
	DelegatorShares github_com_cosmos_cosmos_sdk_types.Dec  //分配给验证者的委托人份额总量
	Description Description                                 //验证者描述信息
	UnbondingHeight int64                                   //验证者开始解绑周期的区块高度
	UnbondingTime time.Time                                 //验证者完成解绑周期的最早时间
	Commission Commission                                   //验证者的佣金
	MinSelfDelegation github_com_cosmos_cosmos_sdk_types.Int//验证者声明的最小自抵押量
	TatTokens github_com_cosmos_cosmos_sdk_types.Int        //质押TAT的链上资产
	NewTokens github_com_cosmos_cosmos_sdk_types.Int        //验证者TAT和UNIT的资产总量
	TatPower github_com_cosmos_cosmos_sdk_types.Int         //分配给验证者TAT的委托人份额总量
	NewUnitPower github_com_cosmos_cosmos_sdk_types.Int     //分配给验证者(TAT+UNIT)的委托人份额总量
}
````

区块提案者的基础奖励比例固定，但额外奖励比例是浮动的，计算方式为:

```sh
BaseProposerReward + BonusProposerReward * (sumPrecommitPower / totalPower)
```

其中 totalPower 代表当前活跃验证者集合的投票权重之和，而 sumPrecommitPower 代表区块中所包含的投票权重之和。

活跃验证者的运营方可以获得的奖励包括自抵押收益和佣金收益，委托人可以获得的奖励只有抵押收益。委托人通过发送消息 MsgWithdrawDelegatorReward 可以取回自己抵押的链上资产所累积的收益(验证者的运营方也是通过发送该消息取回自抵押部分的收益),同时验证者运营方还可以通过发送消息 MsgWithdrawValidatorCommission 取回佣金收益。收益默认会转到最初发送委托操作的账户地址中,也可以重新设定接受收益的账户地址。

## 网络参数

以下是 distribution 模块的所有网络参数：

- community_tax - 社区税率；
- base_proposer_reward - 在有效区块中收取的交易费用的基本奖金比例；
- bonus_proposer_reward - 有效区块中收取的交易费用的最大奖励比例；
- tat_reward - 获取 tat 奖励的比例；
- withdraw_addr_enabled - 委托人是否可以设置不同地址提取奖励。

## 交易和查询

### 交易

> treasurenetd tx distribution withdraw-all-rewards - 提取委托人的所有委托-委托人可以一次性从他们委托给的验证人那里收回他们的奖励。

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

> treasurenetd tx distribution withdraw-rewards [validator_address] - 从给定的验证者地址提取奖励       委托人可以从特定的验证者那里提取奖励

> 验证者可以通过添加 commission flag 来提取除奖励之外的佣金 --commission

> treasurenetd tx distribution withdraw-rewards [validator_address] --from [name_of_your_key] --commission

> 验证者可以通过添加 commission flag 来提取通过质押 tat 来获取的奖励 --tatreward

>  treasurenetd tx distribution withdraw-rewards [validator_address] --from [name_of_your_key] --tatreward

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

> treasurenetd tx distribution set-withdraw-addr [withdraw-addr] - 更改与地址关联的奖励的默认提款地址
> 委托人可以设置不同的地址来提取他们的奖励

> treasurenetd tx distribution fund-community-pool [amount]- 以指定金额为社区资金池提供资金
> 用户可以为社区池做出一定数量的贡献

### 查询

> treasurenetd query distribution commission [validator_address] --home --output json | jq - 查询分配验证者佣金
> 我们可以检查特定验证器的佣金

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

> treasurenetd query distribution tatreward [validator_address] --home --output json | jq - 查询分配验证者 TaT 奖励
> 我们可以检查质押 tat 后获取的 tat 奖励


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

> treasurenetd query distribution community-pool --home --output json | jq - 查询社区池中的硬币数量
> 我们可以查看社区池的余额

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

> treasurenetd query distribution rewards [delegator-addr] [validator-addr] --home --output json | jq - 查询所有分配委托人的奖励或来自特定验证者的奖励
> 我们可以检查特定验证器上委托的当前奖励。



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

> treasurenetd query distribution validator-outstanding-rewards [validator_address] --home --output json | jq - 查询验证者及其所有委托的未分配奖励
> 我们可以检查验证者及其所有委托的未分配（未提取）奖励。

```json
{
  "rewards": [
    {
      "denom": "aunit",
      "amount": "2678957325000048510549.760000000000000000"
    }
  ]
}
