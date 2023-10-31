---
sidebar_position: 1
---

# 钱包集成

📋 想了解更多关于钱包集成的信息吗？ 查看 [MetaMask 钱包文档](https://docs.metamask.io/guide/) 和 [Keplr 钱包文档](https://docs.keplr.app/)。

## 实施清单

dApp 开发人员的集成实施清单包括三类

1. 前端功能
2. 交易和钱包的交互
3. 客户端的 provider

## 前端

确保在应用程序的前端页面上为 metamask、coinbase 或者 keplr 创建一个钱包链接的按钮。

## 交易

在其 dApp 上启用交易的开发人员必须确定用户的钱包类型，创建交易，从相应的钱包请求签名，最后将交易广播到网络。

## 确定钱包类型

开发人员应确定用户使用的是 Keplr 还是 MetaMask。 用户设备上是否安装了 MetaMask 或 Keplr 可以通过检查相应的 window.ethereum 或 window.keplr 值来确定。

```javascript
await window.ethereum.enable(chainId); //For MetaMask/coninbase
await window.keplr.enable(chainId); //For Keplr
```

如果 window.ethereum 或 window.keplr 在 document.load 之后返回 undefined，则 MetaMask/Coinbase（或相应的 Keplr）未安装。
有几种方法可以等待加载事件检查状态：例如，开发人员可以将函数注册到 window.onload，或者他们可以通过文档事件侦听器跟踪文档的就绪状态。

确定用户的钱包类型后，开发人员可以继续创建、签名和发送交易。

## 创建交易

开发者可以通过 treasurenet 的 js library 的 msgSend 函数创建交易

```javascript
import { createMessageSend } from @treasurenet/transactions

const chain = {
    chainId: 5005,
    cosmosChainId: 'treasurenet_5005-1',
}

const sender = {
    accountAddress: 'treasurenet1mx9nqk5agvlsvt2yc8259nwztmxq7zjq50mxkp',
    sequence: 1,
    accountNumber: 9,
    pubkey: 'AgTw+4v0daIrxsNSW4FcQ+IoingPseFwHO1DnssyoOqZ',
}

const fee = {
    amount: '20',
    denom: 'aunit',
    gas: '200000',
}

const memo = ''

const params = {
    destinationAddress: 'treasurenet1pmk2r32ssqwps42y3c9d4clqlca403yd9wymgr',
    amount: '1',
    denom: 'aunit',
}

const msg = createMessageSend(chain, sender, fee, memo, params)

// msg.signDirect is the transaction in Keplr format
// msg.legacyAmino is the transaction with legacy amino
// msg.eipToSign is the EIP712 data to sign with metamask

```

## 签名并广播交易

创建交易后，开发人员需要将 payload 发送到相应的钱包进行签名（msg.signDirect 是 Keplr 格式的交易，msg.eipToSign 是 EIP712 要签名的数据）。

使用签名，我们将 Web3Extension 添加到交易并将其广播到 Treasurenet 节点。

```javascript
// Note that this example is for MetaMask, using treasurenetjs

// Follow the previous code block to generate the msg object
import { treasurenetToEth } from "@treasurenet/address-converter";
import {
  generateEndpointBroadcast,
  generatePostBodyBroadcast,
} from "@treasurenet/provider";
import {
  createTxRawEIP712,
  signatureToWeb3Extension,
} from "@treasurenet/transactions";

// Init Metamask
await window.ethereum.enable();

// Request the signature
let signature = await window.ethereum.request({
  method: "eth_signTypedData_v4",
  params: [
    treasurenetToEth(sender.accountAddress),
    JSON.stringify(msg.eipToSign),
  ],
});

// The chain and sender objects are the same as the previous example
let extension = signatureToWeb3Extension(chain, sender, signature);

// Create the txRaw
let rawTx = createTxRawEIP712(
  msg.legacyAmino.body,
  msg.legacyAmino.authInfo,
  extension
);

// Broadcast it
const postOptions = {
  method: "POST",
  headers: { "Content-Type": "application/json" },
  body: generatePostBodyBroadcast(rawTx),
};

let broadcastPost = await fetch(
  `https://node1.treasurenet.io:8545${generateEndpointBroadcast()}`,
  postOptions
);
let response = await broadcastPost.json();
```

## 连接

对于 Ethereum RPC、Treasurenet gRPC 和/或 REST 查询，dApp 开发人员应在客户端实现提供程序，并将 RPC 详细信息作为机密存储在环境变量中。
