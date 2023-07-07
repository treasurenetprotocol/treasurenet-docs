---
sidebar_position: 3
---

# 燃气费和费用

燃气费的概念表示在状态机上执行特定操作所需的计算量。

燃气费源自以太坊上的概念，通过向系统支付少量以太的价值来承担操作所需的计算消耗，以避免 EVM 交易计算量无限制的增长，EVM 的每个操作都会消耗一定的 Gas，通常是原生 Token 的一小部分，用户需要为它们想要进行的操作付费，这些操作仅包含交易类操作，像是转账或者调用、部署合约。

与以太坊完全一样，Treasurenet 使用了 Gas 的概念，这就是 Treasurenet 在执行期间资源使用情况的表现，Treasurenet 上的操作表示为对区块链账本的写入。

在 Treasurenet 中，消息执行期间会计算并向用户收取费用。该费用是根据消息执行中消耗的 Gas 总和进行计算的，费用等于 Gas 乘以 Gas 单价。

## 匹配 EVM 燃气消耗

Treasurenet 是支持以太坊 [Web3](https://web3js.readthedocs.io/en/v1.7.5/) 工具的 EVM 兼容区块链系统。因此，gas 消耗必须和其他 EVM 持平，特别是 以太坊。

EVM 和 Cosmos 状态转换的主要区别在于 EVM 对于每个 OPCODE 使用 gas 表确定费用，而 Cosmos 是通过在 GasConfig 中的设置访问数据库确定每字节的成本来为每个 CRUD 操作收取 Gas 费用。

```golang
// GasConfig defines gas cost for each operation on KVStores
type GasConfig struct {
	HasCost          Gas
	DeleteCost       Gas
	ReadCostFlat     Gas
	ReadCostPerByte  Gas
	WriteCostFlat    Gas
	WriteCostPerByte Gas
	IterNextCostFlat Gas
}
```

为了匹配 EVM 消耗的 gas，SDK 中的 gas 消耗逻辑被忽略，而是通过从消息中定义的 gas limit 中减去状态转换剩余 gas 加上 refund 来计算消耗的 gas。

为了忽略 SDK 的 gas 消耗，我们将交易 GasMeter 计数重置为 0，并手动将其设置为 gasUsed 执行结束时 EVM 模块计算的值。

### AnteHandler

Cosmos SDK [AnteHandler](https://docs.cosmos.network/main/basics/gas-fees.html#antehandler) 在事务执行之前执行基本检查。这些检查通常是签名验证、交易字段验证、交易费用等。

关于 gas 消耗和费用，AnteHandler 检查用户是否有足够的余额来支付交易成本（金额加费用），以及检查消息中定义的 gas 限制是否大于或等于消息的计算固有 gas。

## 燃气费返还

在 EVM 中，可以在执行之前指定 gas。指定的总 gas 在执行开始时（AnteHandler 步骤期间）被消耗，如果在执行后剩余任何 gas，剩余的 gas 将退还给用户。
