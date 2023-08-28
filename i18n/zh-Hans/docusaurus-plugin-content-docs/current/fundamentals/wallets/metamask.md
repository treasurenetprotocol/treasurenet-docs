---
sidebar_position: 1
---

# Metamask 钱包

## 什么是 Metamask？

MetaMask 浏览器扩展是一个用于访问支持以太坊的应用程序和管理用户身份的钱包。它可通过正在运行的 Treasurenet 节点连接 Treasurenet。

## 如何在你的浏览器上安装 Metamask？

1. 安装 MetaMask 插件前，您需要先安装 Chrome 浏览器。
2. 浏览器安装成功后，通过 Chrome 浏览器，进入 MetaMask 官网，点击'Download now'，然后点击 'Install MetaMask for Chrome' 开始下载。
3. 安装完成后，点击'添加至 Chrome'，在确认界面点击'添加扩展程序'，即可将小狐狸钱包安装至 Chrome 浏览器。
4. 安装完成后，浏览器右上角插件栏会出现小狐狸图标，说明安装成功。

## 如何连接 Metamask？

- 最快且最推荐的方法是通过官网链接你的钱包，我们会引导你通过 metamask 交互链接到我们的节点并完成创建。
- 如果您只是 TokenHolder，并不想通过官网的引导来链接 Treasurenet 网络, 您也可以手动链接。

### 手动添加 Treasurenet Mainnet

1. 在您的浏览器上打开 Metamask 扩展程序，如果您尚未登录，请先登录您的 Metamask 帐户
2. 打开设置>网络>添加网络，填写下方网络信息

   - Network Name : Treausurenet Mainnet Alpha
   - New RPC URL: https://wallet.treasurenet.io
   - Chain ID：5002
   - Currency Symbol (optional): UNIT
   - Block Explorer URL (optional)：https://evmexplorer.treasurenet.io/

![addmainnet](/img/docs/addmainnet5002.png)

3. 添加成功后，进入账户

![mainnetmyaccount](/img/docs/mainnetmyaccount.png)

### 手动添加 Treasurenet Testnet

1. 在您的浏览器上打开 Metamask 扩展程序，如果您尚未登录，请先登录您的 Metamask 帐户
2. 打开设置>网络>添加网络，填写下方网络信息

   - Network Name : Treausurenet Testnet
   - New RPC URL: https://wallet.testnet.treasurenet.io
   - Chain ID：5005
   - Currency Symbol (optional): UNIT
   - Block Explorer URL (optional)：https://evmexplorer.testnet.treasurenet.io/

![addtestnet](/img/docs/addtestnet5005.png)

3. 添加成功后，进入账户

![testnetmyaccount](/img/docs/testnetmyaccount.png)

## 如何导入账户？

1. 点击小狐狸图标，打开钱包
2. 点击右上角头像，选择导入账户
3. 根据提示填写相应私钥便
4. 点击导入按钮，提交后即可成功导入账户

![import account1](/img/docs/importaccount1.png)

![importaccount2](/img/docs/importaccount2.png)

## 如何导入代币？

1. 点击小狐狸图标，打开钱包
2. 选择导入代币
3. 填写代币合约地址
4. 我们的代币合约地址信息如下：

- TAT : `0x465C5ed965692F850f0a3Df1aA29955953a53714`

![importtokens](/img/docs/importtokens.png)

![token2](/img/docs/token2.png)

![token3](/img/docs/token3.png)

![token4](/img/docs/token4.png)

现在您的 MetaMask 钱包已经连接到我们的区块链网络，您可以通过官网查看您的相关资产并进行相关操作。
