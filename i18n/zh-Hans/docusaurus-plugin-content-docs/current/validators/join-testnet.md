---
sidebar_position: 5
---

# 加入测试网

### 选择一个测试网

您可以通过设置创世文件和种子来制定要加入的网络。

| Testnet Chain ID   | Description                  | Site | Version | Status |
| ------------------ | ---------------------------- | ---- | ------- | ------ |
| treasurenet_9000-1 | Treasurenet 1st test network | --   | v0.1.x  | Live   |

:::info
开发正在进行中。 很快将新的测试网验证器节点列入白名单。 请继续关注测试网活动。
:::


### 安装 treasurenetd

跟随[安装说明](https://)来完成 treasurenetd 二进制文件的安装

### 保存 chainID

我们建议将 testnet 链 ID 保存到您的 treasurenetd 的 client.toml 中。 这将使您不必为每个 CLI 命令手动传递链 ID 标志。

```shell
treasurenetd config chain-id treasurenet_9000-1
```

### 初始化节点

我们需要初始化节点以创建所有必要的验证器和节点配置文件：

```shell
treasurenetd init <your_custom_moniker> --chain-id treasurenet_9000-1
```

:::caution
名字对象只能包含 ASCII 字符。 使用 Unicode 字符将使您的节点无法访问。
:::

默认情况下，init 命令会创建您的 `~/.treasurenetd`（即 $HOME）目录，其中包含子文件夹 `config/` 和 `data/`。 在 config 目录中，最重要的配置文件是 app.toml 和 config.toml。

### 创世纪与种子节点

#### 复制创世文件

检查存档中的 [genesis.json 文件](https://),并将其复制到配置目录：`~/.treasurenetd/config/genesis.json`。 这是一个包含链 ID 和创世账户余额的创世文件。

```shell
sudo apt install -y unzip wget
wget -P ~/.treasurenetd/config https://xxx.treasurenet.io/treasurenet_9000-1/genesis.json
```

然后验证 genesis 配置文件的正确性：

```shell
treasurenetd validate-genesis
```

#### 添加种子节点

您的节点需要知道如何找到[peers](https://)。 您需要将健康的[seed nodes](https://) 添加到 `$HOME/.treasurenetd/config/config.toml`。 [testnets](https://) 存储库包含一些种子节点的链接。

将位于` ~/.treasurenetd/config/config.toml` 中的文件和种子编辑为以下内容：

```shell
#######################################################
###           P2P Configuration Options             ###
#######################################################
[p2p]

# ...

# Comma separated list of seed nodes to connect to
seeds = "<node-id>@<ip>:<p2p port>"
```

您可以使用以下代码从 repo 中获取种子并将其添加到您的配置中：

```shell
SEEDS=`curl -sL https://raw.githubusercontent.com/xxx/testnets/main/treasurenet_9000-1/seeds.txt | awk '{print $1}' | paste -s -d, -`
sed -i.bak -e "s/^seeds =.*/seeds = \"$SEEDS\"/" ~/.treasurenetd/config/config.toml
```

#### 添加持久节点

我们可以在 `$HOME/.treasurenetd/config/config.toml` 中设置 [persistent_peers](https://) 字段来指定您的节点将与之保持持久连接的 peer。 您可以从[testnets](https://)repo 上的可用对等点列表中检索它们。

[Treasurenet Discord](https://) 的 #find-peers 频道中还提供了可用的持久性对等点列表。 您可以通过运行以下命令从 PEERS 变量中的 peers.txt 文件中随机获取 10 个条目：

```shell
PEERS=`curl -sL https://raw.githubusercontent.com/xxx/testnets/main/treasurenet_9000-1/peers.txt | sort -R | head -n 10 | awk '{print $1}' | paste -s -d, -`

```

使用 sed 将它们包含到配置中。 您也可以手动添加它们：

```shell
sed -i.bak -e "s/^persistent_peers *=.*/persistent_peers = \"$PEERS\"/" ~/.treasurenetd/config/config.toml
```

### 运行一个测试网络验证节点

```shell
treasurenetd tx staking create-validator \
  --amount=1000000000000aunit \
  --pubkey=$(treasurenetd tendermint show-validator) \
  --moniker="TNWhale" \
  --chain-id=<chain_id> \
  --commission-rate="0.10" \
  --commission-max-rate="0.20" \
  --commission-max-change-rate="0.01" \
  --min-self-delegation="1000000" \
  --gas="auto" \
  --gas-prices="0.025aunit" \
  --from=<key_name>
```

### 启动测试网络

最后一步是启动节点。 一旦来自创世验证者的足够投票权（+2/3）启动并运行，测试网将开始生产区块。

```shell
treasurenetd start
```

### 重置数据

首先，删除过时的文件并重置数据。

```shell
rm $HOME/.treasurenetd/config/addrbook.json $HOME/.treasurenetd/config/genesis.json
treasurenetd tendermint unsafe-reset-all --home $HOME/.treasurenetd
```

您的节点现在处于原始状态，同时保留原始 priv_validator.json 和 config.toml。 如果您之前设置了任何哨兵节点或完整节点，您的节点仍会尝试连接到它们。

### 程序启动

```shell
treasurenetd start
```
