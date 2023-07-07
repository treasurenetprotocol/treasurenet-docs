---
sidebar_position: 1
---

# Query Balances

## treasurenetd

After installing and configuring the Treasurenet daemon, developers can use treasurenetd to query account balances using the following CLI commands:

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

- $ACCOUNT is the user account address of Treasurenet (e.g., treasurenet1 .....
- (Optional) $COUNTTOTAL is the total number of records for the balance to be queried
- (Optional) $HEIGHT is the specific height of the status to be queried
- (Optional) $OUTPUT is the output format
- $NODE is the requested RPC node This parameter can be defaulted if running with a local node

## JSON-RPC

Developers can use the `eth_getBalance` JSON-RPC method to query the account balance of a unit (ETH) on the Ethereum blockchain. Using the `curl` command to make the API call

```shell
# Request
curl -X POST --data '{"jsonrpc":"2.0","method":"eth_getBalance","params":[`$ETHADDRESS`, `$BLOCK`],"id":1}' -H "Content-Type: application/json" $NODE

# Result
{"jsonrpc":"2.0","id":1,"result":"0x36354d5575577c8000"}

```

- $ETHADDRESS is the Ethereum hexadecimal address to query for the balance. Note that Treasurenet addresses (starting with treasurenet1...) can be converted to Ethereum addresses using, for example, the js library. addresses starting with treasurenet1...) to Ethereum addresses.
- $BLOCK is the block number or block hash (e.g. "0x0"). The reason for this parameter is [EIP-1898](https://github.com/ethereum/EIPs/blob/master/EIPS/eip-1898.md)。

## gRPC

Developers can query all account balances by address using the grpcurl command line tool and AllBalances endpoints :

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
