---
sidebar_position: 3
---

# Bank

## Introduction

Auth module defines accounts and transactions, where transactions can include messages defined by multiple modules, with basic transfer messages defined by the bank module.

The bank module maintains the state of two primary objects:

- Account balances by address;
- Total supply of tokens of the chain

Bank module tracks and provides query support for the total supply of all assets used in the application. It also supports token transfer functionalities. Specifically, the total supply is updated whenever a token is:

- Minted, for example, Tokens created by the mint module. (See [mint module](./mint.md))
- Burned, for example, Tokens penalized by the slashing module. (See [slashing module](./slashing.md))

The processing logic of different modules may cause changes in the on-chain assets of an account. To support the implementation of these processing logics, the bank module exposes read and write permissions for assets through bank.Keeper to other modules.

- ViewKeeper has read-only access to the assets in an account.

  - GetCoin() returns the total amount of assets in the account.
  - HasCoin() checks if the account contains enough assets.

- SendKeeper adds methods for asset transfer based on ViewKeeper.

  - SendCoin() is used to transfer assets from the sender to the receiver.
  - AddCoin(), SubtractCoin() increase or decrease the assets in the account.
  - SetCoin() sets the total amount of assets for a specific address.

- The Keeper interface provides methods for asset delegation and retrieval based on SendKeeper.
  - DelegateCoins() transfers on-chain assets used for delegation from the account to the staking module account.
  - UndelegateCoins() retrieves the delegated on-chain assets.

Based on the functionalities provided by Keeper, it is easy to implement the processing logic of the two types of transfer transactions in the bank module. It is important to note that while module accounts and regular accounts have no essential differences, module accounts cannot be the recipients in transfer messages.

## Transactions and Queries

### Transactions

> treasurenetd tx bank send [from_address] [to_address] [amount] --chain-id testid --fees [^fees] --gas auto [^gas] --keyring-backend test --send funds
> [^fees]: Fees to pay along with transaction.
> [^gas]: gas limit to set per-transaction; set to "auto" to calculate sufficient gas automatically (default 200000).

```sh
   treasurenetd tx bank send treasurenet1wf78qmzhfsjndy3v6wsdxjfqnmwnyy2grwxmrg treasurenet1dfucynntu99huh9n39f85qs5py66wmx4r8mmse 100unit --keyring-backend test --fees 1unit --gas auto

   {"body":{"messages":[{"@type":"/cosmos.bank.v1beta1.MsgSend","from_address":"treasurenet1wf78qmzhfsjndy3v6wsdxjfqnmwnyy2grwxmrg","to_address":"treasurenet1dfucynntu99huh9n39f85qs5py66wmx4r8mmse","amount":[{"denom":"aunit","amount":"100000000000000000000"}]}],"memo":"","timeout_height":"0","extension_options":[],"non_critical_extension_options":[]},"auth_info":{"signer_infos":[],"fee":{"amount":[{"denom":"aunit","amount":"1000000000000000000"}],"gas_limit":"112369","payer":"","granter":""}},"signatures":[]}

   confirm transaction before signing and broadcasting [y/N]: y
```

### Queries

> treasurenetd query bank balances [address] --output json | jq --query the tokens under the specified account

```json
{
  "balances": [
    {
      "denom": "aunit",
      "amount": "99899539999968499999853000"
    },
    {
      "denom": "footoken",
      "amount": "10000000000"
    },
    {
      "denom": "footoken2",
      "amount": "10000000000"
    },
    {
      "denom": "ibc/nometadatatoken",
      "amount": "10000000000"
    },
    {
      "denom": "stake",
      "amount": "10000000000"
    }
  ],
  "pagination": {
    "next_key": null,
    "total": "0"
  }
}
```

> treasurenetd query bank total --home /data/mytestnet/.treasurenetd/ --output json | jq --check the total supply of tokens

```json
{
  "supply": [
    {
      "denom": "aunit",
      "amount": "200758710000000000000000000"
    },
    {
      "denom": "footoken",
      "amount": "20000000000"
    },
    {
      "denom": "footoken2",
      "amount": "20000000000"
    },
    {
      "denom": "ibc/nometadatatoken",
      "amount": "20000000000"
    },
    {
      "denom": "stake",
      "amount": "20000000000"
    }
  ],
  "pagination": {
    "next_key": null,
    "total": "5"
  }
}
```
