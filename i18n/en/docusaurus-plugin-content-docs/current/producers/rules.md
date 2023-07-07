# Rules

This section mainly explains the key calculation rules involved in the Treasurenet Production Portal.

### Qualifications

#### What is qualification admission?

Qualification admission refers to the qualification review and admission of the Producer when adding assets to Treasurenet.

#### How to get qualified?

1. Producers log into the Production Portal, first go through KYB (corporate verification), and then KYC (personal verification). KYC can only be initiated after KYB has been passed.
2. Both KYB and KYC are verified by an external system. After KYC is passed, Producer admission is complete.

Note: If the admission process is interrupted before passing KYC and the filled content is not saved, you will need to refill the admission application when you log back into the system.

### Annual Review

#### What is the annual review?

Annual review refers to the system's yearly qualification review of physical mines' carrier—oil wells. If the annual review is not completed, the output of your assets will not be able to mint TAT.

#### How to carry out an annual review?

1. When a well has been successfully added for 360 days, you will receive an internal message from the system, and you can also see the oil quality annual review feature on the Well Management page;
2. Producers need to click this feature, open the oil quality annual review detail page, re-upload information such as the chemical composition of the mine oil, and submit the application;
3. The Foundation Manager will review the information you filled in

   - If approved, the annual review is passed, and your mine will have an additional 365-day validity period
   - If not approved, you need to modify the annual review information and resubmit

###Production Audit

#### What is a production audit?

Production audit refers to the comparison of last month's production with government production, calculating the production deviation ratio. According to the production deviation ratio, the Producer's margin will be deducted accordingly, and the production and production value will be adjusted.

The system will mint TAT according to the production value after the production audit. Therefore, production audit is an essential step that affects how much TAT you can obtain.

#### How to trigger a production audit?

1. Producers select "Mintable" status production records on the WellManagement page and click [Mint TAT].
2. Choose [yes] in the pop-up window

   - Trigger the audit action for that month's production.
   - Mint the corresponding TAT according to the production audit result and deduct the margin.

#### How is a production audit conducted?

1. The system will count the total amount of production uploaded by each well every day;

2. At a fixed time each month, get the monthly production data of that well from the official platform;

3. The official production currently used by assets is government-endorsed production data, which is completely public and unmodifiable
   Compare the above two values to calculate the production deviation ratio;

4. Correct the producer's last month's mining production and corresponding market value based on the production deviation ratio.

5. Deduct the margin according to the production deviation ratio

   - Revised market value = (Officially announced last month's production / Producer's last month's production stored on the chain) \_ Last month's production value stored on the chain.
   - Production deviation ratio = (Producer's last month's production stored on the chain - Officially announced last month's production) / Officially announced last month's production \_ 100% production deviation ratio.
   - Margin deduction rule:

| Deviation Ratio | Adjusted Yield | Deducted Margin                                                                                                                                                                      |
| --------------- | -------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| <0              | Producer       | No deduction                                                                                                                                                                         |
| 0               | Producer       | No deduction                                                                                                                                                                         |
| (0, 10%]        | Official Yield | No deduction                                                                                                                                                                         |
| (10%, 30%]      | Official Yield | Deducted margin = (Adjusted Market Value _ Deviation Ratio _ Margin Deduction Percentage)<br/>Margin Deduction Percentage = 1% (set by the governance module)                        |
| >30%            | Official Yield | Deducted margin = (Adjusted Market Value _ Deviation Ratio _ Margin Deduction Percentage)<br/>Deviation Ratio = 100% Margin Deduction Percentage = 1% (set by the governance module) |

### Market Value

#### What is market value?

Market value specifically refers to the value of assets held by the Producer in the real trading market. We will query the latest asset unit price on the real-world price website for related calculations.

The market value in the Production Portal = Your uploaded asset production \* unit price on the official price website.

#### How to calculate market value?

Different assets have slightly different ways of calculating market value. The current market value calculation rules for oil and natural gas are:

    - OIL Market value (USD) = Daily production * Daily price * Oil price discount
    - GAS Market value (USD) = Daily production * Daily price

The oil price discount is a specific rule for this type of oil asset, different grades correspond to different prices, and the calculation is entirely based on the specific parameters when you add a well.

#### How to calculate the oil price discount?

When you add a well, you need to fill in the discount ratio, acidity, and API gravity of the well. These three values will affect the size of the oil price discount for this well, specifically as follows:

    - 90% discount ratio: API gravity > 31.10 && Acidity < 0.50%
    - 85% discount ratio: API gravity > 31.10 && Acidity >= 0.50%
    - 80% discount ratio: API gravity <= 31.10 && Acidity < 0.50%
    - 75% discount ratio: API gravity <= 31.10 && Acidity >= 0.50%

### Official Data

#### Official Production Data

1. Every month at 0:00AM UTC on the 5th, the system will regularly obtain official production data;
2. Official production data source: https://www.petrinex.gov.ab.ca/publicdata
3. The system will filter based on the year and month of the production to be audited at the above address;
4. From the filtered results, find the audit well's number based on conditions such as month, asset type, and record the corresponding monthly production.

#### Official Production Price

- Oil price

1. Source: https://oilprice.com/commodity-price-charts?page=chart&sym=CLY00
2. Rules: Query and record yesterday's closing price

- Gas price

1. Source: https://www.eia.gov/dnav/ng/ng_pri_fut_s1_d.htm
2. Rules: Query and record yesterday's price

### Minting TAT

1. Producers select "Mintable" status production records on the WellManagement page and click [Mint TAT].
2. Choose [yes] in the pop-up window, and the system will generate TAT based on the market value of the mined production after the production audit. After the successful minting of TAT, it will be directly transferred to your account;
3. If your well has beneficiaries, the beneficiaries will share the TAT you mint according to their benefit ratio.

For example: Well 1 has two beneficiaries, A is the Producer with a benefit ratio of 80%, B is Beneficiary 1 with a benefit ratio of 20%, then when Well 1 mints 100 TAT in March, Producer's account adds 80 TAT, Beneficiary 1's account adds 20 TAT.
