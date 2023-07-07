---
sidebar_position: 2
---

# 客户端

Treasurenet 支持使用 Cosmos 和 Ethereum 客户端来发送交易和进行查询。

:::caution
待核对
:::

|                        | 描述                                                     | 默认端口 |
| ---------------------- | -------------------------------------------------------- | -------- |
| Cosmos gRPC            | 使用 gRPC 查询或发送交易                                 | 9090     |
| Cosmos REST(gRPC-网关) | 使用 HTTP RESTful API 查询或发送交易                     | 9091     |
| 以太坊 JSON-RPC        | 使用 JSON-RPC 查询以太坊格式的交易和区块或发送以太坊交易 | 8545     |
| 以太坊 Websocket       | 订阅在智能合约中发出的以太坊日志和事件                   | 8546     |
| 命令行界面             | 使用你的控制台查询或发送 Treasurenet 交易                | 无       |

## Cosmos gRPC

Treasurenet 公开了所有集成的 Cosmos SDK 模块的 gRPC 端点。这使钱包和区块链浏览器更易于与权益证明逻辑以及原生的 Cosmos 交易和查询进行交互。

## Cosmos gRPC-Gateway (HTTP REST)

gRPC-Gateway 读取 gRPC 服务定义并生成一个反向代理服务器，该服务器将 RESTful JSON API 转换为 gRPC。有了 gRPC-Gateway，用户可以使用 REST 来与 Cosmos gRPC 服务进行交互。
请在此处查看 Treasurenet 测试网的支持的 gRPC-Gateway API 端点列表。

## 以太坊 JSON-RPC

Treasurenet 支持大多数标准的[JSON-RPC APIs](https://)以连接现有的兼容以太坊的 web3 工具。

## 以太坊 Websocket

Then, start a websocket subscription with ws

```shell
ws ws://localhost:8546/

# subscribe to new Ethereum-formatted block Headers
> {"id": 1, "method": "eth_subscribe", "params": ["newHeads", {}]}
< {"jsonrpc":"2.0","result":"0x44e010cb2c3161e9c02207ff172166ef","id":1}
```

## 命令行接口（CLI）

用户可以使用 treasurenetd 二进制文件直接通过 CLI 与 Treasurenet 节点进行交互。

- **Transactions**: `treasurenetd tx`

可用命令的列表

```shell
Available Commands:
  authz               Authorization transactions subcommands
  bank                Bank transaction subcommands
  broadcast           Broadcast transactions generated offline
  crisis              Crisis transactions subcommands
  decode              Decode a binary encoded transaction string
  distribution        Distribution transactions subcommands
  encode              Encode transactions generated offline
  evidence            Evidence transaction subcommands
  feegrant            Feegrant transactions subcommands
  gov                 Governance transactions subcommands
  ibc                 IBC transaction subcommands
  ibc-transfer        IBC fungible token transfer transaction subcommands
  multisign           Generate multisig signatures for transactions generated offline
  multisign-batch     Assemble multisig transactions in batch from batch signatures
  sign                Sign a transaction generated offline
  sign-batch          Sign transaction batch files
  slashing            Slashing transaction subcommands
  staking             Staking transaction subcommands
  validate-signatures validate transactions signatures
  vesting             Vesting transaction subcommands
```

- **Queries**: `treasurenetd query`

可用命令的列表

```shell
Available Commands:
  account                  Query for account by address
  auth                     Querying commands for the auth module
  authz                    Querying commands for the authz module
  bank                     Querying commands for the bank module
  block                    Get verified data for a the block at given height
  distribution             Querying commands for the distribution module
  evidence                 Query for evidence by hash or for all (paginated) submitted evidence
  evm                      Querying commands for the evm module
  feegrant                 Querying commands for the feegrant module
  gov                      Querying commands for the governance module
  ibc                      Querying commands for the IBC module
  ibc-transfer             IBC fungible token transfer query subcommands
  mint                     Querying commands for the minting module
  params                   Querying commands for the params module
  slashing                 Querying commands for the slashing module
  staking                  Querying commands for the staking module
  tendermint-validator-set Get the full tendermint validator set at given height
  tx                       Query for a transaction by hash, addr++seq combination or signature in a committed block
  txs                      Query for paginated transactions that match a set of events
  upgrade                  Querying commands for the upgrade module
```
