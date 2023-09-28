---
sidebar_position: 4
---

# Init

## Introduce

- Define the parameters to be used when starting the treasurenet chain.

  - BIN=treasurenetd :your gaiad binary name
  - ALLOCATION="10000000000000000000000000000000000aunit,10000000000stake,10000000000footoken,10000000000footoken2,10000000000ibc/ nometadatatoken" : Define the tokens to be used
  - KEY1="validator" : Create a secret key to save your account
  - KEY2="orchestrator" : Create the secret key of the orchestrator to protect the relay account
  - CHAINID="treasurenet_5005-1" : Treasurenet Chain ID

  ```shell
  #!/bin/bash
  set -eux
  # your gaiad binary name
  BIN=treasurenetd
  ALLOCATION="100000000000000000000000000aunit,10000000000stake,10000000000footoken,10000000000footoken2,10000000000ibc/nometadatatoken"
  KEY1="validator"
  KEY2="orchestrator"
  CHAINID="treasurenet_5005-1"
  MONIKER="localtestnet"
  KEYRING="test"
  KEYALGO="eth_secp256k1"
  LOGLEVEL="info"
  TRACE="--trace"
  GAIA_HOME="--home /root/.treasurenetd"
  ARGS="$GAIA_HOME --keyring-backend test"
  ```

- validate dependencies are installed
  - `command -v jq > /dev/null 2>&1 || { echo >&2 "jq not installed. More info: https://stedolan.github.io/jq/download/"; exit 1; }`
- remove existing daemon and client
  - `rm -rf ~/.treasurenet*`
- make install

```shell
command -v jq > /dev/null 2>&1 || { echo >&2 "jq not installed. More info: https://stedolan.github.io/jq/download/"; exit 1; }
rm -rf ~/.treasurenet*
make install
```

- Execute treasurenetd

  - Create or query application CLI configuration files

    1. `$BIN config keyring-backend $KEYRING`
    2. `$BIN config chain-id $CHAINID`

  - Generate a validator key, orchestrator key, and eth key for each validator

    1. `$BIN keys add $KEY1 --keyring-backend $KEYRING --algo $KEYALGO 2>> /data/validator-phrases` :Add a secret key to protect your account

    2. `$BIN keys add $KEY2 --keyring-backend $KEYRING --algo $KEYALGO 2>> /data/orchestrator-phrases` : Add a secret key to protect the account on the repeater

    3. `$BIN eth_keys add --keyring-backend $KEYRING >> /data/validator-eth-keys` : Add a secret key to protect your ethereum account

  - Set moniker and chain-id for Treasurenet (Moniker can be anything, chain-id must be an integer)
    - `$BIN init $MONIKER --chain-id $CHAINID` : itializing NODE will produce a .treasurenetd file in the $HOME directory, which contains the files needed for the chain, such as: config.toml, genesis.json, data... etc.

  ```shell
  $BIN config keyring-backend $KEYRING
  $BIN config chain-id $CHAINID
  GAIA_HOME="--home /root/.treasurenetd"
  ARGS="$GAIA_HOME --keyring-backend test"
  $BIN keys add $KEY1 --keyring-backend $KEYRING --algo $KEYALGO 2>> /data/validator-phrases
  $BIN keys add $KEY2 --keyring-backend $KEYRING --algo $KEYALGO 2>> /data/orchestrator-phrases
  $BIN eth_keys add --keyring-backend $KEYRING >> /data/validator-eth-keys

  $BIN init $MONIKER --chain-id $CHAINID
  ```

- Change parameter token denominations to aunit
  ```shell
  cat $HOME/.treasurenetd/config/genesis.json | jq '.app_state["staking"]["params"]["bond_denom"]="aunit"' > $HOME/.treasurenetd/config/tmp_genesis.json && mv $HOME/.treasurenetd/config/tmp_genesis.json $HOME/.treasurenetd/config/genesis.json
  cat $HOME/.treasurenetd/config/genesis.json | jq '.app_state["crisis"]["constant_fee"]["denom"]="aunit"' > $HOME/.treasurenetd/config/tmp_genesis.json && mv $HOME/.treasurenetd/config/tmp_genesis.json $HOME/.treasurenetd/config/genesis.json
  cat $HOME/.treasurenetd/config/genesis.json | jq '.app_state["gov"]["deposit_params"]["min_deposit"][0]["denom"]="aunit"' > $HOME/.treasurenetd/config/tmp_genesis.json && mv $HOME/.treasurenetd/config/tmp_genesis.json $HOME/.treasurenetd/config/genesis.json
  cat $HOME/.treasurenetd/config/genesis.json | jq '.app_state["mint"]["params"]["mint_denom"]="aunit"' > $HOME/.treasurenetd/config/tmp_genesis.json && mv $HOME/.treasurenetd/config/tmp_genesis.json $HOME/.treasurenetd/config/genesis.json
  ```
- Increase block time (?)

  ```shell
  cat $HOME/.treasurenetd/config/genesis.json | jq '.consensus_params["block"]["time_iota_ms"]="1000"' > $HOME/.treasurenetd/config/tmp_genesis.json && mv $HOME/.treasurenetd/config/tmp_genesis.json $HOME/.treasurenetd/config/genesis.json
  ```

- Set gas limit in genesis

  ```shell
  cat $HOME/.treasurenetd/config/genesis.json | jq '.consensus_params["block"]["max_gas"]="10000000"' > $HOME/.treasurenetd/config/tmp_genesis.json && mv $HOME/.treasurenetd/config/tmp_genesis.json $HOME/.treasurenetd/config/genesis.json
  ```

- disable produce empty block

  ```shell
  if [[ "$OSTYPE" == "darwin"* ]]; then
    sed -i '' 's/create_empty_blocks = true/create_empty_blocks = false/g' $HOME/.treasurenetd/config/config.toml
  else
    sed -i 's/create_empty_blocks = true/create_empty_blocks = false/g' $HOME/.treasurenetd/config/config.toml
  fi
  ```

- add in denom metadata for both native tokens

  ```shell
  jq '.app_state.bank.denom_metadata += [{"name": "Foo Token", "symbol": "FOO", "base": "footoken", display: "mfootoken", "description": "A non-staking test token", "denom_units": [{"denom": "footoken", "exponent": 0}, {"denom": "mfootoken", "exponent": 6}]},{"name": "Stake Token", "symbol": "STEAK", "base": "aunit", display: "unit", "description": "A staking test token", "denom_units": [{"denom": "aunit", "exponent": 0}, {"denom": "unit", "exponent": 18}]}]' /root/.treasurenetd/config/genesis.json > /treasurenet-footoken2-genesis.json
  jq '.app_state.bank.denom_metadata += [{"name": "Foo Token2", "symbol": "F20", "base": "footoken2", display: "mfootoken2", "description": "A second non-staking test token", "denom_units": [{"denom": "footoken2", "exponent": 0}, {"denom": "mfootoken2", "exponent": 6}]}]' /treasurenet-footoken2-genesis.json > /treasurenet-bech32ibc-genesis.json
  ```

- Set the chain's native bech32 prefix
  ```shell
  jq '.app_state.bech32ibc.nativeHRP = "treasurenet"' /treasurenet-bech32ibc-genesis.json > /gov-genesis.json
  mv /gov-genesis.json /root/.treasurenetd/config/genesis.json
  ```
- Allocate genesis accounts (treasurenet formatted addresses)

  - `VALIDATOR_KEY=$($BIN keys show validator -a $ARGS)`
  - `ORCHESTRATOR_KEY=$($BIN keys show orchestrator -a $ARGS)`
  - `$BIN add-genesis-account $ARGS $VALIDATOR_KEY $ALLOCATION`
  - `$BIN add-genesis-account $ARGS $ORCHESTRATOR_KEY $ALLOCATION`

  ```shell
  VALIDATOR_KEY=$($BIN keys show validator -a $ARGS)
  ORCHESTRATOR_KEY=$($BIN keys show orchestrator -a $ARGS)
  $BIN add-genesis-account $ARGS $VALIDATOR_KEY $ALLOCATION
  $BIN add-genesis-account $ARGS $ORCHESTRATOR_KEY $ALLOCATION
  ```

- Sign genesis transaction

  - `ORCHESTRATOR_KEY=$($BIN keys show orchestrator -a $ARGS)`
  - `ETHEREUM_KEY=$(grep address /validator-eth-keys | sed -n "1"p | sed 's/.*://')`
    -An gentx is created to perform the following tasks: 1) register the account that has been created as a validator for the operator's account of the validator; 2) self-delegate the token that provides the unit staked; 3) link the operator's account to the public key of the Treasurenet node that will be used to sign the block.

  * `$BIN gentx $ARGS --moniker $MONIKER --chain-id=$CHAIN_ID validator 258000000000000000000aunit $ETHEREUM_KEY $ORCHESTRATOR_KEY`

- Collect genesis tx

  - `$BIN collect-gentxs` : Add gentx to the genesis file

- Run this to ensure everything worked and that the genesis file is setup correctly
  - `$BIN validate-genesis`
- Start the node (remove the --pruning=nothing flag if historical queries are not needed)
  - `$BIN start --pruning=nothing --log_level $LOGLEVEL --json-rpc.api eth,txpool,personal,net,debug,web3,miner --trace --json-rpc.address 0.0.0.0:8555`

```shell
ORCHESTRATOR_KEY=$($BIN keys show orchestrator -a $ARGS)
ETHEREUM_KEY=$(grep address /validator-eth-keys | sed -n "1"p | sed 's/.*://')
$BIN gentx $ARGS --moniker $MONIKER --chain-id=$CHAIN_ID validator 258000000000000000000aunit $ETHEREUM_KEY $ORCHESTRATOR_KEY
$BIN collect-gentxs
$BIN start --pruning=nothing --log_level $LOGLEVEL --json-rpc.api eth,txpool,personal,net,debug,web3,miner --trace --json-rpc.address 0.0.0.0:8555
```
