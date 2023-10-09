---
sidebar_position: 1
---

# 单节点测试网络

## 自动化本地网络（脚本）

为了方便起见，您可以通过更改值来自定义本地测试网脚本，例如：

```shell
# customize the name of your key, the chain-id, moniker of the node, keyring backend, and log level
KEY="mykey"
CHAINID="treasurenet_5005-1"
MONIKER="localtestnet"
KEYRING="test"
LOGLEVEL="info"


# Allocate genesis accounts (cosmos formatted addresses)
treasurenetd add-genesis-account $KEY 100000000000000000000000000aunit --keyring-backend $KEYRING

# Sign genesis transaction
treasurenetd gentx $KEY 1000000000000000000000aunit --keyring-backend $KEYRING --chain-id $CHAINID

```

默认配置将生成一个带有链 id treasurenet_5005-1 的单个验证器本地网和一个预定义的帐户（mykey），在创世时分配了一些资金。

您可以使用以下方法启动本地链：

```shell
init-gravity.sh
```

## 手动本地网络

本指南可帮助您创建单个验证器节点，该节点在本地运行网络以进行测试和其他与开发相关的用途。

### 初始化链

在实际运行节点之前，我们需要初始化链，最重要的是它的创世文件。 这是通过 init 子命令完成的：

```shell
$MONIKER=testing
$KEY=mykey
$CHAINID="treasurenet_5005-1"

# The argument $MONIKER is the custom username of your node, it should be human-readable.
treasurenetd init $MONIKER --chain-id=$CHAINID

```

上面的命令创建了你的节点和验证器运行所需的所有配置文件，以及一个默认的 genesis 文件，它定义了网络的初始状态。

默认情况下，所有这些配置文件都在 ~/.treasurenetd 中，但您可以通过传递 --home 标志覆盖此文件夹的位置。

### 创世程序步骤

#### 添加创世账户

在启动链之前，您需要使用[keyring](https://)向至少一个帐户填充状态：

```shell
treasurenetd keys add my_validator
```

创建本地帐户后，继续在您的链的创世文件中授予它一些 aunit token。 这样做还可以确保您的 chain 知道此帐户的存在：

```shell
treasurenetd add-genesis-account my_validator 10000000000aunit
```

现在您的帐户有一些 token，您需要在您的链中添加一个 validator。

对于本指南，您将添加本地节点（通过上面的 init 命令创建）作为链的 validator。 validator 可以在链第一次启动之前通过一个包含在创世文件中的特殊事务来声明，称为 gentx：

```shell
# Create a gentx
# NOTE: this command lets you set the number of coins.
# Make sure this account has some coins with the genesis.app_state.staking.params.bond_denom denom
treasurenetd add-genesis-account my_validator 1000000000stake,10000000000aunit

```

一个 gentx 做三件事：

- 将您创建的 validator account 注册为 validator operator 帐户（即 the account that controls the validator）。
- 自行委托 staking token。
- 将 validator operator account 与将用于签署区块的节点公钥链接。 如果未提供 --pubkey 标志，则默认为通过上述 treasurenetd init 命令创建的本地节点 pubkey。

- 有关 gentx 的更多信息，请使用以下命令：

```shell
treasurenetd gentx --help
```

#### Collecting gentx

默认情况下，genesis file 文件不包含任何 gentxs。 gentx 是一种交易，它将账户下 genesis file 中存在的 staking token 绑定到 validator，本质上是在 genesis 时创建一个 validator。

一旦作为有效 gentx 接收者的超过 2/3 的验证者（由投票权加权）在 genesis_time 之后上线，该链就会启动。

可以手动将 gentx 添加到 genesis 文件中，或通过以下命令：

```shell
# Add the gentx to the genesis file
treasurenetd collect-gentxs
```

此命令会将存储在 ~/.treasurenetd/config/gentx 中的所有 gentx 添加到 genesis 文件中。

### Run Testnet

检查 genesis.json 文件的正确性：

```shell
    treasurenetd validate-genesis
```

现在一切都设置好了，您可以最终启动您的节点。

```shell
    treasurenetd start
```
