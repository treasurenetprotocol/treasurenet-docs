# Production Audit

Production audit refers to the comparison of Producer’s reported production quantity against published government production record, from the previous month, to calculate a production deviation ratio.

According to the production deviation ratio, the Producer's collateral will be deducted if applicable, and the reported production quantity will be adjusted to align with the result of the production audit.

## How is a production audit conducted?

1. Each asset class has its own asset data module for data processing and audit. Here, the OilData and GasData modules are utilized, in tandem with the Oracle module.

2. Producers can use an automated Tool, the ProductionData Uploader for reporting each natural gas and oil well’s daily production.

Notice: Treasurenet automated Tool requires connection to industry accepted production recording hardware and data service.

3. Monthly, an automated Tool, the Oracle Feeder Tool, will fetch the production data of that well from the whitelisted government publications;

4. The OilData and GasData module will compare the reported values and published values to calculate the production deviation ratio for the month;

`Production deviation ratio = (Producer's reported production stored on the chain - whitelist reported production) / whitelist reported production \_ 100%`

5. Calculate the verified production quantity and its corresponding market value based on the production deviation ratio for the month;

6. Deduct collateral, if applicable, according to the production deviation ratio

## How to start a production audit?

1. In the WellManagement page of the Producer Portal, Producers select and click [Mint TAT].

2. Choose [yes] in the pop-up window

- Trigger the audit action for that month's production.
- Mint the corresponding TAT according to the production audit result
