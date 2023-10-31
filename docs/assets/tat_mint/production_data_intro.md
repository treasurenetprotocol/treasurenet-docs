# Introduction

:::info
It should be noted that all tools can only target specific data structures and are not applicable to all production storage databases.

We will continue to improve it, and at the same time, we also welcome manufacturers themselves or third-party developers to share automation tools designed by them.
:::

:::caution
What needs special explanation is that no matter which automation tool. Because of the nature of open source, we cannot completely guarantee that it will not be used maliciously.
:::

## Why we need an automation tool

Yes, even without the tools, you can still upload production by sending a certified transaction to the blockchain network. You can click [here](./production_data_manual.md) for more information.

Each day the previous 4 days' output is provided, and this may go on forever. If you have not connected the uploading of output with your internal enterprise tools or other software, this will require your engineers to repeat the work every day, which is obviously unwise.

The meaning of automatic tools is to let the software do it for us.


## Let’s get to know these two automation tools

### Production Data Process

Because the database is constantly changing, maybe the Sensor field name or other fields have changed.

So we need an automated tool to organize or clean the ever-changing database data.

Our tool currently only adapts to one type of oil and gas production database, which is described in detail next.

If you know some software development, you can use this tool as a template to modify it into a customized tool suitable for your data center.

### Production Data Uploader

The scheduled upload tool regularly extracts data from the database organized by the Production Data Process and uploads it to the blockchain network through the account information and oil well information configured by you.










