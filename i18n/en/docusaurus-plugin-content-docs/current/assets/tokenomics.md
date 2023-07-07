# Tokenomics

The total supply of `$UNIT` tokens is finite, but the exact limit will vary depending on the future production of rare assets. This is because Treasurenet block rewards reduce over time. Producers work together to create RWAs to prevent `$UNIT` block rewards from decaying quickly. Whereas BTC reduces by 50% per period, `$UNIT` rewards reduce at a rate based on $`$TAT` minted, hence asset produced.

## `$UNIT` Token

UNIT is the native token of Treasurenet, issued at the base layer of the Treasurenet network to facili`$TAT`e fundamental operations.

Though the UNIT token behaves similarly to other POS tokens, UNIT differs from other cryptocurrencies because it is backed by real-world effort. Every UNIT is created as a reward by verifying new blocks, the rate of which requires the production of real-world resources.

The issuance of UNIT tokens is determined by the rate of production of real-world rare assets and rare digital assets, conforming to a mechanism akin to commodity-based currencies. This approach entails a positive correlation between the number of UNIT tokens minted and the volume of real-world rare assets generated. Resulting in an asset-based approach rather than an asset-backed one.

An added benefit to asset-based is to not be a financial security product by design. There will be no liquidity and registration requirements as there would be with financial security products. And a sound digital currency should have no reliance on another corporation’s promise of fiat profits, which limits scalability and reach.

UNIT supply logic focuses purely on the natural difficulty of creating new real-world assets. By design, UNIT aims to maximize liquidity while grounded by real-world assets. This distinctive approach makes UNIT a more stable and valuable cryptocurrency compared to others, as its supply is directly tied to the production of rare assets. This dynamic creates a real-world cost floor for minting UNIT, extending beyond computing expenses to encompass the creation of new rare assets.

### Multiple purposes within Treasurenet:

**Network Economics**
UNIT token being the native token serves as the primary utility and value transfer mechanism within the network. It is used for paying transaction fees(gas fees), staking, governance (DAO), and block rewards on Treasurenet

**Network Consensus and Security**
Validators are required to stake UNIT tokens to participate in the network and validate transactions. This staking mechanism helps secure the network and ensures validators earn rewards in the form of UNIT tokens for their contributions to the network

**Governance**
UNIT token holders can participate in the governance of the Treasurenet ecosystem by voting on proposals and updates related to the platform's development and operation.

**Validator selection**
The amount of UNIT tokens staked plays a role in determining the selection of validators within the Treasurenet network.

**Staking and Reward**
Validators earn rewards in the form of UNIT tokens for their contributions to the network, such as proposing and validating blocks.

## `$TAT` Token

`$TAT` serves as the accounting token for representing real-world asset productivity on Treasurenet. `$TAT` serves as a represen`$TAT`ion of the credibility of each Producer, with its utility derived from the underlying asset(s) it records. The purpose of the `$TAT` is to document and verify the legitimacy of the Treasurenet economy.

On-chain proof of creditworthiness:
`$TAT` tokens serve as an on-chain proof of creditworthiness for Producers in a decentralized and anonymous manner. `$TAT` can be used to transparently price asset financing. This is because `$TAT` tokens track the production of assets by the Producer, which shows that the Producer has an underlying asset and whether this asset is economical.

Collateralization:
`$TAT` tokens can be used as collateral for financing activities on the Treasurenet platform. This means that users can use their `$TAT` tokens for financing, without having to sell their real-world assets. On their own, `$TAT` tokens signal a commitment to a financing pool, and the same asset (or portion of the asset) cannot be double-committed elsewhere.

The Treasurenet DAO is also looking to set up real-world legal structures to claim real-world collateral. This means that if a user defaults on a loan, the Treasurenet DAO will be able to seize their real-world assets. This makes the `$TAT` collateralization system more secure, as it provides lenders with a way to recover their money if a borrower defaults.

Although this type of legal structuring is common practice in legacy markets, combining real-world recourse with on-chain creditworthiness allows for radically transparent financing that is not possible without `$TAT` and Treasurenet’s decentralized audit framework.

Asset-specific indexing:
Producers who are connected to the TN Gateway can mint `$TAT` tokens on a regular basis. The rate at which `$TAT` tokens are minted depends on the type of asset that is being produced. This means that the cumulative represen`$TAT`ive value of an asset class can be tracked by looking at the number of `$TAT` tokens that have been minted for that asset class. This information can be used to make financial decisions, such as deciding which asset classes to invest in. It is worth noting that the option to make this asset information public is in the hands of the Producers.

## General Supply Framework

### Step 1: How many `$UNIT` tokens?

First, Treasurenet compares the actual RWA production rate amount against a Target Rate set by the DAO Governance module.

How does actual real-world asset production rate stand against Target Rate?
Reduce block reward based on the difference between actual rate and Target Rate.

Subsequently, there would be 3 general scenarios:

Fails to meet Target Rate - block reward reduced by 10% to 50%, depending on the magnitude of the difference
Meets Target Rate - block reward reduced by 10%
Surpasses the Target Rate - block reward reduced by 1% to 10%, depending on the magnitude of the difference
Total supply:

UNIT token supply may likely be between 700 million to 800 million.

This estimate is based on the following highlighted assumptions. However, it is vital to understand that the actual amount of future RWA production will determine the outcome. Specifically, more RWA production will lead to higher UNIT supply, and vice versa.

| Key Assumptions                                | Value                  | Description                                                                                            |
| ---------------------------------------------- | ---------------------- | ------------------------------------------------------------------------------------------------------ |
| Period                                         | 30,000,000 blocks      | Each period is ~ 1-year                                                                                |
| Initial block reward                           | 10 UNIT/block          | For the initial 2 periods, block reward maintains constant, giving time for the RWA ecosystem to build |
| Target Rate (for RWA production)               | 10%                    | Default Target Rate for periodic RWA production growth rate                                            |
| Maximum block reward reduction                 | 50%                    | Lower edge case; if 0 RWA is produced, block reward aggressively reduces by 50%                        |
| Minimum block reward reduction                 | 1%                     | Upper edge case; if the RWA growth rate is more than 1,000%, block reward reduces just 1%              |
| Default block reward reduction                 | 10%                    | Default reduce; if RWA growth rate equals Target Rate, block reward reduces by 10%                     |
| Future RWA production growth rate distribution | PERT [-50%, 15%, 500%] | It is difficult to forecast the RWA production growth rate,                                            |

We assume the first 3 periods’ growth rate to be 500%, as we develop more RWA connections.

Then, the steady-s`$TAT`e growth rate be modeled as a PERT Distribution,
defined by - 50% as the low expected rate, 15% as the expected rate, and 500% as the maximum expected rate.

When simulated for 500 periods, UNIT supply may resemble this following distribution. For complete details, please stay tuned for the further releases.

    ![Expected_supply](/img/docs/expected_supply.png)

### Step 2: Who earns `$UNIT`?

After determining the total block reward, each block reward is awarded to Active Validator nodes and Active Super Validator nodes.

|        | Active Validator node | Active Super Validator node                 |
| ------ | --------------------- | ------------------------------------------- |
| Apple  | Red                   | USA                                         |
| Action | Stakes `$UNIT`        | -Stakes `$UNIT` -Bids `$TAT` (burns `$TAT`) |
| Reward | Base Rewards          | Base Rewards; Super Validator Rewards       |

`$UNIT` holders can stake `$UNIT` into any of the nodes to share in proportional Base Rewards. $`$TAT` holders can bid $`$TAT` as well to share in proportional Super Validator Rewards, which is the Bonus Stake described in Core Concepts.

In the long run, we estimate Super Validator Rewards make up for about ~30% of the block rewards.
The magnitude of Super Validator Rewards varies based on how competitive the $`$TAT` bids are between nodes, and based on how many Super Validators are there. Details to be further described in future release.
