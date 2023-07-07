---
sidebar_position: 2
---

# Auth

## Introduction

The auth module is responsible for on-chain account management, supporting operations such as account creation, updating, and deletion. Since the transaction structure is closely related to the account structure, the auth module also defines standard transactions. Therefore, the auth module is responsible for establishing basic transaction and account types.

## Gas & Fees

Fees serve two purposes for an operator of the network.

Fees limit the growth of the state stored by every full node and allow for general purpose censorship of transactions of little economic value. Fees are best suited as an anti-spam mechanism where validators are disinterested in the use of the network and identities of users.

Fees are determined by the gas limits and gas prices transactions provide, where fees = ceil(gasLimit \* gasPrices). Txs incur gas costs for all state reads/writes, signature verification, as well as costs proportional to the tx size. Operators should set minimum gas prices when starting their nodes. They must set the unit costs of gas in each token denomination they wish to support:

> treasurenetd start ... --minimum-gas-prices=1000000aunit

When adding transactions to mempool or gossipping transactions, validators check if the transaction's gas prices, which are determined by the provided fees, meet any of the validator's minimum gas prices. In other words, a transaction must provide a fee of at least one denomination that matches a validator's minimum gas price.

Tendermint does not currently provide fee based mempool prioritization, and fee based mempool filtering is local to node and not part of consensus. But with minimum gas prices set, such a mechanism could be implemented by node operators.

Because the market value for tokens will fluctuate, validators are expected to dynamically adjust their minimum gas prices to a level that would encourage the use of the network.

## Accounts

The Account interface type is a data type of the auth module.

```golang
type AccountI interface {
	proto.Message

	GetAddress() sdk.AccAddress        // Get account address 获取账户地址
	SetAddress(sdk.AccAddress) error   // Set account address 设置账户地址

	GetPubKey() cryptotypes.PubKey     // Get account public key 获取账户公钥
	SetPubKey(cryptotypes.PubKey) error// Set account public key 设置账户公钥

	GetAccountNumber() uint64          // Get account number 获取账户号
	SetAccountNumber(uint64) error     // Set account number 设置账户号

	GetSequence() uint64               // Get account sequence 获取账户序列号
	SetSequence(uint64) error          // Set account sequence 设置账户序列号

	// Ensure that account implements stringer
	String() string
}

```

BaseAccount is a basic account and the simplest and most common Account type. It includes all the fields required for basic account functionality.

```golang
type BaseAccount struct {
	Address       string     // Account address
	PubKey        *types.Any // Account public key
	AccountNumber uint64     // Account number
	Sequence      uint64     // Account sequence number
}

```

##Standard Transaction

```golang
type StdTx struct {
	Msgs          []sdk.Msg
	Fee           StdFee
	Signatures    []StdSignature
	Memo          string
	TimeoutHeight uint64
}
// StdFee includes the amount of coins paid in fees and the maximum
// gas to be used by the transaction. The ratio yields an effective "gasprice",
// which must be above some miminum to be accepted into the mempool.
type StdFee struct {
	Amount sdk.Coins
	Gas    uint64
}
```

The signatures of the transaction are based on ECDSA defined on the secp256k1 elliptic curve. A valid transaction requires all signatures to be valid, and the execution of the transaction is atomic:

1. If any message in the transaction fails to execute, the entire transaction fails.
2. If the state is altered by other messages in the transaction, it will be reset. The Memo field can be used to record additional messages and remarks for the transaction.

To prevent replay attacks, the data to be signed must include the Chain ID (chain_id), the sequenceNumber of the account, and the accountNumber. After an account initiates a transaction, the sequenceNumber of the account will increase.

The transaction fee and other information are included in StdFee. The Amount field represents the fee that the initiator of the transaction is willing to pay, and the Gas field represents the upper limit of gas consumption for the transaction. The Amount/Gas gives the GasPrice of the transaction. GasPrice can be considered as the value of one unit of gas, and a higher GasPrice helps the transaction to be processed promptly by the blockchain. The collection of transaction fees is handled by the auth module, which defines the FeeCollector module account to temporarily hold the transaction fees.

The auth module defines the standard transaction type, StdTx, which can contain multiple messages (sdk.Msg) representing on-chain operations. All messages are stored in Msgs, and each signature requires authorization, which is stored in the Signatures field.

Note that the AnteHandler is called on both CheckTx and DeliverTx, as Tendermint proposers presently have the ability to include in their proposed block transactions which fail CheckTx.

Decorators
The auth module provides AnteDecorators that are recursively chained together into a single AnteHandler in the following order:

- SetUpContextDecorator: Sets the GasMeter in the Context and wraps the next AnteHandler with a defer clause to recover from any downstream OutOfGas panics in the AnteHandler chain to return an error with information on gas provided and gas used.

- RejectExtensionOptionsDecorator: Rejects all extension options which can optionally be included in protobuf transactions.

- MempoolFeeDecorator: Checks if the tx fee is above local mempool minFee parameter during CheckTx.

- ValidateBasicDecorator: Calls tx.ValidateBasic and returns any non-nil error.

- TxTimeoutHeightDecorator: Check for a tx height timeout.

- ValidateMemoDecorator: Validates tx memo with application parameters and returns any non-nil error.

- ConsumeGasTxSizeDecorator: Consumes gas proportional to the tx size based on application parameters.

- DeductFeeDecorator: Deducts the FeeAmount from first signer of the tx. If the x/feegrant module is enabled and a fee granter is set, it deducts fees from the fee granter account.

- SetPubKeyDecorator: Sets the pubkey from a tx's signers that does not already have its corresponding pubkey saved in the state machine and in the current context.

- ValidateSigCountDecorator: Validates the number of signatures in tx based on app-parameters.

- SigGasConsumeDecorator: Consumes parameter-defined amount of gas for each signature. This requires pubkeys to be set in context for all signers as part of SetPubKeyDecorator.

- SigVerificationDecorator: Verifies all signatures are valid. This requires pubkeys to be set in context for all signers as part of SetPubKeyDecorator.

- IncrementSequenceDecorator: Increments the account sequence for each signer to prevent replay attacks.

## Transactions and Queries

### Queries

> treasurenetd query auth accounts --home -o json | jq - Query all the accounts

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

> treasurenetd query auth account [address] --home --output json | jq - Query for account by address

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

> treasurenetd query auth params --home -o json | jq - auth 模块的参数

```json
{
  "max_memo_characters": "256",
  "tx_sig_limit": "7",
  "tx_size_cost_per_byte": "10",
  "sig_verify_cost_ed25519": "590",
  "sig_verify_cost_secp256k1": "1000"
}
```
