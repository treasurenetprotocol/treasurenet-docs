---
sidebar_position: 5
---

# Join test-net

This guide requires that you have already submitted and had merged a gentx from [these instructions](https://docs.treasurenet.io/docs/validators/create-your-gentx)

### Choose a test network

You can specify the network you want to join by setting the genesis file and seed nodes.

| Testnet Chain ID   | Description                  | Site | Version | Status |
| ------------------ | ---------------------------- | ---- | ------- | ------ |
| treasurenet_5005-1 | Treasurenet 1st test network | --   | v0.1.x  | Live   |

:::info
Development is in progress. Whitelisting new Testnet Validator nodes soon. Stay tuned for Testnet events.
:::

### Installing treasurenetd

Follow the [installation instructions](https://docs.treasurenet.io/docs/validators/quickStart/installation) to complete the installation of the Treasurenetd binary file.

### Saving the chainID

We recommend saving the testnet chain ID to your treasurenetd's client.toml. This will save you from having to manually pass the chain ID flag for each CLI command.

```shell
treasurenetd config chain-id treasurenet_5005-1
```

### Initialize Node

We need to initialize the node to create all the necessary validators and node profiles:

```shell
treasurenetd init <your_custom_moniker> --chain-id treasurenet_5005-1
```

:::caution
The name object can only contain ASCII characters. Using Unicode characters will make your node inaccessible
:::

By default, the init command creates your `~/.treasurenetd` (i.e. $HOME) directory, which contains the subfolders `config/` and `data/`. In the config directory, the most important configuration files are app.toml and config.toml.

### Genesis & Seeds

#### Copy Genesis File

Check the [genesis.json 文件](https://docs.treasurenet.io/docs/protocolDevelopers/genesis/), file in the archive and copy it to the configuration directory:`~/.treasurenetd/config/genesis.json`. This is the genesis file that contains the chain ID and the balance of the genesis account.

```shell
sudo apt install -y unzip wget
wget -P ~/.treasurenetd/config https://github.com/treasurenetprotocol/docs/blob/feature/1.0.3/genesis.json
```

Then verify the correctness of the genesis configuration file at:

```shell
treasurenetd validate-genesis
```

#### Add Seed Nodes

Your nodes need to know how to find [peers](https://docs.tendermint.com/v0.34/tendermint-core/using-tendermint.html#peers)。 You need to add healthy [seed nodes](https://docs.tendermint.com/v0.34/tendermint-core/using-tendermint.html#peers) to `$HOME/.treasurenetd/config/config.toml`。The [testnets](https://github.com/treasurenetprotocol/docs/blob/feature/1.0.3/peer.txt) repository contains links to some seed nodes.

Edit the file and seed located in ` ~/.treasurenetd/config/config.toml` to the following:

```shell
#######################################################
###           P2P Configuration Options             ###
#######################################################
[p2p]

# ...

# Comma separated list of seed nodes to connect to
seeds = "<node-id>@<ip>:<p2p port>"
```

You can get the seeds from the repo and add them to your configuration using the following code:

```shell
SEEDS=`curl -sL https://raw.githubusercontent.com/xxx/testnets/main/treasurenet_5005-1/seeds.txt | awk '{print $1}' | paste -s -d, -`
sed -i.bak -e "s/^seeds =.*/seeds = \"$SEEDS\"/" ~/.treasurenetd/config/config.toml
```

#### Add Persistent Peers

We can set the persistent_peers field in `$HOME/.treasurenetd/config/config.toml` to specify the peers with which your node will maintain [persistent_peers](https://docs.tendermint.com/v0.34/tendermint-core/using-tendermint.html#Persistent-Peer). You can retrieve them from the list of available peers on [testnets](https://)repo.

A list of available persistent peers is also provided in the #find-peers channel of
[Treasurenet Discord](https://). You can get 10 random entries from the peers.txt file in the PEERS variable by running the following command:

:::info
Treasurenet Discord comming soon.
:::

```shell
PEERS=`curl -sL https://raw.githubusercontent.com/xxx/testnets/main/treasurenet_5005-1/peers.txt | sort -R | head -n 10 | awk '{print $1}' | paste -s -d, -`

```

Use sed to include them in the configuration. You can also add them manually at:

```shell
sed -i.bak -e "s/^persistent_peers *=.*/persistent_peers = \"$PEERS\"/" ~/.treasurenetd/config/config.toml
```

### Run a Testnet Validator

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

### Start testnet

The final step is to start the node. Once enough votes from Genesis validators (+2/3) are up and running, the test network will start producing blocks.

```shell
treasurenetd start
```

### Reset Data

First, delete the obsolete files and reset the data.

```shell
rm $HOME/.treasurenetd/config/addrbook.json $HOME/.treasurenetd/config/genesis.json
treasurenetd tendermint unsafe-reset-all --home $HOME/.treasurenetd
```

Your node is now in its original state, while retaining the original priv_validator.json and config.toml. If you set up any sentinel nodes or full nodes before, your node will still try to connect to them.

### Restart

```shell
treasurenetd start
```
