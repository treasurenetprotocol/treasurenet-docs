# 编码

编码是指将数据从一种格式转换为另一种格式，以使其更安全和高效。在区块链的上下文中，编码用于确保数据以安全且易于访问的方式存储和传输。

递归长度前缀（RLP）是以太坊执行客户端广泛使用的序列化格式。它的目的是编码任意嵌套的二进制数据数组，并且它是以太坊中用于序列化对象的主要编码方法。RLP 只编码结构，将编码特定的原子数据类型（如字符串、整数和浮点数）留给高阶协议处理。

在以太坊中，整数必须以大端字节顺序的二进制形式表示，不能有前导零，这使得整数值为零等同于空字节数组。RLP 编码函数接受一个项目作为输入，该项目被定义为一个单字节，其值在[0x00, 0x7f]范围内，或者长度为 0-55 字节的字符串。如果字符串的长度超过 55 字节，则 RLP 编码由一个值为 0xb7（十进制 183）的单字节表示，后面是字符串长度的二进制形式的字节长度，然后是字符串的长度，最后是字符串本身。RLP 用于哈希验证，其中事务通过对事务数据的 RLP 哈希进行签名，区块通过其头部的 RLP 哈希进行标识。RLP 还用于在网络上传输数据以及某些需要对 Merkle 树数据结构进行高效编码支持的情况。以太坊执行层使用 RLP 作为主要的编码方法来序列化对象，但较新的简单序列化（SSZ）替代 RLP 成为以太坊 2.0 中新共识层的编码方式。

Cosmos Stargate 发布引入了 protobuf 作为客户端和状态序列化的主要编码格式。用于状态和客户端的所有 EVM 模块类型，如交易消息、创世块、查询服务等，将被实现为协议缓冲区（protocol buffer）消息。宇宙 SDK 也支持传统的 Amino 编码。协议缓冲区（protobuf）是一种与语言无关的二进制序列化格式，比 JSON 更小、更快。它用于序列化结构化数据，如消息，并被设计为高效且可扩展。编码格式在一个名为 Protocol Buffers Language (proto3) 的与语言无关的语言中定义，编码后的消息可用于生成多种编程语言的代码。protobuf 的主要优势在于其高效性，它导致更小的消息大小以及更快的序列化和反序列化时间。RLP 解码过程如下：根据输入数据的第一个字节（即前缀）解码数据类型、实际数据的长度和偏移量；根据数据的类型和偏移量相应地解码数据。

## 编码格式

### 协议缓冲区

Cosmos Stargate 此版本引入了 Protocol Buffers 作为客户端和状态序列化的主要编码格式。所有用于状态和客户端的以太坊虚拟机（EVM）模块类型（交易消息、创世块、查询服务等）将以协议缓冲区消息的形式实现。

### Amino

Cosmos SDK 还支持旧版氨基酸编码格式，以便与之前的版本进行向后兼容，特别适用于使用 Ledger 设备进行客户端编码和签名。Treasurenet 不在 EVM 模块中支持氨基酸编码，但对于所有其他启用它的 Cosmos SDK 模块提供支持。

### 递归长度前缀

递归长度前缀（RLP）是一种编码/解码算法，它将消息序列化，并允许对编码数据进行快速重构。Treasurenet 使用 RLP 来对以太坊消息进行编码/解码，以符合适当的以太坊格式。这使得消息能够以与以太坊完全相同的格式进行编码和解码。

x/evm 交易（MsgEthereumTx）的编码是通过将消息转换为 go-ethereum 的 Transaction，然后使用 RLP 对交易数据进行编组来执行的。

```
// TxEncoder overwrites sdk.TxEncoder to support MsgEthereumTx
func (g txConfig) TxEncoder() sdk.TxEncoder {
    return func(tx sdk.Tx) ([]byte, error) {
      msg, ok := tx.(*evmtypes.MsgEthereumTx)
      if ok {
        return msg.AsTransaction().MarshalBinary()
      }
      return g.TxConfig.TxEncoder()(tx)
    }
}

// TxDecoder overwrites sdk.TxDecoder to support MsgEthereumTx
func (g txConfig) TxDecoder() sdk.TxDecoder {
    return func(txBytes []byte) (sdk.Tx, error) {
      tx := &ethtypes.Transaction{}
      err := tx.UnmarshalBinary(txBytes)
      if err == nil {
        msg := &evmtypes.MsgEthereumTx{}
        msg.FromEthereumTx(tx)
        return msg, nil
      }
      return g.TxConfig.TxDecoder()(txBytes)
    }
}
```
