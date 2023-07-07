---
sidebar_position: 1
---

# Introduction

A block explorer allows users to query data on the blockchain. It is often referred to as the search engine of the blockchain. By using a block explorer, users can query, search, and track balances, accounts, contracts, transactions, and other data broadcasted to the blockchain.

Treasurenet provides two types of block explorers: EVM Block Explorer and Cosmos Block Explorer.

Each explorer queries data relevant to its environment. The EVM Block Explorer queries Ethereum-formatted data (blocks, transactions, accounts, smart contracts, etc.), while the Cosmos Block Explorer queries Cosmos-formatted data (Cosmos and IBC transactions, blocks, accounts, module data, ETC).

## Block Explorer URL List

### Main Net

|                      | Type   | URL                                    |
| -------------------- | ------ | -------------------------------------- |
| EVM BlockExplorer    | evm    | https://evmexplorer.treasurenet.io/    |
| Cosmos BlockExplorer | cosmos | https://cosmosexplorer.treasurenet.io/ |

### Test Net

|                      | Type   | URL                                            |
| -------------------- | ------ | ---------------------------------------------- |
| EVM BlockExplorer    | evm    | https://evmexplorer.testnet.treasurenet.io/    |
| Cosmos BlockExplorer | cosmos | https://cosmosexplorer.testnet.treasurenet.io/ |

## About Blockscout

You may have noticed that we have chosen the open-source third-party project Blockscout and customized it as the EVM Block Explorer.

[Blockscout](https://github.com/blockscout/blockscout) is an Elixir-based application, which is a comprehensive, user-friendly, and easy-to-view open-source third-party blockchain explorer for viewing, confirming, and examining transactions on the blockchain.

Blockscout is secure, efficient, and open enough, which is why we chose it instead of reinventing the wheel.
