# 多重签名

学习如何使用密钥环多签名生成、签名和广播交易。

多签名账户是一种拥有特殊密钥的 Treasurenet 账户，可以要求多个签名来签署交易。
这可以用于增加账户的安全性，或者要求多个参与方的同意来进行交易。可以通过指定以下内容来创建多签名账户：

- 所需签名的阈值数量
- 参与签名的公钥

要使用多签名账户进行签名，交易必须由账户指定的不同密钥单独签名。然后，这些签名将合并成一个多重签名，用于签署交易。如果缺少所需阈值数量的签名，结果的多重签名将被视为无效。

## 生成多重签名密钥

```shell
treasurenetd keys add --multisig=name1,name2,name3[...] --multisig-threshold=K new_key_name
```

`K` 是必须签署携带公钥地址的交易的最少私钥数量。

`--multisig` 标志必须包含将组合成新的公钥并存储在本地数据库中的公钥的名称。通过 --multisig 提供的所有名称必须已经存在于本地数据库中。

除非设置了 `--nosort` 标志，否则在命令行中提供键的顺序不重要，即以下命令生成两个相同的键：

```shell
treasurenetd keys add --multisig=p1,p2,p3 --multisig-threshold=2 multisig_address
treasurenetd keys add --multisig=p2,p3,p1 --multisig-threshold=2 multisig_address
```

多重签名地址也可以通过 which 命令动态生成并打印：

```shell
treasurenetd keys show --multisig-threshold=K name1 name2 name3 [...]
```

## 签署一笔交易

### 步骤 1：创建多签名密钥

让我们假设你有 test1 和 test2，想要与 test3 创建一个多签账户。

首先，将 test3 的公钥导入你的密钥环中。

```shell
treasurenetd keys add \
test3 \
--pubkey=treasurenetpub1addwnpepqgcxazmq6wgt2j4rdfumsfwla0zfk8e5sws3p3zg5dkm9007hmfysxas0u2
```

生成 2/3 阈值的多签密钥。

```shell
treasurenetd keys add \
multi \
--multisig=test1,test2,test3 \
--multisig-threshold=2
```

你可以看到它的地址和详细信息：

```shell
treasurenetd keys show multi
- name: multi
  type: multi
  address: treasurenet1e0fx0q9meawrcq7fmma9x60gk35lpr4xk3884m
  pubkey: treasurenetpub1ytql0csgqgfzd666axrjzq3mxw59ys6yqcd3ydjvhgs0uzs6kdk5fp4t73gmkl8t6y02yfq7tvfzd666axrjzq3sd69kp5usk492x6nehqjal67ynv0nfqapzrzy3gmdk27la0kjfqfzd666axrjzq6utqt639ka2j3xkncgk65dup06t297ccljmxhvhu3rmk92u3afjuyz9dg9
  mnemonic: ""
  threshold: 0
  pubkeys: []

```

让我们向多重签名钱包添加 10 个单位：

```shell
treasurenetd tx bank send \
test1 \
treasurenet1e0fx0q9meawrcq7fmma9x60gk35lpr4xk3884m \
10000000000000000000aunit \
--chain-id=treasurenet_5005-1 \
--gas=auto \
--fees=1000000aunit \
--broadcast-mode=block
```

### 步骤 2：创建多签交易

我们想从我们的多签账户向 treasurenet1rgjxswhuxhcrhmyxlval0qa70vxwvqn2e0srft 发送 5 个 UNIT。

```shell
treasurenetd tx bank send \
treasurenet1rgjxswhuxhcrhmyxlval0qa70vxwvqn2e0srft \
treasurenet157g6rn6t6k5rl0dl57zha2wx72t633axqyvvwq \
5000000000000000000aunit \
--gas=200000 \
--fees=1000000aunit \
--chain-id=treasurenet_5005-1 \
--generate-only > unsignedTx.json
```

文件 `unsignedTx.json` 包含以 JSON 编码的未签名交易。

```json
{
  "body": {
    "messages": [
      {
        "@type": "/cosmos.bank.v1beta1.MsgSend",
        "from_address": "treasurenet1rgjxswhuxhcrhmyxlval0qa70vxwvqn2e0srft",
        "to_address": "treasurenet157g6rn6t6k5rl0dl57zha2wx72t633axqyvvwq",
        "amount": [
          {
            "denom": "aunit",
            "amount": "5000000000000000000"
          }
        ]
      }
    ],
    "memo": "",
    "timeout_height": "0",
    "extension_options": [],
    "non_critical_extension_options": []
  },
  "auth_info": {
    "signer_infos": [],
    "fee": {
      "amount": [
        {
          "denom": "aunit",
          "amount": "1000000"
        }
      ],
      "gas_limit": "200000",
      "payer": "",
      "granter": ""
    }
  },
  "signatures": []
}
```

### 步骤 3：分别签名

使用 test1 和 test2 进行签名，并创建个别签名。

```shell
treasurenetd tx sign \
unsignedTx.json \
--multisig=treasurenet1e0fx0q9meawrcq7fmma9x60gk35lpr4xk3884m \
--from=test1 \
--output-document=test1sig.json \
--chain-id=treasurenet_5005-1
```

```shell
treasurenetd tx sign \
unsignedTx.json \
--multisig=treasurenet1e0fx0q9meawrcq7fmma9x60gk35lpr4xk3884m \
--from=test2 \
--output-document=test2sig.json \
--chain-id=treasurenet_5005-1
```

### 第四步：创建多签名

将签名组合以签署交易。

```shell
treasurenetd tx multisign \
unsignedTx.json \
multi \
test1sig.json test2sig.json \
--output-document=signedTx.json \
--chain-id=treasurenet_5005-1
```

交易现已签署:

```json
{
  "body": {
    "messages": [
      {
        "@type": "/cosmos.bank.v1beta1.MsgSend",
        "from_address": "treasurenet1rgjxswhuxhcrhmyxlval0qa70vxwvqn2e0srft",
        "to_address": "treasurenet157g6rn6t6k5rl0dl57zha2wx72t633axqyvvwq",
        "amount": [
          {
            "denom": "aunit",
            "amount": "5000000000000000000"
          }
        ]
      }
    ],
    "memo": "",
    "timeout_height": "0",
    "extension_options": [],
    "non_critical_extension_options": []
  },
  "auth_info": {
    "signer_infos": [
      {
        "public_key": {
          "@type": "/cosmos.crypto.multisig.LegacyAminoPubKey",
          "threshold": 2,
          "public_keys": [
            {
              "@type": "/cosmos.crypto.secp256k1.PubKey",
              "key": "ApCzSG8k7Tr4aM6e4OJRExN7cNtvH21L9azbh+uRrvt4"
            },
            {
              "@type": "/cosmos.crypto.secp256k1.PubKey",
              "key": "Ah91erz8ChNanqLe9ea948rvAiXMCRlR5Ka7EE/c0xUK"
            },
            {
              "@type": "/cosmos.crypto.secp256k1.PubKey",
              "key": "A0OjtIUCFJM3AobJ9HJTWKP9RZV2+WPcwVjLgsAidrZ/"
            }
          ]
        },
        "mode_info": {
          "multi": {
            "bitarray": {
              "extra_bits_stored": 3,
              "elems": "wA=="
            },
            "mode_infos": [
              {
                "single": {
                  "mode": "SIGN_MODE_LEGACY_AMINO_JSON"
                }
              },
              {
                "single": {
                  "mode": "SIGN_MODE_LEGACY_AMINO_JSON"
                }
              }
            ]
          }
        },
        "sequence": "1"
      }
    ],
    "fee": {
      "amount": [
        {
          "denom": "aunit",
          "amount": "1000000"
        }
      ],
      "gas_limit": "200000",
      "payer": "",
      "granter": ""
    }
  },
  "signatures": [
    "CkCEeIbeGc+I1ipZuhp/0KhVNnWAv2tTlvgo5x61lzk1KHmLPV38m/YFurrFt5cm5+fqIXrn+FlOjrJuzBhw8ogYCkCawm9mpXsBHk0CFsE5618fVnvScEkfrzW0c2jCcjqV8EPuj3ut74UWzZyQkwtJGxUWtro9EgnGsB7Di1Gzizst"
  ]
}
```

### 步骤 5: 广播交易

```shell
treasurenetd tx broadcast signedTx.json \
--chain-id=treasurenet_5005-1 \
--broadcast-mode=block
```
