---
sidebar_position: 1
---

# Introduction

## What is a Validator?

Treasurenet's core characteristic is decentralization, meaning the network operates without a central server, relying instead on a group of node servers. A global distribution of nodes is essential to validate all network transactions, as it increases the resistance to potential attacks.

### Transaction Validity Consensus in Treasurenet

The original consensus algorithm, Bitcoin's Proof of Work (PoW), faced limitations in accommodating the increasing volume of transactions as blockchain technology evolved. As a result, the newer Proof of Stake (PoS) emerged as the primary consensus algorithm. PoS requires nodes to become validators, staking or locking tokens as collateral, which determines their weight within the network. The PoS consensus algorithm then sequentially selects validators to verify transactions and generate blocks.

Treasurenet relies on a group of validator nodes responsible for submitting new blocks in the blockchain. These validators participate in the consensus agreement by broadcasting messages, which contain encrypted digital signatures signed by each validator's private key.

Validator candidates can stake their Unit tokens and request delegation from other token holders.. IInitially, Treasurenet will utilize 8 foundation-controlled nodes as validators.As the network expands and more nodes join, a selection of candidates will be chosen to become ActiveValidators, participating in the consensus process.

### Rewards and Penalties

Active Validators and their delegators will receive block rewards (Unit Tokens) for executing consensus agreements. However, if a Validator commits violations, such as double-signing or frequently going offline, penalties may include deductions of staked Unit Tokens or suspension of validator status, depending on the violation's severity.

## Hardware

Validator candidates should equip their nodes with devices for redundant power, connectivity, and data storage backups, such as redundant network access equipment, redundant hard disk drives, and failover mini-servers.
As the network continues to grow, the demand for bandwidth, CPU, and memory will increase. It is highly recommended to use large hard drive devices for storing the entire ledger data of the blockchain.

## Supported OS

- linux/x86_64
- linux/arm64

TN theoretically supports more operating systems, but they are not yet fully tested, we will open more operating systems in the future, such as the common Windows and macOS (Darwin).

## Minimum Requirements

To run a mainnet or testnet validator node, , a server device must meet the following hardware requirements:

- 4 or more physical CPU cores
- At least 500GB of HDD disk storage
- At least 16GB of Memory(RAM)
- At least 100mbps network

With the growth of blockchain usage, server demands are expected to rise; thus, planning for server upgrades is important to accommodate future needs.

## Public Information

It is important to create a dedicated Validator website, social account (e.g. Twitter), and state on Discord that you intend to become a Validator. This is important because users seek information about the entities they stake to TN's Validator.
