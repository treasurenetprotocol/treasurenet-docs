---
sidebar_position: 6
---

# 加入主网

:::info
开发正在进行中。 目前仅将主网验证节点列入白名单。
:::

## 开始入门

- 选择合适的硬件和服务器配置。(参见[硬件指南](./overview.md))。
- 确保 Treasurenetd 正确安装。(参见[硬件指南](./quickStart/installation.md))。
- 下载创世文件，并设置持久对等节点或者启动种子节点。

## 硬件配置

| Node Type | RAM | Storage   |
| --------- | --- | --------- |
| validator | 16G | 500GB-2TB |
| 完整节点  | 16G | 2TB       |
| default   | 16G | 1TB       |

## 状态同步

要启用状态同步，请访问一个[浏览器](https://explorer.treasurenet.io/)（在新窗口打开），获取最新的区块高度和对应的哈希值。节点操作员可以在当前绑定期内选择任何高度/哈希，但由于推荐的快照周期是 1000 个区块，建议选择接近当前高度减去 1000 的数值。请在下面的代码片段中设置这些参数：<BLOCK_HEIGHT>和<BLOCK_HASH>。

作为参考，可以在[treasurenet hub chain-registry reporpc_servers](https://github.com/cosmos/chain-registry/blob/master/cosmoshub/chain.json)中找到 peer 的列表 persistent

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

## 快速状态同步

:::caution
❗️ 注意：在外部挂载快速同步数据时，确保在初始化和启动 gaiad 时设置 `--home` 标志。
:::

### 创建目录

`mkdir $HOME/.treasurenetd/config -p`

### 开始 Quicksync 下载

节点操作员可以通过在 Pruned（精简）、Default（默认）和 Archive（存档）之间进行选择，决定他们想要保留多少历史状态。请参阅[Quicksync.io 下载](https://github.com/treasurenetprotocol/addrbook.json)（在新窗口打开）以获取最新的快照大小。

下载最新版本的 treasurenetd 执行程序和 addrbook.json

### 解压缩

```shell
tar -zxvf ./treasurenetd.tar
```

### 复制地址快速同步

```shell
curl https://quicksync.io/addrbook.treasurenetd.json > $HOME/.treasurenetd/config/addrbook.json
```

### 启动 Treasurenetd

```shell
treasurenetd start --x-crisis-skip-assert-invariants
```

`

## 持久对等节点和种子节点

### 初始化链

为节点选择一个自定义的名称并开始初始化。**init**命令会默认在~下创建.treasurenetd 文件，包含 config 和 data,在 config 中最重要的配置文件为 config.toml 和 app.toml

```shell
treasurenetd init <moniker-name>
```

:::caution
Monikers 只能包含 ASCII 字符。不支持使用 Unicode 字符，这会导致节点无法访问。
:::

### genesis.json 文件

节点初始化后，下载创世文件并移动到~/config/genesis.json
:::note
`wget https://raw.githubusercontent.com/treasurenetprotocol/treasurenet-docs/feature/1.0.3/genesis/mainnet/genesis_treasurenet_mainnet_export.json` <br />
`mv genesis_treasurenet_mainnet_export.json genesis.json` <br />
`mv genesis.json ~/.treasurenetd/config/genesis.json`
:::

### 配置对等节点

```shell
treasurenetd keys add <validator> --keyring-backend file --algo info 2>> /data/validator-phrases
treasurenetd keys add <orchestrator> --keyring-backend file --algo info 2>> /data/orchestrator-phrase
treasurenetd eth_keys add --keyring-backend test >> /data/validator-eth-keys
treasurenetd init <Moniler_name> --chain-id treasurenet_5005-1
#修改配置文件设置对等节点
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
启动时，节点将需要连接到对等节点。如果节点运营商有兴趣将特定节点设置为种子或持久对等节点，则可以在中进行配置 <br />
e7bcaa83f89c76ca0337f73d767e35887d306f73 表示我们的 node1 节点的 NodeID,26656 表示节点的 tcp 端口
:::
:::caution
种子节点(seeds)是中继他们知道的其他对等方地址的节点，这些节点不断地在网络上爬行以试图获得更多的对等点，种子节点的作用就是传递每个人的地址，且种子节点是不产于共识仅用来帮助将节点传播到网络中的节点 <br />
注意：如果 seeds 和 persistent_peers 相交，用户将被警告种子可能会自动关闭连接，并且节点可能无法保持连接持
:::

### REST API 配置

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

### 同步运行验证器节点

在 Treasurenet 上同步节点有三种主要方式；block sync、state sync 和 quick sync;
如果需要同步运行验证器，请参考[run a validator](./setup/run-a-validator.md);

| Sync       | Data Integrity           |
| ---------- | ------------------------ |
| State Sync | Minimal Historical Data  |
| Quick Sync | Moderate Historical Data |
| Blocksync  | Full Historical Data     |

如果节点运营商希望运行一个完整的节点，则可以从头开始，但需要花费大量时间才能赶上进度。

### 启动 Treasurenetd

`treasurenetd start --x-crisis-skip-assert-invariants`
