---
sidebar_position: 2
---

# treasurenetd 快速指引

treasurenetd 是一个 all-in-one 的命令行接口工具，它支持钱包管理、查询和交易操作。

## 使用 treasurenetd

检查您运行的版本

```shell
    treasurenetd version
```

也可以使用-h 或者 --help 命令来获得帮助信息

```shell
    treasurenetd -h
```

### 配置和数据目录

```shell
                      # ~/.treasurenetd
|-- config
|   |-- app.toml      # 应用模块的配置文件
|   |-- client.toml
|   `-- config.toml   # 共识相关的配置文件
|-- data              # 节点所使用的数据库

```

### 客户端配置

我们可以使用 treasurenetd config 命令来查看默认客户端配置设置。

```shell
treasurenetd config

{
	"chain-id": "",
	"keyring-backend": "test",
	"output": "text",
	"node": "tcp://localhost:26657",
	"broadcast-mode": "sync"
}
```

我们可以根据我们的选择对默认设置进行更改，因此它允许用户一次性预先设置配置，以便之后使用相同的配置做好准备

例如，可以使用以下命令将链标识符 treasurenet_5005-1 从空白名称更改为：

```shell
treasurenetd config “chain-id” treasurenet_5005-1 treasurenetd config

{
	"chain-id": "treasurenet_5005-1",
	"keyring-backend": "test",
	"output": "text",
	"node": "tcp://localhost:26657",
	"broadcast-mode": "sync"
}
```

其他值可以用同样的方法改变

或者，我们可以直接在 client.toml 的一个地方对配置值进行更改。它位于.treasurenetd/config/client.toml 我们安装 treasurenet 的文件夹的路径下：

```shell
# This is a TOML config file.
# For more information, see https://github.com/toml-lang/toml

###############################################################################
###                           Client Configuration                            ###
###############################################################################

# The network chain ID
chain-id = "treasurenet_5005-1"
# The keyring's backend, where the keys are stored (test|file|kwallet|pass|test|memory)
keyring-backend = "test"
# CLI output format (text|json)
output = "text"
# <host>:<port> to Tendermint RPC interface for this chain
node = "tcp://localhost:26657"
# Transaction broadcasting mode (sync|async|block)
broadcast-mode = "sync"
```

在 中进行必要的更改后 client.toml，然后保存。例如，如果我们直接将 chain-id 更改为 treasurenet_5005-1，它会立即更改，如下所示。

```shell
{
	"chain-id": "treasurenet_5005-1",
	"keyring-backend": "test",
	"output": "text",
	"node": "tcp://localhost:26657",
	"broadcast-mode": "sync"
}
```

### 配置文件

一些 treasurenetd 常用的 flag 如下：

| Option            | Description              | Type   | Default Value    |
| ----------------- | ------------------------ | ------ | ---------------- | --------- | ------ | ------ | --------- | ---- |
| --chain-id        | Full Chain ID            | string | ""               |
| --home            | 配置文件和数据文件的目录 | string | ～/.treasurenetd |
| --keyring-backend | keyring's backend        | {"os"  | "file"           | "kwallet" | "pass" | "test" | "memory"} | "os" |
| --output          | 输出格式                 | string | "text"           |

### 常用命令

一些常用的 treasurenetd 命令，你可以通过-h 命令获得完整列表。

| Command    | Description                                                                     |
| ---------- | :------------------------------------------------------------------------------ |
| keys       | Manage your application's keys                                                  |
| tx         | Transactions subcommands                                                        |
| query      | Querying subcommands                                                            |
| tendermint | Tendermint subcommands                                                          |
| config     | Create or query an application CLI configuration file                           |
| init       | Initialize private validator, p2p, genesis, and application configuration files |
| start      | Run the full node                                                               |
