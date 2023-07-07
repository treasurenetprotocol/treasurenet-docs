---
sidebar_position: 3
---

# 质押和质押奖励

### 什么是质押

Treasurenet 区块链网络由独立的计算节点维持在线，这些节点也被称为验证器节点，它们共同安全地记录网络事件。作为回报，网络会以 `$UNIT` 代币的形式奖励这些节点。

为了监控每个节点，节点必须存入或者质押 `$UNIT` 代币，如果有任何节点违反网络规则（例如，记录 RWA 的生产力），这些代币将受到处罚。每个节点都监视着彼此，并维护 Treasurenet 的分布式账本。

为了进一步鼓励去中心化的参与，验证器节点必须接受来自任何代币持有者的存款，或者质押。因此，用户可以参与保护网络并赚取奖励，而无需操作硬件。

### 什么是额外质押奖励

Treasurenet 基于现实世界资产产生引入了额外质押奖励的概念。用户不仅可以将 `$UNIT` 代币质押到验证器节点，还可以竞拍 `$TAT` 代币以获得额外质押奖励的机会。

虽然质押的 `$UNIT` 代币永远不会丢失，但是投入竞拍的 `$TAT` 代币会被销毁。这是解锁最大 `$UNIT` 代币奖励的成本。

### 为什么有额外质押奖励

`$UNIT` 是一种基于资产的货币，其总供应量由现实世界资产产生的 `$TAT` 决定。因此，产生这样的资产应该得到适当的奖励。

适当的奖励是关键。作为一种稳定的货币，仅仅为资产所有者铸造代币是不明智的。通常，资产支持的代币是主要为发行者带来利益的金融证券。

在现有的资产支持代币的情况下，底层资产的数据来自中心化的存储记录。如果所声称的黄金或现金实际上不存在，那么代币的价值就变得一文不值，因为它完全依赖于中心化机构的承诺或保证。这不能成为稳定货币的基础。

此外，在资产支持代币的环境中，它们通常通过智能合约在现有网络上发行。例如，现有的黄金代币是在以太坊区块链上发行的。然而，在像比特币或以太坊这样的现有网络中，参与区块链的奖励（如 BTC 或 ETH）并不直接受到现实世界资产的影响。

网络的原生货币和建立在其上的资产支持代币之间没有内在的联系。因此，现实世界的资产不会对网络奖励产生任何影响。

相反，Treasurenet 首先使用 `$TAT` 来衡量所有资产，然后使用 `$TAT` 来确定应该铸造多少基于资产的货币，即 `$UNIT`。

最后，Treasurenet 使用一种权益证明过程来适当地奖励那些帮助保护网络、向网络贡献了实物资产，或者两者都有的参与者 `$UNIT` 代币。

### 访问仪表板

- 在钱包中(MetaMask)中选择 Treasurenet 主网。

![Staking_MetaMask](/img/docs/metamask.jpg)

- 访问[官网](https://splatform.treasurenet.io/Stake/activeValidators),选择合适的 Active Validator

![Staking_Active_Validator](/img/docs/Staking_Active_Validator.png)

### 委托给验证者

- 选择好合适的 Active Validator 后点击 stake 开始进行委托

![Staking_Stake](/img/docs/Staking_tanchuang.png)

:::note
点击 stake 后弹出弹框会发现详细信息
_ My Staked : 您委托的代币总量(在这个 Active Validator 中)
_ Stake Amount : 需要质押多少代币 \* Wallet Blance : 您自己账户下的代币总量
:::
:::caution
您质押的代币不能超过自己账户下的代币总量，也就是 Stake Amount 要小于 Wallet Balance。
:::

- 委托成功

![Staking_Successful](/img/docs/successful.png)

- 解除委托绑定

![unstake](/img/docs/unstake.png)

:::caution
解除委托绑定后，您在这个 Active Validator 中所分配到的区块奖励将自动给您发送到账户中。(在不解除绑定的情况下，奖励分配都是被动奖励分发，您可以参考 [奖励分发机制](../../protocolDevelopers/modules/distribution.md))
:::

### 质押数据统计

- 查看具体的质押情况，可以查看自己总的 stake 情况和分配的奖励

![Stake_Profile](/img/docs/Stake_Profile.png)

:::note
_ Total Staked : 您所有 Active Validator 委托的代币总量
_ Total Rewards : 您分配到的所有奖励
:::

- 取回自己的区块奖励

在 Treasurenet 中采取了另外一种策略，我们称为被动奖励分发，即区块奖励不会主动转入目标账户，validator 运营方或者委托人想要提取奖励时，需要主动发起提现交易。

![Withdraw_Rewards](/img/docs/Withdraw_Rewards.png)

:::caution
这里需要注意的是，当我们链上某一个 validator 的权重发生改变的时候(重新委托或者撤回委托等操作)，区块奖励会自动的分发下去。
:::

_注意：内容不断更新中_
