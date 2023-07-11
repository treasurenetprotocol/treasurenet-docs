---
sidebar_position: 4
---

# FAQ

## About Producer

### Why do I see many identities when I log into the ProductionPortal? How should I choose?

Every user of the ProductionPortal can have two roles: a producer and a beneficiary.

For example, you are Producer A, owning many assets, and also a beneficiary of the assets of Producer B (Producer B has added you as a beneficiary of his well). At this time, when you log in to the system with your account, the interface will display all your identity information, Producer A and the beneficiary of Producer B;

If you want to manage your own wells, margin, and cast TAT, select Producer A to log in;

If you want to manage your beneficiary ratio within Producer B, you can choose to log in as the beneficiary of Producer B.

### I cannot pass KYB/KYC, what should I do?

After registering for ProductionPortal, you need to go through KYB and KYC. If all the information filled in is correct but cannot pass, please seek help on [Discord](https://discord.com/channels/990530508834340905/990530510746964004).

## About Oil Wells

### What if my oil well fails the audit?

If your newly created oil well application is rejected by the auditor, you can modify the information of the well and resubmit the application until it passes the audit.

If the audit does not pass, the output of the assets in the well cannot be cast into TAT.

### What if my oil well fails the annual review on time?

If your oil well does not submit an annual review 5 days before the expiration of one year, the system will shut down the oil well's permission to cast TAT after it expires. That is to say, although you can continue to upload the output of this well, it cannot be cast into TAT anymore. Therefore, please submit the oil quality annual review in time when the oil well is about to expire.

### Why use ProducerTool?

To upload the output of the assets you own to the system through a standardized process, while also catering to a diverse user base, we created ProducerTool.

In fact, as long as you have the technical ability to call regular ETH contracts (such as web3, Geth), we have provided quite detailed APIs, and you can completely develop your own ProducerTool, and you can even integrate it into your existing software system. We encourage and recommend doing so.

If you are willing to share, you can also share your software with others. Build a production environment together and make resource uploading more convenient.

### What should I do if my output is not uploaded correctly?

If your output for a certain day is not uploaded on time due to various accidents, you can re-upload it; but the missing output for the month that has been cast into TAT cannot be re-uploaded.

### Can I modify the data of the oil well production I uploaded?

If the output data you uploaded is wrong, it cannot be modified. So please check the output to be uploaded to the system carefully, which will affect the number of TATs you can ultimately obtain.

### I have added additional beneficiaries to my well, can I remove them?

If you want to remove the beneficiary of your well, you can first set his benefit ratio to 0, transfer all his original benefit ratios to yourself or others, and then you can delete this beneficiary.

## About TAT

### Why was my margin deducted, and how can I avoid the deduction of margin?

When you trigger the operation of casting TAT, the system will audit the output. If it is found that the output you uploaded is significantly deviating from the output queried by the system from the official channel, the margin will be deducted;

So, to avoid the deduction of margin, you should check the output data in advance and try to be consistent with the results queried from the official channel.

### Why is my margin negative?

In order to ensure that you cast TAT to the greatest possible extent, if your margin balance>0, but balance < the number of UNITs to be deducted, we will deduct your margin according to the number of UNITs to be deducted, so a negative situation will occur.

For example: Producer Sam, the margin balance is 10 UNIT, when casting TAT in February 2023, the output audit deviates, and it is calculated that 15UNIT needs to be deducted. After the system successfully deducts it, Sam’s margin balance is now -5 UNIT;

In March 2023, Sam wants to cast TAT again, but he finds that he can’t cast it, because the margin balance<0, so he must make up the margin to at least greater than 0 before he can successfully cast TAT.
