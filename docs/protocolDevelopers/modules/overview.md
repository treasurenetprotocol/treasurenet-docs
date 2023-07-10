---
sidebar_position: 1
---

# Introduction

The Treasurenet chain utilizes the Cosmos SDK and the underlying Tendermint core consensus engine. Specifically, the Cosmos SDK is a framework that facilitates the development of secure state machines on top of Tendermint.

In this document, we will focus on introducing some important modules that we use.

- Core Modules: auth, bank
- Auxiliary Module: params
- On-chain Governance Module: gov
- Proof-of-Stake Modules: staking, mint, distribution, slashing
- Inter-Blockchain Communication Module: ibc/core

[Auth](./auth.md) - Responsible for authenticating accounts and transactions in the application, specifying basic transaction and account types.

[Bank](./bank.md) - Provides token transfer functionality and supports querying the total supply of all assets.

[Distribution](./distribution.md) - Handles fee distribution and provides rewards to validators and delegators.

[Gov](./gov.md) - On-chain proposal and voting system.

[Mint](./mint.md) - Creates new units of staking tokens.

[Slashing](./slashing.md) - Implements mechanisms for penalizing validators.

[Staking](./staking.md) - Implements the proof-of-stake layer for the public blockchain.

[Upgrade](./staking.md) - Facilitates the smooth upgrade of the Treasurenet chain to a new software version.
