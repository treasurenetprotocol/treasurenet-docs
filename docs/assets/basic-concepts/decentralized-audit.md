---
sidebar_position: 4
---

# Decentralized RWA Audit

Real-world asset production data is audited by smart contracts in the Treasurenet blockchain. By design, different asset classes call respective asset data modules, because each asset class will have unique industry processes.

Asset data modules work in tandem with the Oracle module to validate the asset production record from hardware meters by cross-referencing the production rates with publicly accessible sources, whitelisted by Treasurenet’s DAO governance smart contract.

Upon successful verification of the production data, the TN protocol will allocate the corresponding quantity of `$TAT` as a reward to Producers.

## What is an Audit

In Treasurenet, auditing specifically refers to the process of verifying and correcting the output of assets that can be minted into `$TAT` tokens.

- Verifying output means that the output uploaded to Treasurenet by producers will not be directly minted into `$TAT` tokens. First, it needs to be compared with the official output data to verify that the output data uploaded by the producer is real and unbiased;

- Correcting output refers to when a significant discrepancy is found between the producer's uploaded output data and the official output data during the verification process. We will adjust the output data; only the corrected output can be used for minting `$TAT` tokens.

## What is a Decentralized Audit

From the above description of auditing, we know that the output of assets after auditing will be used to mint `$TAT` tokens. Therefore, the amount of asset output after auditing is very important. This means that the more output after auditing, the more `$TAT` tokens can be minted, and the fewer outputs after auditing, the fewer `$TAT` tokens can be minted.

Therefore, who audits, how to audit, and whether the audit results are fair, just, and open are all very important. So, we need to ensure that the number of `$TAT` tokens minted is not arbitrarily determined by anyone or any organization, but is determined by a set of relatively objective rules that are not interfered with by any human factors. We write these rules into the contract, and no individual or organization can directly change this set of audit rules. Therefore, this set of rules is decentralized auditing.

## How to conduct a Decentralized Audit

We use the process of minting `$TAT` tokens with an asset like oil as an example of decentralized auditing:

An oil producer uploads their oil output to Treasurenet;

At a fixed time each month, we will obtain the output data that the producer submitted to the official data source;

The producer initiates the operation to mint `$TAT` tokens on their own. This operation will first trigger the contract to audit the output. After the audit is completed, the operation to mint `$TAT` tokens is performed;

:::note
The output audit, according to the contract rules, will compare and correct the output data from both sources. If there is a significant deviation, a certain amount of margin will need to be deducted. The specific correction rules can be seen [here](/).
:::

Of course, minting `$TAT` tokens not only requires the corrected asset output data but also the price data of the asset. This will not be elaborated here. For details on the minting of `$TAT`, see [here](/).
