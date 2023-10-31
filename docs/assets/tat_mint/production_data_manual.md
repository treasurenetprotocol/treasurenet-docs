# Production Data Manual

:::info
Manual uploading requires basic blockchain knowledge, as well as certain code development, usage, and interface review capabilities.

More demos are being added continuously
:::

### NodeJS(Javascript)

#### Set Production Data

```javascript
const web3 = new Web3(new Web3.providers.HttpProvider('https://node0.testnet.treasurenet.io'));

const sender_prvi_key = 'YOUR PRIVATE KEY';
// TESTNET
const contractAddress = '0xFe6810EDE16180686ee083A1B246A4182501E597' //GasData:0xe501CD75BA83798ECB408900034FF9BAC4926d5E
// Specify the relative path of the corresponding abi.json file
const abiJSON = JSON.parse(fs.readFileSync(path.join(__dirname, "./", `OilData.json`)));
// Params
const params = [
  "0x4872484e4579694e575a65745956524879303873680000000000000000000000",  // RequestID
  [
    "0x4872484e4579694e575a65745956524879303873680000000000000000000000",  // RequestID
    0,  // Keep Zero
    "0x0C6621BE4Bcd1Fff25d337D149246130cFc2B4d8",  //Owner Address
    1000,  //Asset Value
    0,   // Keep Zero   
    230101, //Date (Format YYMMDD)
    2301,   //Month (Format YYMM)
    0   // Keep Zero
  ]
];
// gas
const gas = 5000000;

const account = web3.eth.accounts.privateKeyToAccount(sender)
const contract = new web3.eth.Contract(abiJSON, contractAddress);
contract.handleRevert = true;

const tx_builder = await contract.methods.setProductionData(...params);
const encoded_tx = tx_builder.encodeABI();
const transactionObject = {
  gas,
  data: encoded_tx,
  from: account.address,
  to: contractAddress
};

try {
  const signTx = await web3.eth.accounts.signTransaction(transactionObject, account.privateKey);
  const result = await web3.eth.sendSignedTransaction(signTx.rawTransaction);
  console.log(`blockHash:${result.blockHash},blockNumber:${result.blockNumber}`);
} catch (e) {
  console.error(e);
}


```

The transaction can then be queried based on the printed blockHash or blockNumber in [evmexplorer.testnet.treasurenet.io](https://evmexplorer.testnet.treasurenet.io)

#### Possible ERRORs

|Explorer Error Message|Description|Processing|
|--|--|--|
|must be the producer|The account sending the transaction does not match the account address of the approved oil well holder|Check whether `sender_prvi_key` is consistent with the account number approved by the ProducerProtal oil well|
|zero production month|The month field cannot be 0|Check whether the `month` position in the parameter array is in the correct month format|
|month format is not YYMM|The month field format is incorrect|Check whether the `month` position in the parameter array is in the correct month format|
|zero production date|The date field cannot be 0|Check whether the `date` position in the parameter array is in the correct date format|
|date format is not YYMMDD|The date field format is incorrect|Check whether the `date` position in the parameter array is the correct date format|
|zero production amount|The production field cannot be 0|Check whether the `Asset Value` position in the parameter array is the correct production data|


 


