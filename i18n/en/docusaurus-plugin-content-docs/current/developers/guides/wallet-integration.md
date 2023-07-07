---
sidebar_position: 1
---

# Wallet Intergation

📋 Want to learn more about wallet integration? Check out the [MetaMask Wallet Documentation](https://docs.metamask.io/guide/) and [Keplr Wallet Documentation](https://docs.keplr.app/).

## Implementation Checklist

The integration implementation checklist for dApp developers consists of three categories:

1. Front-end functionality
2. Interaction with transactions and wallets
3. Client's provider

## Front-end

Ensure the creation of a wallet linking button for Metamask, Coinbase, or Keplr on the front-end pages of the application.

## Transactions

Developers enabling transactions on their dApp must identify the user's wallet type, create transactions, request signatures from the respective wallet, and finally broadcast the transaction to the network.

## Identify Wallet Type

Developers should determine whether the user is using Keplr or MetaMask. The presence of MetaMask or Keplr on the user's device can be determined by checking the corresponding values of window.ethereum or window.keplr.

```javascript
await window.ethereum.enable(chainId); //For MetaMask/coninbase
await window.keplr.enable(chainId); //For Keplr
```

If window.ethereum or window.keplr returns undefined after document.load, it means that MetaMask/Coinbase (or the respective Keplr) is not installed.
There are several methods to wait for the loading event and check the status. For example, developers can register a function to window.onload, or they can track the document's ready state through a document event listener.

Once the user's wallet type is determined, developers can proceed with creating, signing, and sending transactions.

## Create Transaction

Developers can create transactions using the msgSend function from the Treasurenet JavaScript library.

```javascript
import { createMessageSend } from @treasurenet/transactions

const chain = {
    chainId: 9000,
    cosmosChainId: 'treasurenet_9000-4',
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

## Sign and Broadcast Transaction

After creating a transaction, developers need to send the payload to the corresponding wallet for signing (msg.signDirect is the transaction in Keplr format, msg.eipToSign is the data to be signed in EIP712 format).

With the signature, we add the Web3Extension to the transaction and broadcast it to the Treasurenet nodes.

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

## Connection

For Ethereum RPC, Treasurenet gRPC, and/or REST queries, dApp developers should implement the providers on the client-side and store the RPC details as confidential information in environment variables.
