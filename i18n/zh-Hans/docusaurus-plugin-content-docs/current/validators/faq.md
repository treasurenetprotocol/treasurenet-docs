---
sidebar_position: 7
---

# 常见问题

## 简介

### 什么是验证节点？

TreasuerNet [基于 Tendermint](https://docs.tendermint.com/main/introduction/what-is-tendermint.html)它依赖于一组负责在区块链中提交新块的验证器。这些验证者通过广播包含由每个验证者的私钥签名的加密签名的投票来参与共识协议。

验证者候选者可以绑定他们自己的 UNIT 或者 TAT，并让代币持有者将 UNIT “委托”或质押给他们。Treasurenet 目前只允许 100 个 validator 参与共识，但随着时间的推移，可以通过治理提案增加验证器的数量。验证者由委托给他们的 UNIT 代币总数和 TAT 一起决定([参见活跃验证者的选取规则](./faq.md))，投票权最高的前 100 名验证者候选人是当前的活跃验证者参与共识生成新的区块。

验证者及其委托人通过执行 Tendermint 共识协议赚取 Unit 作为区块条款和代币作为交易费用。请注意，验证者可以为其委托人收取的费用设置佣金百分比作为额外奖励。

如果验证者双重签名或长时间离线，他们质押的 UNIT（包括委托给他们的用户的 UNIT）可能会被罚没。处罚取决于违规的严重程度。

### 活跃验证节点的选取规则

:::caution
产品补充 更易懂的版本
:::

1. 每个节点要想成为 Validator 必须自抵押 UNIT，且验证者的自我委托永远不能低于 min-self-delegation(最小自抵押,默认为 158unit)。
2. 第一轮筛选满足 min-self-delegation 的 validator，取权重最高的前 400 个 validator 进行选取。
   - 通过 event 监听 bid 操作，获取质押 TAT 的 validator 为 list-supervalidator。
   - 第一步中没有质押 TAT 的 validator 称为 list-validator。
3. 判断 Active Validator(活跃验证者)的数量:
   - 如果 list-supervalidator + list-validator >= 200,Active Validator 的数量 num = 100。
   - 如果 list-supervalidator + listvalidator < 200,Actibr Validator 的数量 num = (list-supervalidator + listvalidator ) / 2。
4. 第二轮筛选
   - 当 list-supervalidator < 100, 且 listvalidator > 100, All-list-super = list-supervalidator (选取全部的 list-supervalidator 作为参考值), num-validator = 2 \* num - num(All-list-super), 从 list-validator 中选取权重前 num-validator，组成新的 All-list-validator。
   - 当 list-supervalidator >= 100 且 list-validator >= 100, 从 list-supervalidator 中选取前 100 组成新的 All-list-super, 从 list-validator 中选取权重前 100，组成新的 All-list-validator。
   - list-supervalidator < 100 且 list-validator < 100, All-list-super = list-supervalidator, All-list-validator = list-validator。
   - 当 list-supervalidator > 100, 且 listvalidator < 100, All-list-validator = list-validator (选取全部的 list-validator 作为参考值), num-super = 2 \* num - num(All-list-validator), 从 list-supervalidator 中选取权重前 num-super，组成新的 All-list-super。
5. 第三轮筛选，组成新的 Active Validator 进行接下来的 pos 运算
   - 将 All-list-super 和 All-list-validator 组成新的列表 list，然后随机选取其中的 num 作为 Active Validator

### 什么是质押

Treasurenet 是一种公共的权益证明（Proof-of-Stake，PoS）区块链，这意味着验证者的权重取决于抵押作为担保的质押代币（UNIT）的数量。这些质押代币可以由验证者直接质押，也可以由 UNIT 持有人委托给他们。

系统中的任何用户都可以通过发送一笔 create-validator 交易来表明自己成为验证者的意图。从那时起，他们就成为了验证者。
验证者的权重（即总权益或投票权）决定了它是否是一个活跃的验证者，也决定了该节点提出区块的频率以及它将获得多少收益。根据 active Validator 选取规则选出合适的 validator 作为活跃验证者。如果验证者双重签名或经常离线，他们将冒着被抵押的代币（包括用户委托的 UNIT）被协议“罚没”的风险，以惩罚疏忽和不当行为。

### 什么是全节点

完整节点是一个程序，它可以完全验证区块链的交易和区块。它与仅处理区块头和一小部分交易的轻客户端节点有所不同。运行完整节点需要比轻客户端更多的资源，但这是成为验证者所必需的。实际上，运行完整节点仅意味着运行未被篡改且更新的软件版本，具有低网络延迟且没有停机时间。

当然，任何用户都可以并且被鼓励运行完整节点，即使他们并不打算成为验证者。

### 什么是委托人？

不能或不想操作验证节点的人仍然可以作为委托人参与质押过程。事实上，验证者的选择不是基于他们自己委托的股份，而是基于他们的总股份，即他们自己委托的股份和委托给他们的股份的总和。这是一个重要的属性，因为它使委托人可以防止验证者表现出不良行为。如果验证者行为不端，他们的委托人会将他们的 UNIT 移离他们，从而减少他们的股份。最终，通过[Active Validator 的选取规则](./faq.md)，他们将退出验证者集。

**委托人分享他们验证者的收入，但他们也分担风险。** 在收入方面，验证人和委托人的不同之处在于，验证人可以对分配给委托人的收入收取佣金。该佣金事先为委托人所知，并且只能根据预定义的约束进行更改([请参阅 staking](../protocolDevelopers/modules/staking.md))。就风险而言，如果验证者行为不当，委托人的 UNIT 可能会被削减。有关更多信息，请参阅[slashing](../protocolDevelopers/modules/slashing.md)。

要成为委托人，UNIT 持有者需要发送一个“委托交易”，在其中指定他们想要绑定多少个 UNIT 以及与哪个验证者绑定。候选验证者列表将显示在 TreasutreNet 浏览器中。之后，如果委托人想要解绑部分或全部股份，他们需要发送“解绑交易”。从那里开始，委托人将不得不等待 3 周才能取回他们的 UNIT。委托人还可以发送“重新绑定交易”以从一个验证器切换到另一个验证器，而无需经过 3 周的等待期([请参阅重新委托和解除绑定](../protocolDevelopers/modules/staking.md))。

### 验证节点状态

Treasurenetd 中的 Validator 可以有三种状态 Unbonded、Unbonding 和 Bonded。
通过 Msg-CreateValidator 消息创建的新验证者被初始化成 Unbonded 状态，并被设置份额以及投票权重。staking 模块的 EndBlocker()会统计本区块验证者状态的变化

- 新创建的 Validator 的投票权重排名进入前 100 名:状态从 Unbonded 变成 Bonded。
- 新创建的 Validator 的投票权重排名没有进入前 100 名:Unbonded 状态维持不变。
- 投票权重增加且投票权重排名进入前 100 名时的状态切换
  - Unbonded --> Bonded: 初次成为活跃验证者。
  - Unbonding --> Bonded: 再次成为活跃验证者。
  - Bonded 维持不变: 已经是活跃验证者

### 什么是质押（staking）的含义？

锁仓 UNIT 可以被视为对验证活动的安全押金。当验证者或委托人想要取回部分或全部押金时，他们发送一个解锁事务。然后，押金经历两周的解锁期，在此期间，如果在解锁过程开始前验证者有潜在的不当行为，他们有可能被处以惩罚。

验证者以及与之关联的委托人会收到区块奖励、区块收益和手续费奖励。如果验证者有不当行为，其总押金的一定比例会被削减（惩罚的严重程度取决于不当行为的类型）。这意味着将 UNIT 抵押给该验证者的每个用户都会按比例受到惩罚。因此，委托人有动力委托给他们预计能够安全运行的验证者。

### 激励

#### 什么是质押的激励措施？

区块奖励由两部分构成，验证者权益池中每个成员都会获得不同类型的收入:

- Block rewards: 链上资产铸造生成新的区块奖励，为了激励公司投票过程的参与方，将链上资产奖励给公司投票的过程参与方。
- Transaction fees: Treasurenet 链上发生交易所产生的交易费用

最新铸造的链上资产与收集到的交易费用合并在一起，就得到了当前区块奖励，然后根据每个验证在的权重分配给验证者的权益池，然后在每个验证者的权益池中，按照每个委托人的股份比例分配给委托人。

#### 作为验证者运营的激励是什么？

验证人由于佣金而相对于委托人赚取更多的收入。

验证人在治理中也扮演着重要角色。如果委托人未投票，他们将继承来自验证人的投票权。这使得验证人在生态系统中拥有重大责任。

#### 什么是验证节点的佣金？

一个验证者池所收到的收入会在验证者和其委托人之间分配。验证者可以对分配给其委托人的收入部分收取佣金。这个佣金以百分比的形式设定。每个验证者都可以自由设定其初始佣金、每日最大佣金变动率和最大佣金。Treasurenet 强制执行每个验证者所设定的参数。这些参数只能在最初宣布候选人身份时定义，并且在宣布后只能进一步受到限制。

#### 如何分配区块规定？

[参阅 distribution 模块中关于奖励分配的介绍](../protocolDevelopers/modules/distribution.md)
