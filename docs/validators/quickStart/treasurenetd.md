---
sidebar_position: 2
---

# treasurenetd

treasurenetd is an all-in-one command line interface tool that supports wallet management, query and transaction operations.

## Using treasurenetd

Check the version you're running

```shell
    treasurenetd version
```

You can also use the -h or --help command to get help information

```shell
    treasurenetd -h
```

### Configuration and Data Directory

```shell
                                  # ~/.treasurenetd
|-- config
|   |-- app.toml                  # 应用模块的配置文件
|   |-- client.toml   
    |-- genesis.json              # The genesis file
	|-- node_key.json             # Private key to use for node authentication in the p2p protocol. 
	|-- priv_validator_key.json   # Private key to use as a validator in the consensus protocol.      
|   `-- config.toml               # 共识相关的配置文件
|-- data                          # 节点所使用的数据库

```

### Configuration and Data Directory

We can use the treasurenetd config command to view the default client configuration settings.
treasurenetd config

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

The default settings in Treasurenet can be customized based on user preferences, allowing users to preset configurations for future use. This simplifies the process and ensures that the desired settings are already in place when needed.

For example, the chain identifier treasurenet_5005-1 can be changed from a blank name using the following command:
treasurenetd config “chain-id” treasurenet_5005-1 treasurenetd config

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

Other values can be changed the same way

Alternatively, we can make changes to the configuration values directly in one of the places in client.toml. It is located in .treasurenetd/config/client.toml in the path of the folder where we installed treasurenet:

```shell
# This is a TOML config file.
# For more information, see https://github.com/toml-lang/toml

###############################################################################
###                           Client Configuration                            ###
###############################################################################

# The network chain ID
chain-id = "treasurenet_5005-1"
# The keyring's backend, where the keys are stored (os|file|kwallet|pass|test|memory)
keyring-backend = "test"
# CLI output format (text|json)
output = "text"
# <host>:<port> to Tendermint RPC interface for this chain
node = "tcp://localhost:26657"
# Transaction broadcasting mode (sync|async|block)
broadcast-mode = "sync"
```

Make the necessary changes in the client.toml and then save it. For example, if we directly change the chain-id to treasurenet_5005-1, it will change immediately, as shown below.

```shell
{
	"chain-id": "treasurenet_5005-1",
	"keyring-backend": "test",
	"output": "text",
	"node": "tcp://localhost:26657",
	"broadcast-mode": "sync"
}
```

### Options

一些 treasurenetd 常用的 flag 如下：

| Option            | Description                                | Type   | Default Value    |
| ----------------- | ------------------------------------------ | ------ | ---------------- | --------- | ------ | ------ | --------- | ---- |
| --chain-id        | Full Chain ID                              | string | ""               |
| --home            | Directory for configuration and data files | string | ～/.treasurenetd |
| --keyring-backend | keyring's backend                          | {"os"  | "file"           | "kwallet" | "pass" | "test" | "memory"} | "os" |
| --output          | Output Format                              | string | "text"           |

### Command List

Here are Some common treasurenetd commands, you can get the full list with the -h command.

| Command    | Description                                                                     |
| ---------- | :------------------------------------------------------------------------------ |
| keys       | Manage your application's keys                                                  |
| tx         | Transactions subcommands                                                        |
| query      | Querying subcommands                                                            |
| tendermint | Tendermint subcommands                                                          |
| config     | Create or query an application CLI configuration file                           |
| init       | Initialize private validator, p2p, genesis, and application configuration files |
| start      | Run the full node                                                               |
