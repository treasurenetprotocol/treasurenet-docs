---
sidebar_position: 1
---

# Introduction

## Consensus Mechanism

Treasurenet is a highly scalable, high throughput blockchain, operating on the Proof of Stake (PoS) consensus mechanism, and is built using the Cosmos Software Development Kit (SDK) atop the Tendermint core Byzantine fault-tolerant consensus method.

While Proof of Work (PoW) has been successfully applied in the Bitcoin blockchain network, the creation of PoS serves as a powerful alternative. Industry participants argue about the enormous energy use of Bitcoin imposing a strain on the world's power systems. The energy cost of PoW became so unacceptable that miners need to weigh their returns against energy consumption.

PoW requires all nodes to consume a large amount of computing power to compete for bookkeeping rights, but in each round of consensus, only one node's work is effective, meaning a significant amount of resources are wasted. Therefore, the Proof of Stake mechanism (PoS) was proposed in 2013 to solve the problem of resource waste.

In PoS consensus, nodes compete for bookkeeping rights based not on computing power but on stake (tokens). PoS also requires the calculation of hash values, but unlike PoW, there's no need for continuous brute force calculation to find nonce values. Each node only needs to calculate a hash once in each round of consensus. The more stake one holds, the greater the chance of meeting the hash goal, and the greater the chance of obtaining bookkeeping rights. Therefore, PoS is a resource-saving consensus protocol.

## Transactions and Blocks

A transaction refers to the behavior initiated by an account to change the state of the blockchain. To effectively execute state changes, each transaction is broadcast to the entire network. Any node can broadcast transactions that are requested to be executed on the blockchain state machine; once this happens, the validators will verify, execute the transactions and propagate the resulting state changes to the rest of the network.

Details can be referred to [here](./concepts/transactions.md)

## Security

The security features of the Treasurenet blockchain network mainly include the following aspects:

- **Distributed Accounting:** Treasurenet blockchain network adopts a distributed accounting method, each node can participate in the calculation, and each node's calculation is independent, ensuring the security and reliability of the data.
- **Decentralization:** Treasurenet blockchain network is decentralized, does not need to be managed by a centralized management institution, thus avoiding trust issues and security problems brought by centralized management.
- **Immutability:** The data in the Treasurenet blockchain network is immutable. Once data is written into the blockchain, it cannot be modified, ensuring the security and reliability of the data.
- **Efficiency:** The Treasurenet blockchain network is efficient and can achieve fast data transmission and transactions, avoiding the delay and cumbersome operations brought by traditional centralized transaction methods.
- **Cross-chain Interoperability:** The Treasurenet blockchain network supports cross-chain interoperability and can interact with other blockchain networks, thus expanding the application range of the Treasurenet blockchain network.

## Smart Contracts

Ethereum Smart Contract is a type of smart contract within the Ethereum network. It is a self-executing protocol that enables decentralized transactions and asset management on the blockchain. Smart Contracts utilize the Ethereum Virtual Machine (EVM) to execute contract code. The EVM is a Turing-complete programming language that enables complex computations and smart contracts to be executed in a distributed environment.

The core feature of Smart Contracts is the separation of code generation and execution, which avoids the need for manually writing extensive code in traditional contracts. Smart contracts can automatically handle protocol fulfillment, management, and payments, enabling decentralized management and transactions in a digitized manner. They also provide a more secure transaction mechanism and a trusted transaction environment without the need for third-party intervention.

In the Ethereum network, Smart Contracts are widely used in various fields, such as decentralized exchanges supported by smart contracts, issuance and management of stablecoins, automated asset management and trading, and more. Additionally, Smart Contracts can be used to develop cross-platform applications, enabling interoperability between different blockchains.

- **Decentralization:** Smart contracts use a distributed system architecture, where each contract operates independently without the need for intermediaries. This avoids risks such as data breaches and tampering that exist in traditional centralized exchanges.
- **Automated Management:** Blockchain networks can automatically manage assets and smart contracts, eliminating the need for extensive manual coding. This not only improves efficiency but also reduces the possibility of errors.
- **High Security:** Encryption technology is used to ensure the security of transactions, mitigating trust issues present in traditional centralized exchanges. Additionally, smart contracts can automatically handle transactions, minimizing the potential for human errors.
- **Cross-platform Support:** Smart contracts can run on multiple blockchains, enabling interoperability between different chains. This enables functionalities such as cross-chain payments and cross-chain asset exchanges, making the Treasurenet network more valuable.

The ability to control digital assets through smart contracts has attracted a large community of developers to build decentralized applications on the Ethereum Virtual Machine (EVM). This community continuously creates a wide range of tools and introduces standards, further enhancing the adoption of EVM-compatible technologies.

Whether you are building new use cases on Treasurenet or porting existing dApps from another EVM-based chain, you can easily develop and deploy EVM smart contracts on Treasurenet to implement the core business logic of your dApp. Treasurenet is fully compatible with the EVM, allowing you to use the same tools (Solidity, Remix, Oracles, etc.) and APIs (such as Ethereum JSON-RPC) available on the EVM.

## Upgrades and Governance:

### Guiding Principles and Values

#### 1. Progressive Decentralization：

Treasurenet network strives for maximum decentralization in terms of network validation, governance, and finance. While network resilience and power distribution are crucial, we recognize the need for strategic and science-based planning, and the community will adopt a stance of progressive power decentralization.

#### 2. User-Centrism：

Treasurenet Blockchain Network is dedicated to providing a unique and exceptional EVM experience within the Cosmos ecosystem. Therefore, we must continue to optimize:

1. user adoption
2. Quality factors that contribute to stable growth:

- Network liquidity
- Improvement of user experience
- Data sovereignty
- Stable block production
- Educational resources
- Robust governance, and more.

#### 3. Consensusual Collaboration

While the governance implementation of the Cosmos SDK is relatively permissionless, it does not imply that anyone has the right to work or receive compensation. Proposals will be evaluated by the community based on their merits and subjected to voting. Additionally, proposals must adhere to the governance framework of the Treasurenet network and comply with the principles outlined in the charter.

### Upgrades

#### Planned Upgrades

Planned upgrades are coordinated scheduled upgrades that use the upgrade module logic. This facilitates smoothly upgrading Treasurenet to a new (breaking) software version as it automatically handles the state migration for the new release.

#### Unplanned Upgrades

Unplanned upgrades are upgrades where all the validators need to gracefully halt and shut down their nodes at exactly the same point in the process. This can be done by setting the --halt-height flag when running the treasurenetd start command.

If there are breaking changes during an unplanned upgrade (see below), validators will need to migrate the state and genesis before restarting their nodes.
