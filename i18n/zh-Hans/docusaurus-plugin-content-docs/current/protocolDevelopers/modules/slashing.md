---
sidebar_position: 6
---

# Slashing惩罚模块

## 介绍

slashing 是惩罚模块分为主动作恶处罚和被动作恶处罚。验证者负责在每一轮共识中签署或提议一个区块。应该对验证者的不当行为施加惩罚以强化这一点。

具体来说，slashing 旨在抑制网络可观察行为（例如错误验证）的功能。处罚可能包括失去一定数量的股份、在一段时间内失去执行网络功能的能力、获得奖励等。

被动作恶是指活跃验证者节点的可用性差，具体来说是指在一定的时间窗口内，活跃验证者签署的区块个数低于某个阈值。

主动作恶则是指活跃验证者偏离共识协议规定，比如在同一个区块高度违反共识协议对不同的区块进行投票(签名)。

### 被动惩罚

Tendermint 构建的区块中的 Commit 类型的指针包含对上一个区块的投票信息


```golang
type Commit struct {
	Height     int64       `json:"height"`     //去块高度
	Round      int32       `json:"round"`      //表示第几轮达成的共识
	BlockID    BlockID     `json:"block_id"`   //区块标识
	Signatures []CommitSig `json:"signatures"` //活跃验证者集合的投票信息包含在signatures
	hash     tmbytes.HexBytes
	bitArray *bits.BitArray
}
```

由于可能存在网络延时等问题，可能造成某个活跃验证者未能及时收到标识为 BlockID 的区块，或者构建该区块的提案者没有收集到针对该区块的所有投票，共识协议允许活跃验证者对空值而非对某个具体的区块投票，因此需要区分活跃验证者投票给真正的区块，投票给空值以及没有投票 3 中情况。


```golang
type CommitSig struct {
	BlockIDFlag      BlockIDFlag `json:"block_id_flag"`
	ValidatorAddress Address     `json:"validator_address"`
	Timestamp        time.Time   `json:"timestamp"`
	Signature        []byte      `json:"signature"`
}
```

CommitSig 中通过 BlockIDFlag 字段对情况进行区分。Commit 结构体中的 bitArray 根据 CommitSig 中的 BlockIDFlag 的值，以 bit 的形式标记了有哪些活跃验证者在参与对上一个区块投票的过程中被打包到了区块中:只要 Signature 中包含一个活跃验证者的投票，bitArray 中对应的位就被设置。

当前的 Treasurenet 网络中阈值设定为 5%，也就是说再固定的时间窗口内只要错过的区块不超过 95%就不会被 slashing 模块惩罚。

在监狱禁闭时间结束以后，需要验证者主动申请释放易重新参与活跃验证者的竞争，这是因为当出现被动作恶可能是由于节点运营出现了问题，修复时间是不可知的，如果主动释放后节点运营没有得到解决会继续被动惩罚，导致因同样的问题遭受多次惩罚。

### 主动作恶

活跃验证者可以通过多种方式进行主动作恶，如恶意偏离共识协议约定并发送多种消息，双签作恶的监狱禁闭时间为永久，由于 validator 的信息不会在链上删除，因此关于该恶意验证者的永久监狱禁闭记录会一直留存在链上，所以该 validator 的地址会永久作废。所以运营方只能通过重新创建新的验证者(使用新的共识秘钥对和地址)才可以重新参与投票权重竞争。在此之前需要等待一个完整的解绑周期才能取回自己在作恶验证者处抵押的链上资产。主动惩罚比例由参数 slash_fraction_double_sign 指定，默认为 5%。

三种主动作恶的情况：
1. 执行 BeginBlocker()时，发现验证者的可用性差，会罚掉一小部分的链上资产，将 validator 的 jailed 字段设置为 true。
2. 执行 BeginBlocker()时，发现验证者的有效双签举证信息，罚掉客观比例的链上资产，将 validator 的 jailed 字段设置为 true。
3. 验证者运营方发起的撤回委托或者重新委托操作导致自抵押链上资产数量不足。

## 网络参数

以下是用于配置验证者惩罚行为的所有网络参数。所有这些参数的详细信息及其对验证者惩罚行为的影响将在本文档后面讨论。

```json
signed_blocks_window：为正常运行时间跟踪计算活跃度的块数；
min_signed_per_window：最后一个帐户允许的错误/错过验证的块的最大百分比；signed_blocks_window在停用之前阻塞；
downtime_jail_duration:监禁时间；
slash_fraction_double_sign：当验证者出现拜占庭错误时被削减的资金百分比;
slash_fraction_downtime：当验证者不活跃时被削减的资金百分比。
```

## 交易和查询

### 交易

> treasurenetd tx slashing unjail - 释放验证器
> 可以先通过 treasurenetd query staking validator [validator-address] --home --output json | jq 查看 validator 的状态

```sh
$ treasurenetd query staking validator \
--from=[name_of_your_key] \
--keyring-backend test
--output json | jq
```

```json
{
  "operator_address": "treasurenetvaloper1wf78qmzhfsjndy3v6wsdxjfqnmwnyy2gzs46zq",
  "consensus_pubkey": ,
  "jailed": true,
  "status": "BOND_STATUS_BONDED",
  "tokens": "268000000000000000000",
  "delegator_shares": "268000000000000000000.000000000000000000",
}
```

如果 validator 中 jailed 的状态为 true，说明该 validator 处于监禁状态，监禁期过后可以进行释放

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
> treasurenetd query slashing params --home --output json | jq - 查询惩罚参数

```json
{
  "signed_blocks_window": "100",
  "min_signed_per_window": "0.500000000000000000",
  "downtime_jail_duration": "600s",
  "slash_fraction_double_sign": "0.050000000000000000",
  "slash_fraction_downtime": "0.010000000000000000"
}
```
