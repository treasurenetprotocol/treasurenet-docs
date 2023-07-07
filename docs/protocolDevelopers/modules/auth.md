---
sidebar_position: 2
---

<<<<<<< HEAD
# Auth 模块

## 介绍

auth 模块负责链上账户管理，支持账户的创建、更新、删除等操作。由于交易结构与账户结构密切相关，auth 模块也定义了标准交易,所以 auth 模块负责制定基本交易和账户类型。

## 燃气费和费用

费用对网络运营者有两个作用。

费用限制了每个全节点存储的状态的增长，并允许对经济价值小的交易进行一般性的审查。费用最适合作为反垃圾邮件机制，其中验证者对网络的使用和用户的身份不感兴趣。

费用由交易提供的气体限制和气体价格确定，其中 `fees = ceil(gasLimit \* gasPrices)`。交易产生的气体成本包括所有状态的读/写、签名验证，以及与交易大小成比例的成本。运营者在启动节点时应设置最低气体价格。他们必须设定他们希望支持的每种代币面额的气体单位成本：

> treasurenetd start ... --minimum-gas-prices=1000000aunit

当将交易添加到 mempool 或进行交易传播时，验证者会检查交易的气体价格，这些价格由提供的费用决定，是否满足验证者的任何最低气体价格。换句话说，交易必须提供至少一个与验证者的最低气体价格匹配的费用。

Tendermint 目前不提供基于费用的 mempool 优先级，基于费用的 mempool 过滤是节点本地的，不是共识的一部分。但是，一旦设置了最低气体价格，节点运营者就可以实施这种机制。

由于代币的市场价值会波动，预期验证者会动态调整他们的最低气体价格，以鼓励网络的使用。

## 账户

Account 接口类型是 auth 模块的数据类型

=======
# Auth

## Introduction

auth 模块负责链上账户管理，支持账户的创建、更新、删除等操作。由于交易结构与账户结构密切相关，auth模块也定义了标准交易,所以auth模块负责制定基本交易和账户类型。

## Gas & Fees

Fees serve two purposes for an operator of the network.

Fees limit the growth of the state stored by every full node and allow for general purpose censorship of transactions of little economic value. Fees are best suited as an anti-spam mechanism where validators are disinterested in the use of the network and identities of users.

Fees are determined by the gas limits and gas prices transactions provide, where fees = ceil(gasLimit * gasPrices). Txs incur gas costs for all state reads/writes, signature verification, as well as costs proportional to the tx size. Operators should set minimum gas prices when starting their nodes. They must set the unit costs of gas in each token denomination they wish to support:

 > treasurenetd start ... --minimum-gas-prices=1000000aunit

When adding transactions to mempool or gossipping transactions, validators check if the transaction's gas prices, which are determined by the provided fees, meet any of the validator's minimum gas prices. In other words, a transaction must provide a fee of at least one denomination that matches a validator's minimum gas price.

Tendermint does not currently provide fee based mempool prioritization, and fee based mempool filtering is local to node and not part of consensus. But with minimum gas prices set, such a mechanism could be implemented by node operators.

Because the market value for tokens will fluctuate, validators are expected to dynamically adjust their minimum gas prices to a level that would encourage the use of the network.

## Accounts

Account接口类型是auth模块的数据类型
>>>>>>> feature/1.0.1
```golang
type AccountI interface {
	proto.Message

	GetAddress() sdk.AccAddress        //获取账户地址
	SetAddress(sdk.AccAddress) error   //设置账户地址

	GetPubKey() cryptotypes.PubKey     //获取账户公钥
	SetPubKey(cryptotypes.PubKey) error//设置账户公钥

	GetAccountNumber() uint64          //获取账户号
	SetAccountNumber(uint64) error     //设置账户号

	GetSequence() uint64               //获取账户序列号
	SetSequence(uint64) error          //设置账户序列号

	// Ensure that account implements stringer
	String() string
}
```
<<<<<<< HEAD

BaseAccount 是基本账户，是最简单最常见的 Account 类型，它包含基本帐户功能所需的所有字段

=======
BaseAccount是基本账户，是最简单最常见的Account类型，它包含基本帐户功能所需的所有字段
>>>>>>> feature/1.0.1
```golang
type BaseAccount struct {
	Address       string     //账户地址
	PubKey        *types.Any //账户公钥
	AccountNumber uint64     //账户号
	Sequence      uint64     //账户序列号
}
```
<<<<<<< HEAD

=======
>>>>>>> feature/1.0.1
## 标准交易

```golang
type StdTx struct {
<<<<<<< HEAD
	Msgs          []sdk.Msg
	Fee           StdFee
	Signatures    []StdSignature
	Memo          string
	TimeoutHeight uint64
=======
	Msgs          []sdk.Msg      
	Fee           StdFee         
	Signatures    []StdSignature 
	Memo          string         
	TimeoutHeight uint64         
>>>>>>> feature/1.0.1
}
// StdFee includes the amount of coins paid in fees and the maximum
// gas to be used by the transaction. The ratio yields an effective "gasprice",
// which must be above some miminum to be accepted into the mempool.
type StdFee struct {
<<<<<<< HEAD
	Amount sdk.Coins
	Gas    uint64
}
```

交易的签名采用的是定义在 secp256k1 椭圆曲线上的 ECDSA，一笔合法的交易要求其中所有的签名都合法，且交易的执行具有原子性:

1. 交易中任何一个消息执行失败，整笔交易就执行失败
2. 交易中又其他消息改变的状态会被重置,Memo 字段可以记录一些交易附加消息和交易的备注

为了防止重放攻击，生成待签名数据时需要包含链 ID chain_id、账户的 sequenceNumber、accountNumber，账户发起一笔交易后，SequenceNumber 会递增

一笔交易的交易费等信息包含在 StdFee 中，其中 Amount 字段表示交易发起者愿意为本次交易支付的手续费，Gas 字段表示本次交易允许消耗的 Gas 上限。Amount/Gas 就得到了这笔交易的 GasPrice,GasPrice 可以看作单位 Gas 的价值，更高的 GasPrice 有助于交易被区块链及时处理。交易费的收取由 auth 模块负责，auth 模块定义了 FeeCollector 模块账户，用来暂时存放交易的交易费。

auth 模块定义了标准交易类型 StdTx,代表的一笔交易可以包含多个消息 sdk.Msg,每个 Msg 对应一个链上操作，所有的消息存储在 Msgs 中，且每个签名都需要有签名授权，签名保存在 Signatures 字段中。

请注意，无论是在 CheckTx 还是 DeliverTx 中，AnteHandler 都会被调用，因为 Tendermint 的提议者目前有能力在他们提出的区块中包含那些无法通过 CheckTx 的交易。

### 装饰器

auth 模块提供了 AnteDecorators，它们按照以下的顺序递归地被链接成一个单一的 AnteHandler：

- SetUpContextDecorator：在 Context 中设置 GasMeter，并使用 defer 语句包装下一个 AnteHandler，以便在 AnteHandler 链中从任何下游的 OutOfGas panic 中恢复，并返回关于提供的 gas 和使用的 gas 的错误信息。

- RejectExtensionOptionsDecorator：拒绝所有可以选择包含在 protobuf 交易中的扩展选项。

- MempoolFeeDecorator：在 CheckTx 过程中，检查 tx fee 是否超过本地 mempool 的 minFee 参数。

- ValidateBasicDecorator：调用 tx.ValidateBasic 并返回任何非空的错误。

- TxTimeoutHeightDecorator：检查交易的超时高度。

- ValidateMemoDecorator：使用应用程序参数验证交易备注，并返回任何非空的错误。

- ConsumeGasTxSizeDecorator：根据应用程序参数，消耗与交易大小成比例的 gas。

- DeductFeeDecorator：从交易的第一个签名者处扣除 FeeAmount。如果启用了 x/feegrant 模块并设置了费用授权人，它将从费用授权人的帐户中扣除费用。

- SetPubKeyDecorator：设置一个交易签名者的公钥，这个签名者的公钥还没有在状态机和当前上下文中保存。

- ValidateSigCountDecorator：根据 app-parameters 验证交易中的签名数量。

- SigGasConsumeDecorator：为每个签名消耗参数定义的 gas 量。这要求在 SetPubKeyDecorator 的过程中，所有签名者的公钥都在上下文中设置。

- SigVerificationDecorator：验证所有签名是否有效。这要求在 SetPubKeyDecorator 的过程中，所有签名者的公钥都在上下文中设置。

- IncrementSequenceDecorator：增加每个签名者的账户序列，以防止重放攻击。

## 交易和查询

### 查询

> treasurenetd query auth accounts --home -o json | jq - Query all the accounts
=======
	Amount sdk.Coins 
	Gas    uint64    
}
```
交易的签名采用的是定义在secp256k1椭圆曲线上的ECDSA，一笔合法的交易要求其中所有的签名都合法，且交易的执行具有原子性:
1. 交易中任何一个消息执行失败，整笔交易就执行失败
2. 交易中又其他消息改变的状态会被重置,Memo字段可以记录一些交易附加消息和交易的备注

为了防止重放攻击，生成待签名数据时需要包含链ID chain_id、账户的sequenceNumber、accountNumber，账户发起一笔交易后，SequenceNumber会递增

一笔交易的交易费等信息包含在StdFee中，其中Amount字段表示交易发起者愿意为本次交易支付的手续费，Gas字段表示本次交易允许消耗的Gas上限。Amount/Gas就得到了这笔交易的GasPrice,GasPrice可以看作单位Gas的价值，更高的GasPrice有助于交易被区块链及时处理。交易费的收取由auth模块负责，auth模块定义了FeeCollector模块账户，用来暂时存放交易的交易费。

auth模块定义了标准交易类型StdTx,代表的一笔交易可以包含多个消息sdk.Msg,每个Msg对应一个链上操作，所有的消息存储在Msgs中，且每个签名都需要有签名授权，签名保存在Signatures字段中。

Note that the AnteHandler is called on both CheckTx and DeliverTx, as Tendermint proposers presently have the ability to include in their proposed block transactions which fail CheckTx.

Decorators
The auth module provides AnteDecorators that are recursively chained together into a single AnteHandler in the following order:

* SetUpContextDecorator: Sets the GasMeter in the Context and wraps the next AnteHandler with a defer clause to recover from any downstream OutOfGas panics in the AnteHandler chain to return an error with information on gas provided and gas used.

* RejectExtensionOptionsDecorator: Rejects all extension options which can optionally be included in protobuf transactions.

* MempoolFeeDecorator: Checks if the tx fee is above local mempool minFee parameter during CheckTx.

* ValidateBasicDecorator: Calls tx.ValidateBasic and returns any non-nil error.

* TxTimeoutHeightDecorator: Check for a tx height timeout.

* ValidateMemoDecorator: Validates tx memo with application parameters and returns any non-nil error.

* ConsumeGasTxSizeDecorator: Consumes gas proportional to the tx size based on application parameters.

* DeductFeeDecorator: Deducts the FeeAmount from first signer of the tx. If the x/feegrant module is enabled and a fee granter is set, it deducts fees from the fee granter account.

* SetPubKeyDecorator: Sets the pubkey from a tx's signers that does not already have its corresponding pubkey saved in the state machine and in the current context.

* ValidateSigCountDecorator: Validates the number of signatures in tx based on app-parameters.

* SigGasConsumeDecorator: Consumes parameter-defined amount of gas for each signature. This requires pubkeys to be set in context for all signers as part of SetPubKeyDecorator.

* SigVerificationDecorator: Verifies all signatures are valid. This requires pubkeys to be set in context for all signers as part of SetPubKeyDecorator.

* IncrementSequenceDecorator: Increments the account sequence for each signer to prevent replay attacks.

## Transactions and Queries

### Queries

   > treasurenetd query auth accounts --home -o json | jq - Query all the accounts
>>>>>>> feature/1.0.1

```json
{
  "accounts": [
    {
      "@type": "/treasurenet.types.v1.EthAccount",
      "base_account": {
        "address": "treasurenet1wf78qmzhfsjndy3v6wsdxjfqnmwnyy2grwxmrg",
        "pub_key": null,
        "account_number": "0",
        "sequence": "13"
      },
      "code_hash": "0xc5d2460186f7233c927e7db2dcc703c0e500b653ca82273b7bfad8045d85a470"
    },
    {
     "......"
    }
  ],
  "pagination": {
    "next_key": "SRG3Xw8wlFpEhR17ZtI1nuICFdM=",
    "total": "0"
  }
}
```

<<<<<<< HEAD
> treasurenetd query auth account [address] --home --output json | jq - Query for account by address
=======
   > treasurenetd query auth account [address] --home --output json | jq - Query for account by address
>>>>>>> feature/1.0.1

```json
{
  "@type": "/treasurenet.types.v1.EthAccount",
  "base_account": {
    "address": "treasurenet1wf78qmzhfsjndy3v6wsdxjfqnmwnyy2grwxmrg",
    "pub_key": {
      "@type": "/treasurenet.crypto.v1.ethsecp256k1.PubKey",
      "key": "AzaTWMVN4SlZq9C+fsI0aQzQuQ+HV5+I1mHW7LwjjWhO"
    },
    "account_number": "0",
    "sequence": "13"
  },
  "code_hash": "0xc5d2460186f7233c927e7db2dcc703c0e500b653ca82273b7bfad8045d85a470"
}
```

<<<<<<< HEAD
> treasurenetd query auth params --home -o json | jq - auth 模块的参数

```json
=======
   > treasurenetd query auth params --home  -o json | jq - auth模块的参数

```json 
>>>>>>> feature/1.0.1
{
  "max_memo_characters": "256",
  "tx_sig_limit": "7",
  "tx_size_cost_per_byte": "10",
  "sig_verify_cost_ed25519": "590",
  "sig_verify_cost_secp256k1": "1000"
}
<<<<<<< HEAD
```
=======
```
>>>>>>> feature/1.0.1
