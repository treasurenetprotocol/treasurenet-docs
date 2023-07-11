# 用 Remix 部署智能合约

[Remix](http://remix.ethereum.org/) 是一个面向浏览器的 IDE，用于 Solidity 智能合约。在本指南中，我们将学习如何通过 Remix 将合约部署到正在运行的 Treasurenet 网络，并与其进行交互。

## 连接到 Remix

:::info
如果您尚未准备就绪，请参照 Metamask guide 相关文档中的步骤连接您的 metamask 到 Treasurenet Blockchain network（最好是 testnet，这将为您减少开销）. 并确保您的账户拥有一定的 UNIT token。
:::

打开[Remix](http://remix.ethereum.org/)IDE 站点， 会有一些默认文件展示在窗口中。

![remix_1](/img/docs/remix_1.png)

在最左边的栏中，选择 Solidity Compiler 并编译合约。

接下来选择"Deploy and Run"选项。选择"Injected Provider - Metamask"作为 Environment. 这会唤起您的 metamask 来验证连接。

完成之后 您可以在 Account 中看到您的账户地址，Token 的余量等信息。

![remix_2](/img/docs/remix_2.png)

此时点击 Deploy 即可完成部署操作。
