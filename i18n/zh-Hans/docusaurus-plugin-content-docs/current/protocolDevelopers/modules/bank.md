---
sidebar_position: 3
---

# Bank 模块

## 介绍

auth 模块定义了账户和交易，而交易中可以包含由多个模块定义的消息，其中基本的转账消息由 bank 模块定义

Bank 模块维护着两个主要对象的状态：

- 按地址记录的账户余额
- 链上代币的总供应量

Bank 模块追踪并提供对应用程序中所有资产总供应量的查询支持。它还支持代币转账功能。具体来说，每当发生代币转账时，总供应量都会被更新。

- Minted，例如 mint 模块创建的 Token。(参见[mint 模块](./mint.md))
- Burned，例如被 slashing 模块惩罚的 Token。(参见[slashing 模块](./slashing.md))

不同模块的处理逻辑都可能导致账户链上资产的变动，为了支持这些处理逻辑的实现，bank 模块将资产的读写权限通过 bank.Keeper 暴露给其他模块。

- ViewKeeper 拥有账户中的资产只读权限

  - GetCoin() 返回账户中的资产总量
  - HasCoin() 检查账户中是否包含足够的资产

- SendKeeper 在 ViewKeeper 的基础上增加了资产转移的相关方法

  - SendCoin() 用于发送者向接收者转账
  - AddCoin(), SubtractCoin() 增减账户中的资产
  - SetCoin() 设置某个地址的资产总量

- Keeper 接口则在 SendKeeper 的基础上提供了资产抵押和取回的方法
  - DelegateCoins() 将账户中用作抵押的链上资产转移到 staking 模块账户
  - UndelegateCoins() 取回抵押的链上资产

基于 Keeper 提供的功能，容易实现 bank 模块对两种转账交易的处理逻辑，需要注意的是虽然模块账户与普通账户没有本质区别，但是模块账户不能作为转账消息中的接受者

## 交易和查询

### 交易

> treasurenetd tx bank send [from_address] [to_address] [amount] --chain-id testid --fees [^fees] --gas auto [^gas] --keyring-backend test --发送资金
> [^fees]: Fees to pay along with transaction.
> [^gas]: gas limit to set per-transaction; set to "auto" to calculate sufficient gas automatically (default 200000).

```sh
   treasurenetd tx bank send treasurenet1wf78qmzhfsjndy3v6wsdxjfqnmwnyy2grwxmrg treasurenet1dfucynntu99huh9n39f85qs5py66wmx4r8mmse 100unit --keyring-backend test --fees 1unit --gas auto

   {"body":{"messages":[{"@type":"/cosmos.bank.v1beta1.MsgSend","from_address":"treasurenet1wf78qmzhfsjndy3v6wsdxjfqnmwnyy2grwxmrg","to_address":"treasurenet1dfucynntu99huh9n39f85qs5py66wmx4r8mmse","amount":[{"denom":"aunit","amount":"100000000000000000000"}]}],"memo":"","timeout_height":"0","extension_options":[],"non_critical_extension_options":[]},"auth_info":{"signer_infos":[],"fee":{"amount":[{"denom":"aunit","amount":"1000000000000000000"}],"gas_limit":"112369","payer":"","granter":""}},"signatures":[]}

   confirm transaction before signing and broadcasting [y/N]: y
```

### 查询

> treasurenetd query bank balances [address] --output json | jq --查询指定账户下的 token

### Queries

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

> treasurenetd query bank total --home /data/mytestnet/.treasurenetd/ --output json | jq --检查 token 的总供应量

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
