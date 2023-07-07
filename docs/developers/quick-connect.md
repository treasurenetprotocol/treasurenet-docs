---
sidebar_position: 2
---

# 快速连接

## 公开的可用节点

**🥺 待汇总**

| URL | Description | Status | Maintainer |
| --- | ----------- | ------ | ---------- |
|     |             |        |            |

## Cosmos gRPC

Treasurenet 为所有集成的 Cosmos SDK 模块公开 gRPC 端点。 这使得钱包和区块浏览器更容易与权益证明逻辑和原生 Cosmos 交易和查询进行交互。

### Cosmos gRPC-Gateway(HTTP REST)

## 以太坊 JSON-RPC

## 以太坊 Websocket

```shell
# connect to tendermint websocket at port 8546 as defined above
ws ws://localhost:8546/

# subscribe to new Ethereum-formatted block Headers
> {"id": 1, "method": "eth_subscribe", "params": ["newHeads", {}]}
< {"jsonrpc":"2.0","result":"0x44e010cb2c3161e9c02207ff172166ef","id":1}

```
