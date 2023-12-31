---
sidebar_position: 3
---

# 新资产注册

Treasurenet 欢迎任何有价值的资产加入我们 并产生相应的 TAT 代币。

为了保证和现有的资产相对平衡，我们约定铸造的 TAT 需要满足 1TAT=1US dollar 的价值标的，只要满足这样的价值锚定，你可以把任何资产加入到 Treasurenet 项目中来。

那么如何让新的资产加入到 Treasurenet 中来呢？

首先，您需要为新的资产撰写合约（合约群） 合约主要包含两个部分

- 生产商资料处理合约（Producer Contract) [->合约编写说明](https://)
- 产量处理及存储合约 （Production Data Contract) [->合约编写说明](https://)

然后，您需要为新的资产而改动现有的 Oracle 模块[github](https://)，来向合约系统提供可信数据源的验证数据 , 改动之后您需要联系 github 上的工作人员将其作为新的分支，加入到代码库中。

第三步，您需要提供一个完整的供生产商使用的工具或者一种方法的介绍说明，来让其他与您一样拥有此类资产的生产商们更加方便的加入进来。

接着，您就可以来到我们的服务平台 发起新资源的加入提案。

为了让大家更了解您提案中所希望加入的新资源，您需要在提案中至少包含以下的内容：

1. 名称、描述
2. 业务逻辑、资源价值的介绍(即证明为什么这个资源是有价值的)
3. 新合约 github 源码地址 合约逻辑的详细描述
4. 新合约的安全性证明(比如通过了审计)
5. Oracle 的模块新分支 及 相关说明(需要说明为什么新资源的验证数据是可信且有效的)
6. 生产商工具(或者资源加入的方法) 以及 详细说明
7. 联系方式 社交方式 用于反馈信息和交流

我们强烈建议您提供尽可能多的额外信息，来让更多的人了解您和您想要加入的资产，这将非常有助于该提案尽快的顺利通过治理投票。

在您的提案通过之后 Treasurenet Foundation 将会和您取得联系，并和您协作完成后续的操作。

除此之外，我们也建议您能够提供一个拥有便利功能的网站，这将有利于生产商的日常操作，包括提供数据、查询、历史信息等等。因为并非所有的生产商都具备一定的技术实力。网站数据的获取可以通过事件监听方式和查询操作实现，更多内容可以通过 API 查询。

**当然，如果您不具备足够的开发实力，仍愿意加入我们，可以考虑通过 Dapp 的孵化计划来实现。 关于 Dapp 的孵化计划的更多信息可以点击[这里](https://)**
