---
sidebar_position: 2
---

# JSON-RPC 方法

## 端点

| 方法                                                                                                              | 命名空间  | 已实现 | 公开 | 备注               |
| ----------------------------------------------------------------------------------------------------------------- | --------- | ------ | ---- | ------------------ |
| [web3_sha3](/docs/api/eth-json-rpc/web3-methods#web3_sha3)                                                        | Web3      | ✔      | ✔    |                    |
| [eth_protocolVersion](/docs/api/eth-json-rpc/eth-methods#eth_protocolversion)                                     | Eth       | ✔      | ✔    |                    |
| [eth_syncing](/docs/api/eth-json-rpc/eth-methods#eth_syncing)                                                     | Eth       | ✔      | ✔    |                    |
| [eth_gasPrice](/docs/api/eth-json-rpc/eth-methods#eth_gasPrice)                                                   | Eth       | ✔      | ✔    |                    |
| [eth_accounts](/docs/api/eth-json-rpc/eth-methods#eth_accounts)                                                   | Eth       | ✔      | ✔    |                    |
| [eth_blockNumber](/docs/api/eth-json-rpc/eth-methods#eth_blockNumber)                                             | Eth       | ✔      | ✔    |                    |
| [eth_getBalance](/docs/api/eth-json-rpc/eth-methods#eth_getBalance)                                               | Eth       | ✔      | ✔    |                    |
| [eth_getStorageAt](/docs/api/eth-json-rpc/eth-methods#eth_getStorageAt)                                           | Eth       | ✔      | ✔    |                    |
| [eth_getTransactionCount](/docs/api/eth-json-rpc/eth-methods#eth_getTransactionCount)                             | Eth       | ✔      | ✔    |                    |
| [eth_getBlockTransactionCountByNumber](/docs/api/eth-json-rpc/eth-methods#eth_getBlockTransactionCountByNumber)   | Eth       | ✔      | ✔    |                    |
| [eth_getBlockTransactionCountByHash](/docs/api/eth-json-rpc/eth-methods#eth_getBlockTransactionCountByHash)       | Eth       | ✔      | ✔    |                    |
| [eth_getCode](/docs/api/eth-json-rpc/eth-methods#eth_getCode)                                                     | Eth       | ✔      | ✔    |                    |
| [eth_sign](/docs/api/eth-json-rpc/eth-methods#eth_sign)                                                           | Eth       | ✔      | ✔    |                    |
| [eth_sendTransaction](/docs/api/eth-json-rpc/eth-methods#eth_sendTransaction)                                     | Eth       | ✔      | ✔    |                    |
| [eth_sendRawTransaction](/docs/api/eth-json-rpc/eth-methods#eth_sendRawTransaction)                               | Eth       | ✔      | ✔    |                    |
| [eth_call](/docs/api/eth-json-rpc/eth-methods#eth_call)                                                           | Eth       | ✔      | ✔    |                    |
| [eth_estimateGas](/docs/api/eth-json-rpc/eth-methods#eth_estimateGas)                                             | Eth       | ✔      | ✔    |                    |
| [eth_getBlockByNumber](/docs/api/eth-json-rpc/eth-methods#eth_getBlockByNumber)                                   | Eth       | ✔      | ✔    |                    |
| [eth_getBlockByHash](/docs/api/eth-json-rpc/eth-methods#eth_getBlockByHash)                                       | Eth       | ✔      | ✔    |                    |
| [eth_getTransactionByHash](/docs/api/eth-json-rpc/eth-methods#eth_getTransactionByHash)                           | Eth       | ✔      | ✔    |                    |
| [eth_getTransactionByBlockHashAndIndex](/docs/api/eth-json-rpc/eth-methods#eth_getTransactionByBlockHashAndIndex) | Eth       | ✔      | ✔    |                    |
| [eth_getTransactionReceipt](/docs/api/eth-json-rpc/eth-methods#eth_getTransactionReceipt)                         | Eth       | ✔      | ✔    |                    |
| [eth_newFilter](/docs/api/eth-json-rpc/eth-methods#eth_newFilter)                                                 | Eth       | ✔      | ✔    |                    |
| [eth_newBlockFilter](/docs/api/eth-json-rpc/eth-methods#eth_newBlockFilter)                                       | Eth       | ✔      | ✔    |                    |
| [eth_newPendingTransactionFilter](/docs/api/eth-json-rpc/eth-methods#eth_newPendingTransactionFilter)             | Eth       | ✔      | ✔    |                    |
| [eth_uninstallFilter](/docs/api/eth-json-rpc/eth-methods#eth_uninstallFilter)                                     | Eth       | ✔      | ✔    |                    |
| [eth_getFilterChanges](/docs/api/eth-json-rpc/eth-methods#eth_getFilterChanges)                                   | Eth       | ✔      | ✔    |                    |
| [eth_getFilterLogs](/docs/api/eth-json-rpc/eth-methods#eth_getFilterLogs)                                         | Eth       | ✔      | ✔    |                    |
| [eth_getLogs](/docs/api/eth-json-rpc/eth-methods#eth_getLogs)                                                     | Eth       | ✔      | ✔    |                    |
| [eth_coinbase](/docs/api/eth-json-rpc/eth-methods#eth_coinbase)                                                   | Eth       | ✔      |      |                    |
| [eth_getProof](/docs/api/eth-json-rpc/eth-methods#eth_getProof)                                                   | Eth       | ✔      |      |                    |
| [eth_subscribe](/docs/api/eth-json-rpc/websocket-methods#eth_subscribe)                                           | Websocket | ✔      |      |                    |
| [eth_unsubscribe](/docs/api/eth-json-rpc/websocket-methods#eth_subscribe)                                         | Websocket | ✔      |      |                    |
| [personal_importRawKey](/docs/api/eth-json-rpc/personal-methods#personal_importRawKey)                            | Personal  | ✔      | ❌   |                    |
| [personal_listAccounts](/docs/api/eth-json-rpc/personal-methods#personal_listAccounts)                            | Personal  | ✔      | ❌   |                    |
| [personal_lockAccount](/docs/api/eth-json-rpc/personal-methods#personal_lockAccount)                              | Personal  | ✔      | ❌   |                    |
| [personal_newAccount](/docs/api/eth-json-rpc/personal-methods#personal_newAccount)                                | Personal  | ✔      | ❌   |                    |
| [personal_unlockAccount](/docs/api/eth-json-rpc/personal-methods#personal_unlockAccount)                          | Personal  | ✔      | ❌   |                    |
| [personal_sendTransaction](/docs/api/eth-json-rpc/personal-methods#personal_sendTransaction)                      | Personal  | ✔      | ❌   |                    |
| [personal_sign](/docs/api/eth-json-rpc/personal-methods#personal_sign)                                            | Personal  | ✔      | ❌   |                    |
| [personal_ecRecover](/docs/api/eth-json-rpc/personal-methods#personal_ecRecover)                                  | Personal  | ✔      | ❌   |                    |
| [personal_initializeWallet](/docs/api/eth-json-rpc/personal-methods#personal_initializeWallet)                    | Personal  | ✔      | ❌   |                    |
| [personal_unpair](/docs/api/eth-json-rpc/personal-methods#personal_unpair)                                        | Personal  | ✔      | ❌   |                    |
| [debug_traceBlock](/docs/api/eth-json-rpc/debug-methods#debug_traceBlock)                                         | Debug     | ✔      |      |                    |
| [debug_traceBlockByNumber](/docs/api/eth-json-rpc/debug-methods#debug_traceBlockByNumber)                         | Debug     | ✔      |      |                    |
| [debug_traceBlockByHash](/docs/api/eth-json-rpc/debug-methods#debug_traceBlockByHash)                             | Debug     | ✔      |      |                    |
| [debug_traceTransaction](/docs/api/eth-json-rpc/debug-methods#debug_traceTransaction)                             | Debug     | ✔      |      |                    |
| [miner_getHashrate](/docs/api/eth-json-rpc/miner-methods#miner_getHashrate)                                       | Miner     | ✔      | ❌   | No-op              |
| [miner_setExtra](/docs/api/eth-json-rpc/miner-methods#miner_setExtra)                                             | Miner     | ✔      | ❌   | No-op              |
| [miner_setGasPrice](/docs/api/eth-json-rpc/miner-methods#miner_setGasPrice)                                       | Miner     | ✔      | ❌   | Needs node restart |
| [miner_start](/docs/api/eth-json-rpc/miner-methods#miner_start)                                                   | Miner     | ✔      | ❌   | No-op              |
| [miner_stop](/docs/api/eth-json-rpc/miner-methods#miner_stop)                                                     | Miner     | ✔      | ❌   | No-op              |
| [miner_setGasLimit](/docs/api/eth-json-rpc/miner-methods#miner_setGasLimit)                                       | Miner     | ✔      | ❌   | No-op              |
| [miner_setEtherbase](/docs/api/eth-json-rpc/miner-methods#miner_setEtherbase)                                     | Miner     | ✔      | ❌   |                    |
| [txpool_content](/docs/api/eth-json-rpc/txpool-methods#txpool_content)                                            | TxPool    | ✔      |      |                    |
| [txpool_inspect](/docs/api/eth-json-rpc/txpool-methods#txpool_inspect)                                            | TxPool    | ✔      |      |                    |
| [txpool_status](/docs/api/eth-json-rpc/txpool-methods#txpool_status)                                              | TxPool    | ✔      |      |                    |
