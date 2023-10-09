---
sidebar_position: 3
---

# 运行一个节点

## 自动化部署

在根目录执行 init-gravity.sh 来通过自动化脚本运行本地节点

```shell
    init-gravity.sh
```

:::caution
❗️ 自动化脚本将删除所有已安装的预先存在的二进制文件。如果要保留二进制文件和其他配置文件，请使用手动部署。
:::

## 手动部署

### 启动节点

```shell
    treasurenetd start --json-rpc.enable=true --json-rpc.api="eth,web3,net"
```

### 管理私钥

运行一个节点每次使用相同的 Key：替换 treasurenetd keys add $KEY 在 init-gravity.sh 中。

```shell
    echo "your mnemonic here" | treasurenetd keys add $KEY --recover
```

:::caution
treasurenet 现在只支持 24 个单词的助记词。
:::

你可以注册新的 key/助记词：

```shell
    treasurenetd keys add $KEY
```

要将您的 treasurenetd 私钥导出为 Ethereum 私钥（例如和 Metamask 一起使用）

```shell
    treasurenetd keys unsafe-export-eth-key $KEY

```

有关 key 命令的更多信息，可以通过--help 查询

```shell
    treasurenetd keys -h
```

### 清除链上数据

#### 重置区块链数据

您可以重置区块链数据，删除节点存储的地址（address book)，并重置 priv_validator.json 的创世状态。

:::caution
❗️ 如果您运行着一个 validator 节点，通常要十分小心的使用 unsafe-reset-all 命令。

❗️ 确保每个节点都有一个独立的 priv_validator.json 文件。不要尝试拷贝该文件从一个旧的节点到新的节点，使用相同的 priv_validator.json 文件在两个节点上将导致您的节点进行双重签名。
:::

首先， 删除所有过期文件并重置您的数据

```shell
    rm $HOME/.treasurenetd/config/addrbook.json $HOME/.treasurenetd/config/genesis.json
    treasurenetd tendermint unsafe-reset-all --home $HOME/.treasurenetd
```

您的节点现在在原始状态，同时保留原始的 priv_validator.json 和 config.toml.如果您之前设置了任何，您的节点会尝试连接它们。

#### 删除数据

treasurenetd 的二进制工具产生的数据默认存储在`~/.treasurenetd`中，使用如下命令可以删除存在的二进制文件和配置信息

```shell

    rm -rf ～/.treasurenetd

```
