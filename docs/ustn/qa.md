---
sidebar_position: 4
---

# FAQ

## What is USTN?

The USTN Token is an asset that can be traded on-chain like other cryptocurrencies, but it's pegged 1:1 with real-world currency, so it's called a stablecoin.

## How to get USTN?

1. You can obtain USTN by exchanging or loaning with UNIT in USTN Finance.
2. Exchanging refers to getting a certain amount of USTN according to the value of UNIT. 1 USTN=1 $, if the total amount of USTN has reached 50,000,000, it won't be possible to continue exchanging for USTN.
3. Loaning refers to loaning a certain amount of USTN by using UNIT through a certain collateral rate. If there are no USTN deposits in the system at this time, USTN cannot be loaned out.

## How can I use USTN?

In USTN Finance, you can deposit USTN to earn interest, or use USTN to exchange for UNIT. For specific usage, click [here](https://124.70.23.119:3021/en/docs/ustn/financial-operations/) to view.

## After depositing USTN, when will the interest start to be calculated? What is the interest rate?

1. Interest will start to be calculated the day after USTN is deposited.
2. The interest rate fluctuates based on the amount of repayment on the loan side. That is, if no one repays, there will be no deposit interest. The higher the repayment amount, the higher the deposit interest.

## Why would my loan be warned?

1. When the price of UNIT fluctuates too much, causing the current collateral rate of the loan to be less than or equal to the warning line, the system will issue a warning.
2. At this time, you should replenish the collateral, otherwise, the loan may be liquidated, and your collateral cannot be retrieved through repayment.

### What is the warning line?

- The warning refers to the alert issued by the system when the value of your collateral drops, and the current collateral rate of the loan is less than a specific value. At this time, you need to replenish the collateral, otherwise, your loan may be liquidated.
- This specific value is called the warning line, the warning line=loan collateral rate\*95%

## Why would my loan be liquidated?

1. When the price of UNIT fluctuates too much, causing the current collateral rate of the loan to be far less than the liquidation line, the loan will be liquidated and become an auction target.
2. If you want to redeem your collateral UNIT, you can participate in the bidding. As long as you have the highest bid, you can redeem your pledged UNIT.

### What is the liquidation line?

- Liquidation refers to when the current collateral rate of your loan is less than a specific value, the loan will be liquidated and processed in the form of auction goods, and your collateral cannot be redeemed through repayment.
- This specific value is called the liquidation line, the liquidation line=135% (=collateral rate\*90%)
