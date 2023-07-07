---
sidebar_position: 2
---

# Multi Node

## Automated Localnet with Docker

### Build & Start

Build and start a testnet with 4 nodes.

```shell
make localnet-start
```

The ports for each node are found in the following table:

| Node ID | P2P Port | REST/Ethereum JSON-RPC Port | Websocket Port |
| ------- | -------- | --------------------------- | -------------- |
| node0   | 26656    | 8545                        | 8546           |
| node1   | 26659    | 8547                        | 8548           |
| node2   | 26661    | 8549                        | 8550           |
| node3   | 26663    | 8551                        | 8552           |

To update the binaries, you need to rebuild and restart the node

To start the container and create the network using Docker Compose, you can use the following command:

```shell
...
Creating network "treasurenet_localnet" with driver "bridge"
Creating node0 ... done
Creating node2 ... done
Creating node1 ... done
Creating node3 ... done
```

### Stop Localnet

```shell
make localnet-stop
```

### Logging

```shell
# node0:daemon logs
docker exec node0 tail treasurenetd.log
```

### Interact with the Localnet

#### Ethereum JSON-RPC 和 Websocket 接口

To interact with testnet via Websocket or RPC/API, you need to send a request to the appropriate port:

You can try to send a request via curl:

```shell
curl -X POST --data '{"jsonrpc":"2.0","method":"eth_accounts","params":[],"id":1}' -H "Content-Type: application/json" 127.0.0.1:8545
```

### Key and Accounts

To interact with treasurenetd and start querying status or creating transactions, you can use the treasurenetd directory of any given node as your home directory:

```shell
treasurenetd keys list --home ./build/node0/treasurenetd
```
