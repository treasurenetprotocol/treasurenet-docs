---
sidebar_position: 6
---

# Join main-net

:::info
Development is in progress. Whitelisted Mainnet Validator nodes only at the moment.
:::

## Getting Started

- Select the appropriate hardware and server configuration. (See [Hardware Guide](./overview.md))。
- Ensure that Treasurenetd is properly installed. (Check [this](./quickStart/installation.md))。
- Download the Genesis file and set up a persistent peer node or start a seed node.

## Hardware Configuration

| Node Type  | RAM | Storage   |
| ---------- | --- | --------- |
| validator  | 16G | 500GB-2TB |
| Full Nodes | 16G | 2TB       |
| default    | 16G | 1TB       |

## State Sync

To enable state synchronization, follow the steps below:

1. Visit an explorer (opens new window) to retrieve the block height and corresponding hash of a recent block. This information will be used for the state sync process.

2. As a node operator, you have the flexibility to choose any block height and hash within the current bonding period. However, it is recommended to select a block height that is close to the current height minus 1000. This aligns with the recommended snapshot period of 1000 blocks.

3. In the provided code snippet, replace `<BLOCK_HEIGHT>` with the chosen block height and `<BLOCK_HASH>` with the corresponding block hash.

To access the list of persistent peers in the [treasurenet hub chain-registry reporpc_servers](https://github.com/cosmos/chain-registry/blob/master/cosmoshub/chain.json) you can refer to the reporpc_servers section.

```shell
# Build treasurenet binary and initialize chain
cd $HOME
git clone https://github.com/treasurenetprotocol/treasurenet.git
cd treasurenet
make install
treasurenetd init [moniker] --chain-id treasurenet_5005-1

#Set minimum gas price & peers
sed -i'' 's/minimum-gas-prices = ""/minimum-gas-prices = "0.0025aunit"/' $HOME/.treasurenetd/config/app.toml
sed -i'' 's/persistent_peers = ""/persistent_peers = '"\"$(curl -s https://github.com/treasurenetprotocol/chain-registry/master/cosmoshub/chain.json | jq -r '[foreach .peers.seeds[] as $item (""; "\($item.id)@\($item.address)")] | join(",")')\""'/' $HOME/.treasurenetd/config/config.toml

# Configure State sync
sed -i'' 's/enable = false/enable = true/' $HOME/.treasurenetd/config/config.toml
sed -i'' 's/trust_height = 0/trust_height = <BLOCK_HEIGHT>/' $HOME/.treasurenetd/config/config.toml
sed -i'' 's/trust_hash = ""/trust_hash = "<BLOCK_HASH>"/' $HOME/.treasurenetd/config/config.toml
sed -i'' 's/rpc_servers = ""/rpc_servers = "https://treasurenet-rpc.polkachu.com:443,https://rpc-treasurenet-ia.cosmosia.notional.ventures:443,https://rpc.treasurenet.network:443"/' $HOME/.treasurenetd/config/config.toml

#Start treasurenetd
treasurenetd start --x-crisis-skip-assert-invariants
```

## Quick Sync

:::caution
❗️ Note: Make sure to set the --home flag when initializing and starting gaiad if mounting quicksync data externally.
:::

### Create Gaia Home & Config

`mkdir $HOME/.treasurenetd/config -p`

### Start Quicksync Download

Node Operators can decide how much of historical state they want to preserve by choosing between Pruned, Default, and Archive. See the [Quicksync.io downloads](https://github.com/treasurenetprotocol/addrbook.json) (opens new window)for up-to-date snapshot sizes.

下载最新版本的 treasurenetd 执行程序和 addrbook.json

### Unzip

```shell
tar -zxvf ./treasurenetd.tar
```

### Copy Address Book Quicksync

```shell
curl https://quicksync.io/addrbook.treasurenetd.json > $HOME/.treasurenetd/config/addrbook.json
```

### Start Treasurenetd

```shell
treasurenetd start --x-crisis-skip-assert-invariants
```

`

## Persistent peer and seed nodes

### Initializing the chain

Choose a custom name for your node and initiate the initialization process. The "**init**" command will generate a .treasurenetd file in the default location of your home directory (~). This file will include the configuration and data, with the most crucial configuration files being config.toml and app.toml found within the "**config**" directory.

```shell
treasurenetd init <moniker-name>
```

:::caution
Monikers can only contain ASCII characters. The use of Unicode characters is not supported and will make the node inaccessible

:::

### genesis.json

After the node is initialized, download the genesis file and move it to ~/config/genesis.json
:::note
`wget https://github.com/treasurenetprotocol/mainnet/master/genesis/genesis.treasurenet.json.gz` <br />
`gzip -d genesis.json.gz` <br />
`mv genesis.json ~/.treasurenetd/config/genesis.json`
:::

### Configuring Peer Nodes

```shell
treasurenetd keys add <validator> --keyring-backend file --algo info 2>> /data/validator-phrases
treasurenetd keys add <orchestrator> --keyring-backend file --algo info 2>> /data/orchestrator-phrase
treasurenetd eth_keys add --keyring-backend test >> /data/validator-eth-keys
treasurenetd init <Moniler_name> --chain-id tets_9000-1
#Modify configuration file settings for peer nodes
~/.treasurenetd/config/config.toml

#######################################################
###           P2P Configuration Options             ###
#######################################################
[p2p]

# Address to listen for incoming connections
laddr = "tcp://0.0.0.0:26656"

# Address to advertise to peers for them to dial
# If empty, will use the same port as the laddr,
# and will introspect on the listener or use UPnP
# to figure out the address. ip and port are required
# example: 159.89.10.97:26656
external_address = ""

# Comma separated list of seed nodes to connect to
seeds = ""

# Comma separated list of nodes to keep persistent connections to
persistent_peers = "e7bcaa83f89c76ca0337f73d767e35887d306f73@<ip/address>:26656,....."
```

:::note
Note that when starting up the node, it is essential to establish a connection with a peer node. If the node operator wishes to designate a specific node as a seed or persistent peer, this can be configured using the appropriate settings. <br />
For example, the NodeID "e7bcaa83f89c76ca0337f73d767e35887d306f73" represents the NodeID of our node1, and "26656" represents the TCP port of the node. These values can be adjusted accordingly in the configuration to establish the desired peer connection

:::
:::caution
Seed nodes (seeds) are nodes that relay the addresses of other peers they know, these nodes are constantly crawling around the network trying to get more peers, the role of seed nodes is to pass on everyone's address, and seed nodes are not produced by consensus only used to help propagate nodes into the network
<br />
Note: If seeds and persistent_peers intersect, the user will be warned that the seeds may automatically close the connection and the node may not be able to maintain the connection.
:::

### REST API

:::caution
Note: This is an optional configuration.
:::
By default, the REST API is disabled. To enable the REST API, edit the `~/.treasurenetd/config/app.toml` file, and set enable to true in the [api](https://google.com) section

```shell
###############################################################################
###                           API Configuration                             ###
###############################################################################
[api]
# Enable defines if the API server should be enabled.
enable = true
# Swagger defines if swagger documentation should automatically be registered.
swagger = false
# Address defines the API server to listen on.
address = "tcp://0.0.0.0:1317"
```

### Run validator nodes synchronously

To synchronize nodes on Treasurenet, there are three main methods available: block sync, state sync, and quick sync. If you need to run a validator node and ensure it is synchronized, please follow the steps outlined in the [run a validator](./setup/run-a-validator.md) documentation.

| Sync       | Data Integrity           |
| ---------- | ------------------------ |
| State Sync | Minimal Historical Data  |
| Quick Sync | Moderate Historical Data |
| Blocksync  | Full Historical Data     |

If a node operator wishes to run a complete node, it can start from scratch, but it will take a lot of time to catch up.

### Start Treasurenetd

`treasurenetd start --x-crisis-skip-assert-invariants`
