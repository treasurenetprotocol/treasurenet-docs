# 手动上传产量

:::info
  手动上传需要基础的区块链知识，并具有一定的代码开发、使用以及接口的查阅能力。

  更多的Demo正在不断补充中
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

随后可以在[evmexplorer.testnet.treasurenet.io](https://evmexplorer.testnet.treasurenet.io)中根据打印的blockHash或者blockNumber查询到该笔交易

#### 可能出现的错误

|浏览器错误信息|解释|处理|
|--|--|--|
|must be the producer|发送交易的账户与通过审核的油井持有者账户地址不符|检查`sender_prvi_key`与在ProducerProtal油井通过审核的账号是否一致|
|zero production month|月份字段不能为0|检查参数数组中`month`位置是否是正确的月份格式|
|month format is not YYMM|月份字段格式不正确|检查参数数组中`month`位置是否是正确的月份格式|
|zero production date|日期字段不能为0|检查参数数组中`date`位置是否是正确的日期格式|
|date format is not YYMMDD|日期字段格式不正确|检查参数数组中`date`位置是否是正确的日期格式|
|zero production amount|产量字段不能为0|检查参数数组中`Asset Value`位置是否是正确的产量数据|


 


