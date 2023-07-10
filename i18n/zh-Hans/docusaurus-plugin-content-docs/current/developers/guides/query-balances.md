---
sidebar_position: 1
---

# 余额查询

## treasurenetd

安装和配置 Treasurenet 守护程序后，开发人员可以使用 `treasurenetd` 使用以下 CLI 命令查询帐户余额：

```shell
$ treasurenetd query bank balances $ACCOUNT --count-total=$COUNTTOTAL --height=$HEIGHT --output=$OUTPUT --node=$NODE
balances:
- amount: "1000000000000000000"
  denom: aunit
- amount: "100000"
  denom: ibc/ED07A3391A112B175915CD8FAF43A2DA8E4790EDE12566649D0C2F97716B8518
pagination:
  next_key: null
  total: "0"
```

- $ACCOUNT 是 Treasurenet 的用户账户地址 （例如：treasurenet1.....)
- (可选) $COUNTTOTAL 要查询的余额的记录总数
- (可选) $HEIGHT 是要查询状态的特定高度
- (可选) $OUTPUT 是输出格式
- $NODE 是请求的 RPC 节点 如果运行有本地节点则可以缺省此参数

## JSON-RPC

开发者可以结合 [curl](https://curl.se/) 使用 [eth_getBalance](https://) JSON-RPC 方法查询 aunit 的账户余额

```shell
# Request
curl -X POST --data '{"jsonrpc":"2.0","method":"eth_getBalance","params":[`$ETHADDRESS`, `$BLOCK`],"id":1}' -H "Content-Type: application/json" $NODE

# Result
{"jsonrpc":"2.0","id":1,"result":"0x36354d5575577c8000"}

```

- $ETHADDRESS 是要查询余额的 Ethereum 十六进制地址。 请注意，可以使用 js library 等将 Treasurenet 地址（以 treasurenet1... 开头的地址）转换为 Ethereum 地址。
- $BLOCK 是块号或块哈希（例如“0x0”）。 此参数的原因是 [EIP-1898](https://github.com/ethereum/EIPs/blob/master/EIPS/eip-1898.md)。

## gRPC

开发人员可以使用 [grpcurl](https://) 和 AllBalances 端点按地址查询所有的账户余额：

```shell
# Request
grpcurl $OUTPUT -d '{"address":`$ACCOUNT`}' $NODE cosmos.bank.v1beta1.Query/AllBalances

# Result
{
  "balances": [
    {
      "denom": "stake",
      "amount": "1000000000"
    }
  ],
  "pagination": {
    "total": "1"
  }
}
```
