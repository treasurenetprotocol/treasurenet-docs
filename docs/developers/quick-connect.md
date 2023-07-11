---
sidebar_position: 2
---

# Quick Connect

## Publicly Available Nodes

**🥺 To be collected**

| URL | Description | Status | Maintainer |
| --- | ----------- | ------ | ---------- |
|     |             |        |            |

## Cosmos gRPC

Treasurenet exposes gRPC endpoints for all integrated Cosmos SDK modules. This facilitates interaction with Proof-of-Stake logic and native Cosmos transactions and queries, making it easier for wallets and block explorers to connect.

### Cosmos gRPC-Gateway(HTTP REST)

## Ethereum JSON-RPC

## Ethereum Websocket

```shell
# connect to tendermint websocket at port 8546 as defined above
ws ws://localhost:8546/

# subscribe to new Ethereum-formatted block Headers
> {"id": 1, "method": "eth_subscribe", "params": ["newHeads", {}]}
< {"jsonrpc":"2.0","result":"0x44e010cb2c3161e9c02207ff172166ef","id":1}

```
