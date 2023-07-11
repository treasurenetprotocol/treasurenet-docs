---
sidebar_position: 1
---

# Web3 Methods

## web3_sha3

Returns Keccak-256 (not the standardized SHA3-256) of the given data.

#### Parameters (1)
1: input hexutil.Bytes  --Required

#### Result

```json

{"jsonrpc":"2.0","id":1,"result":"0x1b84adea42d5b7d192fd8a61a85b25abe0757e9a65cab1da470258914053823f"}

```

#### Client Examples

HTTP:
```shell
curl -X POST -H "Content-Type: application/json" http://localhost:8545 --data '{"jsonrpc": "2.0", "id": 42, "method": "web3_sha3", "params": [<input>]}'
```

Websocket:
```shell
wscat -c ws://localhost:8546 -x '{"jsonrpc": "2.0", "id": 1, "method": "web3_sha3", "params": [<input>]}'
```

Nodejs:
```javascript
web3.sha3(input);
```
