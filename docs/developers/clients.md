---
sidebar_position: 2
---

# Clients

Treasurenet supports both Cosmos and Ethereum clients for sending transactions and performing queries.

:::caution
To be verified
:::

|                          | Description                                                                          | Default Port |
| ------------------------ | ------------------------------------------------------------------------------------ | ------------ |
| Cosmos gRPC              | Query or send transactions using gRPC                                                | 9090         |
| Cosmos REST(gRPC-Gateway | Query or send transactions using an HTTP RESTful API                                 | 9091         |
| Ethereum JSON-RPC        | Query Ethereum-formatted transactions and blocks or send Ethereum txs using JSON-RPC | 8545         |
| Ethereum Websocket       | Subscribe to Ethereum logs and event emitted in smart contracts                      | 8546         |
| Command Line Interface   | Query or send Treasurenet transactions useing your console                           | N/A          |

## Cosmos gRPC

Treasurenet exposes gRPC endpoints for all the integrated Cosmos SDK modules.
This makes it easier for wallets and block explorers to interact with the Proof-of-Stake logic and native Cosmos transactions and queries.

## Cosmos gRPC-Gateway (HTTP REST)

gRPC-Gateway reads a gRPC service definition and generates a reverse-proxy server which translates RESTful JSON API into gRPC. With gRPC-Gateway, users can use REST to interact with the Cosmos gRPC service.
See the list of supported gRPC-Gateway API endpoints for the Treasurenet testnet here

## Ethereum JSON-RPC

Treasurenet supports most of the standard [JSON-RPC APIs](https://) to connect with existing Ethereum-compatible web3 tooling.

## Ethereum Websocket

Then, start a websocket subscription with ws

```shell
ws ws://localhost:8546/

# subscribe to new Ethereum-formatted block Headers
> {"id": 1, "method": "eth_subscribe", "params": ["newHeads", {}]}
< {"jsonrpc":"2.0","result":"0x44e010cb2c3161e9c02207ff172166ef","id":1}
```

## Command Line Interface(CLI)

Users can use the treasurenetd binary to interact directly with an Treasurenet node though the CLI.

- **Transactions**: treasurenetd tx

The list of available commands

```shell
Available Commands:
  authz               Authorization transactions subcommands
  bank                Bank transaction subcommands
  broadcast           Broadcast transactions generated offline
  crisis              Crisis transactions subcommands
  decode              Decode a binary encoded transaction string
  distribution        Distribution transactions subcommands
  encode              Encode transactions generated offline
  evidence            Evidence transaction subcommands
  feegrant            Feegrant transactions subcommands
  gov                 Governance transactions subcommands
  ibc                 IBC transaction subcommands
  ibc-transfer        IBC fungible token transfer transaction subcommands
  multisign           Generate multisig signatures for transactions generated offline
  multisign-batch     Assemble multisig transactions in batch from batch signatures
  sign                Sign a transaction generated offline
  sign-batch          Sign transaction batch files
  slashing            Slashing transaction subcommands
  staking             Staking transaction subcommands
  validate-signatures validate transactions signatures
  vesting             Vesting transaction subcommands
```

- **Queries**: treasurenetd query

The list of available commands

```shell
Available Commands:
  account                  Query for account by address
  auth                     Querying commands for the auth module
  authz                    Querying commands for the authz module
  bank                     Querying commands for the bank module
  block                    Get verified data for a the block at given height
  distribution             Querying commands for the distribution module
  evidence                 Query for evidence by hash or for all (paginated) submitted evidence
  evm                      Querying commands for the evm module
  feegrant                 Querying commands for the feegrant module
  gov                      Querying commands for the governance module
  ibc                      Querying commands for the IBC module
  ibc-transfer             IBC fungible token transfer query subcommands
  mint                     Querying commands for the minting module
  params                   Querying commands for the params module
  slashing                 Querying commands for the slashing module
  staking                  Querying commands for the staking module
  tendermint-validator-set Get the full tendermint validator set at given height
  tx                       Query for a transaction by hash, addr++seq combination or signature in a committed block
  txs                      Query for paginated transactions that match a set of events
  upgrade                  Querying commands for the upgrade module
```
