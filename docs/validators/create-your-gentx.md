---
sidebar_position: 7
---

# Treasurenet Genesis Validator Setup

### Download the Treasurenet binary

:::info
If you already have a .treasurenetd folder from a previous run of treasurenetd init delete it before this step.
:::

```shell
mkdir treasurenet-bin
cd treasurenet-bin

# the treasurenet chain binary itself

wget https://https://github.com/treasurenetprotocol/treasurenet/releases/download/v1.0.0/treasurenetd-linux-amd64 # 链接地址暂时不能用有需要最新版本请于我们工作人员联系
mv treasurenetd-linux-amd64 treasurenetd


treasurenetd init <your moniker here>
```

### Download the Treasurenet binary

First we need to import the validator key. This is the key for the address you submitted on the forum.


```shell
# you will be prompted for your key phrase
treasurenetd keys add <my validator key name> --recover
```

### Generate your Delegate keys

There are three keys involved in this proces.

```shell
Validator Funds key: This is the key you submitted for genesis it starts with `treasurenet` and contains your funds

Validator Operator Key: This is a key that will be generated with your gentx, it starts with `treasurenetvaloper` and actually signs your validators blocks

Gravity Orchestrator Cosmos Key: This is a key that will be used on the Cosmos side of Gravity bridge to submit Oracle transactions and Ethereum signatures. This address will be actively used by Gravity bridge to send many hundreds of messages during normal day to day operation of an active bridge. You will be generating this key to register as part of your gentx.

Gravity Orchestrator Ethereum Key: This is an Ethereum key this is the key that represents your validators voting power on Ethereum in the `Gravity.sol` contract. In short this key secures the Gravity Bridge funds on Ethereum. This key will *not* be actively used to submit messages to Ethereum unless you chose to relay in addition to validate. Like the Gravity Orchestrator Cosmos Key you will be generating this key here and registering it as part of your gentx.

```

Together we may refer to the Gravity Orchestrator Cosmos Key and Gravity Orchestrator Ethereum Keys as 'Gravity delegate keys' as they act as a 'delegate' for your Validator Operator key.

If you lose your Gravity delegate keys you will have to unbond and create a new validator because it's not possible to rotate them. So store all output of the following commands in a safe place.

```shell
treasurenetd eth_keys add
treasurenetd keys add <Your Gravity Orchestrator Cosmos Key Name>
```

### Create a GenTX

```shell
wget https://github.com/treasurenetprotocol/docs/blob/feature/1.0.3/genesis.json
mv genesis.json ~/.treasurenetdy/config/genesis.json
treasurenetd gentx --moniker <your moniker> <my validator key name> 128000000000000000000aunit <Gravity Orchestrator Ethereum Address> <Gravity Orchestrator Cosmos Address> --chain-id=treasurenet_5005-1
```

### Submit your gentx

In order to submit your gentx open up a pull request to this repo placing your gentx into the 'gentxs' folder our automated test will check it for validity and after that it will be merged.