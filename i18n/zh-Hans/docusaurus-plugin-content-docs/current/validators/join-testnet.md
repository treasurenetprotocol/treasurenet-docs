---
sidebar_position: 5
---

# 加入测试网

### 选择一个测试网

您可以通过设置创世文件和种子来制定要加入的网络。

| Testnet Chain ID   | Description                  | Site | Version | Status |
| ------------------ | ---------------------------- | ---- | ------- | ------ |
| treasurenet_5005-1 | Treasurenet 1st test network | --   | v0.1.x  | Live   |

:::info
开发正在进行中。 很快将新的测试网验证器节点列入白名单。 请继续关注测试网活动。
:::


### 安装 treasurenetd

第一步：

跟随[安装说明](https://docs.treasurenet.io/zh-Hans/docs/validators/quickStart/installation)来完成 treasurenetd 二进制文件的安装

### 保存 chainID

第二步：

我们建议将 testnet 链 ID 保存到您的 treasurenetd 的 client.toml 中。 这将使您不必为每个 CLI 命令手动传递链 ID 标志。

```shell
treasurenetd config chain-id treasurenet_5005-1
treasurenetd config keyring-backend file --home /root/.treasurenetd
```

:::caution
--home directory for config and data (default "/root/.treasurenetd") 根据自己的情况来自定义文件存储
:::

### 添加加密私钥

第三步：

添加Treasurenet所用到的密钥，如果存在应该将其删除

可选地指定BIP39助记符、用于进一步保护助记符的BIP39口令，以及bip32 HD路径以导出特定帐户。密钥将存储在给定的名称下并用给定的密码进行加密。唯一需要的输入是加密密码

```shell
treasurenetd keys add validatortest --keyring-backend file --algo eth_secp256k1 2>> /validator6-phrases
treasurenetd keys add orchestratortest --keyring-backend file --algo eth_secp256k1 2>> /orchestratortest-phrases
treasurenetd eth_keys add --keyring-backend file >> /validatortest-eth-keys
```

### 初始化节点

我们需要初始化节点以创建所有必要的验证器和节点配置文件：

```shell
treasurenetd init <your_custom_moniker> --chain-id treasurenet_5005-1
```

:::caution
名字对象只能包含 ASCII 字符。 使用 Unicode 字符将使您的节点无法访问。
:::

默认情况下，init 命令会创建您的 `~/.treasurenetd`（即 $HOME）目录，其中包含子文件夹 `config/` 和 `data/`。 在 config 目录中，最重要的配置文件是 app.toml 和 config.toml。

### 创世纪与种子节点

#### 复制创世文件

第四步:

检查存档中的 [genesis.json 文件](https://raw.githubusercontent.com/treasurenetprotocol/treasurenet-docs/feature/1.0.3/genesis/testnet/genesis_treasurenet_5005_231024_export.json),并将其复制到配置目录：`~/.treasurenetd/config/genesis.json`。 这是一个包含链 ID 和创世账户余额的创世文件。

```shell
sudo apt install -y unzip wget
wget -P ~/.treasurenetd/config https://raw.githubusercontent.com/treasurenetprotocol/treasurenet-docs/feature/1.0.3/genesis/testnet/genesis_treasurenet_5005_231024_export.json
```

然后验证 genesis 配置文件的正确性：

```shell
treasurenetd validate-genesis
```

#### 添加种子节点

:::caution
种子节点只是同步节点数据但是不参与pos共识（seeds参数在以后的版本中会取消，如果需要配置种子节点，直接配置persistent_peers后不去创建validator就可以）
:::

您的节点需要知道如何找到[peers](https://github.com/treasurenetprotocol/treasurenet-docs/blob/feature/1.0.3/addrbook/testnet/addrbook.json)。 您需要将健康的[seed nodes](https://github.com/treasurenetprotocol/treasurenet-docs/blob/feature/1.0.3/addrbook/testnet/addrbook.json) 添加到 `$HOME/.treasurenetd/config/config.toml`。 [testnets](https://github.com/treasurenetprotocol/treasurenet-docs/blob/feature/1.0.3/addrbook/testnet/addrbook.json) 存储库包含一些种子节点的链接。

将位于` ~/.treasurenetd/config/config.toml` 中的文件和种子编辑为以下内容：

```shell
#######################################################
###           P2P Configuration Options             ###
#######################################################
[p2p]

# ...

# Comma separated list of seed nodes to connect tos
seeds = "<node-id>@<ip>:<p2p port>"
```

您可以使用以下代码从 repo 中获取种子并将其添加到您的配置中：

```shell
SEEDS=`curl -sL https://raw.githubusercontent.com/treasurenet-docs/blob/feature/1.0.3/testnet/peer.txt | awk '{print $1}' | paste -s -d, -`
sed -i.bak -e "s/^seeds =.*/seeds = \"$SEEDS\"/" ~/.treasurenetd/config/config.toml
```

#### 添加持久节点

第五步：

我们可以在 `$HOME/.treasurenetd/config/config.toml` 中设置 [persistent_peers](https://github.com/treasurenetprotocol/treasurenet-docs/blob/feature/1.0.3/testnet/peer.txt) 字段来指定您的节点将与之保持持久连接的 peer。 您可以从[testnets](https://github.com/treasurenetprotocol/treasurenet-docs/blob/feature/1.0.3/testnet/peer.txt)repo 上的可用对等点列表中检索它们。

```shell
PEERS=`curl -sL https://raw.githubusercontent.com/treasurenet-docs/blob/feature/1.0.3/testnet/peer.txt | sort -R | head -n 10 | awk '{print $1}' | paste -s -d, -`

```

使用 sed 将它们包含到配置中。 您也可以手动添加它们：

```shell
sed -i.bak -e "s/^persistent_peers *=.*/persistent_peers = \"$PEERS\"/" ~/.treasurenetd/config/config.toml
```

### 运行一个测试网络验证节点

第六步：

:::caution
在执行第六步时一定要确保我们持久对等节点的区块高度已经和测试网的区块高度达成一致，也就是数据已经同步完成。
:::

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

### 检查我们节点是否加入测试网

通过query staking 查看我们节点是否成功加入测试网并参与到pos计算

```shell
treasurenetd query staking validators
```
query staking validators会显示参与pos的validator,moniker就是我们节点的名称
```shell
- commission:
    commission_rates:
      max_change_rate: "0.010000000000000000"
      max_rate: "0.200000000000000000"
      rate: "0.100000000000000000"
    update_time: "2023-08-31T10:11:06.703451944Z"
  consensus_pubkey:
    '@type': /cosmos.crypto.ed25519.PubKey
    key: fqgeavY10wSIG/wLp1oqt9qqUcgGBCjZyktZt/oGmY0=
  delegator_shares: "0.074609302188682087"
  description:
    details: ""
    identity: ""
    moniker: nodetest
    security_contact: ""
    website: ""
  jailed: false
  min_self_delegation: "158000000000000000000"
  new_tokens: "0"
  newunit_power: "0"
  operator_address: treasurenetvaloper163uq2xyqggerdrs4fcqj9pppzfk2aauczf2cc9
  status: BOND_STATUS_UNBONDING
  tat_power: "0"
  tat_tokens: "0"
  tokens: "200000000000000000000"
  tokens_shares: "0"
  unbonding_height: "2024541"
  unbonding_time: "2023-11-21T10:14:08.534130824Z"
```


### 重置数据

首先，删除过时的文件并重置数据。

```shell
rm $HOME/.treasurenetd/config/addrbook.json $HOME/.treasurenetd/config/genesis.json
treasurenetd tendermint unsafe-reset-all --home $HOME/.treasurenetd
```

您也可以手动操作
```shell
1.找到我们节点目录默认为 /root/.treasurenetd/data
2.删除多余的文件只保留priv_validator_state.json，通过命令 rm -rf !(*.json)
3.编辑priv_validator_state.json使它保持最新的状态
{
  "height": "0",
  "round": 0,
  "step": 0
}
```

您的节点现在处于原始状态，同时保留原始 priv_validator.json 和 config.toml。 如果您之前设置了任何哨兵节点或完整节点，您的节点仍会尝试连接到它们。

### 程序启动

```shell
treasurenetd start
```
