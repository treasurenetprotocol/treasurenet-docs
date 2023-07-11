# Remix: Deploying a Smart Contract

[Remix](http://remix.ethereum.org/) is an in-browser IDE for [Solidity](https://github.com/ethereum/solidity) smart contracts. In this guide, we will learn how to deploy a contract to a running Treasurenet network through Remix and interact with it.

## Connect to Remix

:::info
If you are not ready, please refer to the steps in the Metamask guide to connect your metamask to the Treasurenet Blockchain network (preferably testnet, which will reduce your overhead). And make sure your account has a certain UNIT token.
:::

Open the [Remix](http://remix.ethereum.org/)IDE site, there will be some default files displayed in the window。

![remix_1](/img/docs/remix_1.png)

In the far left column, select Solidity Compiler and compile the contract.

Next select the "Deploy and Run" option. Select "Injected Provider - Metamask" as Environment. This will invoke your metamask to verify the connection.

After completion, you can see your account address, Token balance and other information in Account.

![remix_2](/img/docs/remix_2.png)

Click Deploy at this point to complete the deployment operation.
