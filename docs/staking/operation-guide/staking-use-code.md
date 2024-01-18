# Using code staking on Treasurenet

### Query an Account

```javascript

const accounts = await window?.ethereum?.request({
    method: 'eth_requestAccounts',
})

const account = accounts[0];

```
### Get Account's Public Key with Keplr

```javascript

const cosmosChainID = 'treasurenet_8000-1' 

const account = await window?.keplr?.getKey(cosmosChainID)
const pk = Buffer.from(account.pubKey).toString('base64')

```


### Get Account's Public Key with metamask

```javascript

import {hashMessage} from '@treasurenet/hash'
import {
    computePublicKey,
    recoverPublicKey,
} from '@ethersproject/signing-key'

// Handle errors if MetaMask fails to return any accounts.
const message = 'Verify Public Key'

const signature = await window?.ethereum?.request({
    method: 'personal_sign',
    params: [message, account, ''],
})


const uncompressedPk = recoverPublicKey(
    hashMessage(message),
    signature,
)

//const evmPublicKey = uncompressedPk.replace('0x04','0x');

const hexPk = computePublicKey(uncompressedPk, true)
const publicKey = Buffer.from(
    hexPk.replace('0x', ''), 'hex',
).toString('base64')

```

### Get tnAddress

```javascript
const {ethToTreasurenet} = require('@treasurenet/address-converter')

const tnAddress = ethToTreasurenet(account);

```

### Get signable Transaction

```javascript
const axios = require('axios');
const {
    generateEndpointBroadcast,
    generatePostBodyBroadcast,
    generateEndpointAccount
} = require('@treasurenet/provider');
const {
    createTxMsgDelegate,
    createTxMsgUndelegate,
    createTxMsgWithdrawDelegatorReward,
    createTxRawEIP712,
    signatureToWeb3Extension
} = require('@treasurenet/transactions');

const response = await axios.get(`https://xxxx:1317${generateEndpointAccount(account)}`);

const {address, account_number, sequence} = response.data.account.base_account;

const gasPrice = await web3.eth.getGasPrice(); // get Gas Price

const chain = {
    chainId,  //Assume that the full version of cosmosChainId is treasurenet_8000-1, then fill in 8000 here
    cosmosChainId,
};

const sender = {
    accountAddress: tnAddress, //sender's tn address (not evm)
    sequence,
    accountNumber,
    pubkey: publicKey,  //sender's tn publickey (not evm)
};

const fee = {
    amount: gasPrice,
    denom: 'aunit',
    gas: '500000',
};

const memo = 'Sent via Cosmos Voyager';

const params = {
    validatorAddress,  // validator's tn address (not evm)
    denom: 'aunit',
    amount: amount
};

const withdrawParams = {
    validatorAddress
};

let msg = null;
let extension = null;

if (type === 'delegate') {
    msg = createTxMsgDelegate(chain, sender, fee, memo, params);
}
if (type === 'undelegate') {
    msg = createTxMsgUndelegate(chain, sender, fee, memo, params);
}
if (type === 'withdraw') {
    msg = createTxMsgWithdrawDelegatorReward(chain, sender, fee, memo, withdrawParams);
}

```

### sign the transaction with metamask

```javascript

const signature = await window.ethereum.request({
    method: 'eth_signTypedData_v4',
    params: [account, JSON.stringify(msg)]
});

```

### Boardcast the signed transaction

```javascript

const extension = signatureToWeb3Extension(chain, sender, signature);

const rawTx = createTxRawEIP712(msg.legacyAmino.body, msg.legacyAmino.authInfo, extension);

const response = await axios.post(`https://xxxx:1317${generateEndpointBroadcast()}`, JSON.parse(generatePostBodyBroadcast(rawTx)));

const txhash = response.data.tx_response.txhash;

```
