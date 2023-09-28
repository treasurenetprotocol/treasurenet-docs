---
sidebar_position: 1
---

# Single Node

## Automated Localnet(script)

For convenience, you can customize the local test net script by changing the value, for example:

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

The default configuration will generate a single authenticator local net with chain id treasurenetd-1 and a predefined account (mykey) with some funds allocated at Genesis.

You can start the local chain using the following method:

```shell
init-gravity.sh
```

## Manual Localnet

This guide helps you create a single vealidator node that runs the network locally for testing and other development-related purposes.

### Initialize the chain

Before actually running the node, we need to initialize the chain, most importantly its genesis file. This is done with the init subcommand:

```shell
$MONIKER=testing
$KEY=mykey
$CHAINID="treasurenet_5005-1"

# The argument $MONIKER is the custom username of your node, it should be human-readable.
treasurenetd init $MONIKER --chain-id=$CHAINID

```

The above command creates all the configuration files needed for your node and validator to run, as well as a default genesis file that defines the initial state of the network.

By default, all these configuration files are in ~/.treasurenetd, but you can override the location of this folder by passing the --home flag.

### Genesis Procedure

#### Adding Genesis Accounts

Before starting the chain, you need to populate the status to at least one account using [keyring](https://)：

```shell
treasurenetd keys add my_validator
```

After creating your local account, go ahead and grant it some a Unit token in your chain's genesis file. Doing so will also ensure that your chain is aware of the existence of this account:

```shell
treasurenetd add-genesis-account my_validator 10000000000aunit
```

Now that your account has some tokens, you need to add a validator to your chain.

For this guide, you will add the local node (created with the init command above) as the validator of the chain. The validator can be declared before the chain is started for the first time by a special transaction included in the genesis file, called gentx:

```shell
# Create a gentx
# NOTE: this command lets you set the number of coins.
# Make sure this account has some coins with the genesis.app_state.staking.params.bond_denom denom
treasurenetd add-genesis-account my_validator 1000000000stake,10000000000aunit

```

A gentx performs three important tasks:

- Registers the validator account you created as a validator operator account. This account is responsible for controlling the validator.
- Delegates staking tokens to the validator account. This ensures that the validator has the necessary stake to participate in the consensus and block validation process.
- Links the validator operator account to the public key of the node that will be used to sign the blocks. If the --pubkey flag is not provided, the default is set to the local node's public key generated during the initialization process using the treasurenetd init command.

- For more information on gentx, use the following command:

```shell
treasurenetd gentx --help
```

#### Collecting gentx

By default, the genesis file does not include any gentxs,these are the transactions that bind staking tokens in the genesis file to a validator, effectively creating the validator during the genesis period.

To start the chain, it requires more than 2/3 of the validators who have valid gentx recipients (weighted by voting power) to come online after the specified genesis time.

You have the option to manually add the gentx to the genesis file, or you can use the following command to automatically add it:

```shell
# Add the gentx to the genesis file
treasurenetd collect-gentxs
```

This command will add all gentx stored in `~/.treasurenetd/config/gentx` to the genesis file.

### Run Testnet

Check the correctness of the genesis.json file:

```shell
    treasurenetd validate-genesis
```

现在一切都设置好了，您可以最终启动您的节点。

```shell
    treasurenetd start
```
