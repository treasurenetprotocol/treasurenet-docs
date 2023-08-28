---
sidebar_position: 2
---

# Coinbase 钱包

## 什么是 Coinbase 钱包？

Coinbase 浏览器扩展钱包是一个用于访问支持以太坊的应用程序和管理用户身份的钱包。 它可用于通过正在运行的 Treasurenet 节点连接 Treasurenet。

## 如何在你的浏览器上安装 Coinbase 钱包？

1. 安装 MetaMask 插件前，您需要先安装 Chrome 浏览器。
2. 浏览器安装成功后，通过 Chrome 浏览器，进入 Chrome 应用商店，找到 Coinbase 钱包，点击'添加至 Chrome'，下载完成后，浏览器右上角插件栏会出现蓝色圆圈图标，说明安装成功。

![download2](/img/docs/download2.png)

## 如何连接 Coinbase 钱包？

- 最快且最推荐的方法是通过官网链接你的钱包，我们会直接引导你通过 Coinbase 钱包交互链接到我们的节点并完成创建。

- 如果您只是作为 TokenHolder 并不想通过官网的引导来链接 Treasurenet 网络, 您也可以手动链接。

### 手动添加 Treasurenet 主网

1. 在您的浏览器上打开 Coinbase 钱包扩展程序，如果您尚未登录，您可能需要登录您的 Coinbase 钱包帐户；
2. 打开设置>网络>添加网络，填写下方网络信息：
   - Network Name : Treausurenet Mainnet Alpha
   - New RPC URL: https://wallet.treasurenet.io
   - Chain ID :5002
   - Currency Symbol (optional): UNIT
   - Block Explorer URL (optional):https://evmexplorer.treasurenet.io/

![addnetwork1](/img/docs/addnetwork1.png)

![addnetwork2](/img/docs/addnetwork2.png)

![addnetwork3](/img/docs/addnetwork35002little.png)

### 手动添加 Treasurenet 测试网

1. 在您的浏览器上打开 Coinbase 扩展程序，如果您尚未登录，请先登录您的 Coinbase 帐户
2. 打开设置>网络>添加网络，填写下方网络信息

   - Network Name : Treausurenet Testnet
   - New RPC URL: https://wallet.testnet.treasurenet.io
   - Chain ID：5005
   - Currency Symbol (optional): UNIT
   - Block Explorer URL (optional)：https://evmexplorer.testnet.treasurenet.io/

![addtestnetwork](/img/docs/addtestnetwork5005little.png)

## 如何导入代币？

1. 打开设置>隐藏资产, 点击加号标志，填写下方合约地址:

[^_^]: USTN : `0x7102e133acfbDE1BE72C25f6669117Dd75DE7184`
- TAT : `0x465C5ed965692F850f0a3Df1aA29955953a53714`

![addtoken1](/img/docs/addtoken1.png)

![addtoken2](/img/docs/addtoken2.png)

![addtoken3](/img/docs/addtoken3.png)

![addtoken4](/img/docs/addtoken4.png)

完成以上操作，现在您的 Coinbase 钱包已经连接到我们的区块链网络，您可以通过官网查看您的相关资产并进行相关操作。
