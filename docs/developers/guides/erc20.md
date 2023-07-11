---
sidebar_position: 1
---

# Issuing ERC-20/ERC-721/ERC-1155 Tokens

## What is a Token?

Tokens are representations of various real-world assets, including online platform points, in-game character skills, financial assets like equity and bonds, fiat currencies, gold, paintings, personalized signatures, and more.

## What is ERC-20?

ERC-20 tokens are fungible representations of assets on the blockchain, meaning they are interchangeable. The focus is on the quantity of tokens owned, rather than their individual identity. ERC-20 refers to a technical standard that defines a common set of rules such as how the tokens can be transferred, how transactions are approved, and the total supply of tokens.

## What is ERC-721?

ERC-721 token standard introduced non-fungible tokens (NFTs), which are unique and not interchangeable. Each NFT has its own distinct properties, and ownership history, enabling the creation of digital collectibles, unique assets, and provable ownership.Each NFT token is linked to different owners and has its own tokenID or metadata that makes them unique.

## What is ERC-1155?

ERC-1155 is a token standard that enables batch transfers of multiple assets in a single transaction, reducing costs and congestion. It supports both fungible and non-fungible tokens on the same contract, allowing for in-game payments and unique asset transfers. ERC-1155 also introduces semi-homogeneous tokens and includes features for secure transfers and prevention of exploitation.Additionally, ERC-1155 includes functionality to handle token transfers in case of errors. Unlike the ERC-721 standard, where assets sent to the wrong address are irrecoverable, ERC-1155 provides functions to address this issue. Secure transfer functions and various rules are implemented to prevent exploitation and ensure the safe and reliable transfer of tokens.

## ERC-721 vs ERC-1155

Due to its additional features, the ERC-1155 token standard is gaining prominence and may surpass the ERC-721 standard in the future. Here are some key differences between the two standards:

1. Token Types: ERC-1155 supports the creation of both semi-homogeneous tokens and non-homogeneous tokens, while ERC-721 only supports non-homogeneous tokens.

2. Metadata Handling: In ERC-1155, smart contracts are linked to multiple URIs and do not store additional metadata such as filenames. On the other hand, ERC-721 requires static metadata for each token ID to be stored directly on the smart contract, leading to higher deployment costs and limited flexibility.

3. Scalability: ERC-1155 smart contracts can handle an unlimited number of tokens, whereas ERC-721 requires a new smart contract to be created for each type of token.

4. Bulk Transfers: ERC-1155 enables bulk transfers of tokens, which can reduce transaction costs and processing time. In contrast, ERC-721 requires separate transactions for each token when transferring multiple tokens.

## quick Start

#### ERC-20

You can quickly create your ERC-20 token using Openzeppelin's contract GitHub repository as a base.

```solidity
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.2;
import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
contract testCoin is ERC20 {
    constructor() ERC20("testCoin", "tCoin") {
        _mint(msg.sender, 1000 * 10 ** decimals());
    }
}
```

#### ERC-721

You can quickly create your ERC-721 token by using openzeppelin's contract github repository as a base.

You can do this by referring to the official documentation provided by openzeppelin [here](https://docs.openzeppelin.com/contracts/3.x/erc721).

#### ERC-1155

You can quickly create your ERC-1155 token by using openzeppelin's contract github repository as a base.
You can do this by referring to the official documentation provided by openzeppelin [here](https://docs.openzeppelin.com/contracts/3.x/erc1155).

## Need help promoting it?

We welcome you to contact us at Discord at any time to tell us about your Token and we will publish our approved token in the documentation. Win-win cooperation.
