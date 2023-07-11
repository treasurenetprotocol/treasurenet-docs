---
sidebar_position: 1
---

# Transactions

Transactions refer to actions initiated by an account that change the state of a blockchain. To effectively execute state changes, each transaction is broadcasted to the entire network. Any node can broadcast a request to execute a transaction on the blockchain state machine. Once this happens, validators will verify, execute the transaction, and propagate the resulting state changes to the rest of the network.

Computational resources on the network are consumed to process each transaction. Therefore, the concept of "gas" emerged as a reference for the computational cost required by validators to process transactions. Users must pay for this computation, and all transactions incur associated fees. The fees are calculated based on the gas consumed and the gas price required to execute the transaction.

Additionally, transactions need to be signed using the sender's private key. This proves that the transaction can only come from the sender and not from fraudulent sources.

In summary, the lifecycle of a transaction after submitting a signed transaction to the network is as follows:

- The transaction hash is generated through encryption.
- The transaction is broadcasted to the network and added to a transaction pool consisting of all other pending network transactions.
- Validators must select your transaction and include it in a block to validate and deem it "successful."

The transaction hash serves as a unique identifier that can be used to check transaction details, such as whether the intended action was successful.

Transactions can fail for various reasons. For example, insufficient gas or fees may be provided. Additionally, transaction validation may fail. Each transaction has specific conditions that must be met for it to be considered valid. A common validation is that the sender is the signer of the transaction. In this case, if you send a transaction from a different address than the signer's address, the transaction will fail, even if the fees are sufficient.

## Cosmos Transactions

On Cosmos chains, transactions are comprised of metadata held in contexts and sdk.Msgs that trigger state changes within a module through the module's Protobuf Msg service.

When users want to interact with an application and make state changes (e.g. sending coins), they create transactions. Cosmos transactions can have multiple sdk.Msgs. Each of these must be signed using the private key associated with the appropriate account(s), before the transaction is broadcasted to the network.

Cosmos transactions include the following information:

- Msgs: an array of messages (sdk.Msg)
- GasLimit: an option chosen by the user to calculate how much gas they need to pay
- FeeAmount: the maximum fee the user is willing to pay
- TimeoutHeight: the block height at which the transaction is valid
- Signatures: an array of signatures from all signers of the transaction (tx)
- Memo: a comment or note sent along with the transaction

To submit a Cosmos transaction, users must use one of the provided clients.

## Etherenum Transactions

Ethereum transactions refer to actions initiated by EOAs (externally-owned accounts, managed by humans), rather than internal smart contract calls. Ethereum transactions transform the state of the EVM and therefore must be broadcasted to the entire network.

Ethereum transactions also require a fee, known as gas. (EIP-1559) introduced the idea of a base fee, along with a priority fee which serves as an incentive for miners to include specific transactions in blocks.

There are several categories of Ethereum transactions:

- regular transactions: transactions from one account to another
- contract deployment transactions: transactions without a to address, where the contract code is sent in the data field
- execution of a contract: transactions that interact with a deployed smart contract, where the to address is the smart contract address

An Ethereum transaction includes the following information:

- recipient: recipient's address
- signature: sender's signature
- nonce: counter of transaction numbers from the account
- value: the amount of tokens to be transferred
- data: includes arbitrary data, used for deploying smart contracts or invoking smart contract methods
- gasLimit: the maximum amount of gas to be consumed
- maxPriorityFeePerGas: max gas to be included as tip to validators
- maxFeePerGas: the maximum amount of gas to be paid for the transaction

Treasurenet supports the following Ethereum transactions.
