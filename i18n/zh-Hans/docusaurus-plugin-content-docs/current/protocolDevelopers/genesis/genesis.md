---
sidebar_position: 1
---

# Genesis.json 文件

该 genesis.json 文件位于数据目录(default `"/root/.treasurenetd"`)。在标准的 tendermint 创世纪格式之上，我们定制了我们自己的创世文件，其中包含不同的模块并促进了 treasurenet 链的特殊功能。

## 创世纪文件配置

具体来说，创世文件包括以下字段：

```json
{
  "genesis_time": "2023-02-02T10:48:47.611931848Z",
  "chain_id": "treasurenet_5005-1",
  "initial_height": "1",
  "consensus_params": {
    "block": {
      "max_bytes": "22020096",
      "max_gas": "10000000",
      "time_iota_ms": "1000"
    },
    "evidence": {
      "max_age_num_blocks": "100000",
      "max_age_duration": "172800000000000",
      "max_bytes": "1048576"
    },
    "validator": {
      "pub_key_types": ["ed25519"]
    },
    "version": {}
  },
  "app_hash": "",
  "app_state": {
    "auth": {
      "params": {
        "max_memo_characters": "256",
        "tx_sig_limit": "7",
        "tx_size_cost_per_byte": "10",
        "sig_verify_cost_ed25519": "590",
        "sig_verify_cost_secp256k1": "1000"
      },
      "accounts": [
        {
          "@type": "/treasurenet.types.v1.EthAccount",
          "base_account": {
            "address": "treasurenet1wf78qmzhfsjndy3v6wsdxjfqnmwnyy2grwxmrg",
            "pub_key": null,
            "account_number": "0",
            "sequence": "0"
          },
          "code_hash": "0xc5d2460186f7233c927e7db2dcc703c0e500b653ca82273b7bfad8045d85a470"
        },
        {
          "@type": "/treasurenet.types.v1.EthAccount",
          "base_account": {
            "address": "treasurenet1tpkgljjswp6j8pr2e88lmgled0fnlhncrn5cje",
            "pub_key": null,
            "account_number": "0",
            "sequence": "0"
          },
          "code_hash": "0xc5d2460186f7233c927e7db2dcc703c0e500b653ca82273b7bfad8045d85a470"
        }
      ]
    },
    "authz": {
      "authorization": []
    },
    "bank": {
      "params": {
        "send_enabled": [],
        "default_send_enabled": true
      },
      "balances": [
        {
          "address": "treasurenet1tpkgljjswp6j8pr2e88lmgled0fnlhncrn5cje",
          "coins": [
            {
              "denom": "aunit",
              "amount": "100000000000000000000000000"
            },
            {
              "denom": "footoken",
              "amount": "10000000000"
            },
            {
              "denom": "footoken2",
              "amount": "10000000000"
            },
            {
              "denom": "ibc/nometadatatoken",
              "amount": "10000000000"
            },
            {
              "denom": "stake",
              "amount": "10000000000"
            }
          ]
        },
        {
          "address": "treasurenet1wf78qmzhfsjndy3v6wsdxjfqnmwnyy2grwxmrg",
          "coins": [
            {
              "denom": "aunit",
              "amount": "100000000000000000000000000"
            },
            {
              "denom": "footoken",
              "amount": "10000000000"
            },
            {
              "denom": "footoken2",
              "amount": "10000000000"
            },
            {
              "denom": "ibc/nometadatatoken",
              "amount": "10000000000"
            },
            {
              "denom": "stake",
              "amount": "10000000000"
            }
          ]
        }
      ],
      "supply": [
        {
          "denom": "aunit",
          "amount": "200000000000000000000000000"
        },
        {
          "denom": "footoken",
          "amount": "20000000000"
        },
        {
          "denom": "footoken2",
          "amount": "20000000000"
        },
        {
          "denom": "ibc/nometadatatoken",
          "amount": "20000000000"
        },
        {
          "denom": "stake",
          "amount": "20000000000"
        }
      ],
      "denom_metadata": [
        {
          "description": "A non-staking test token",
          "denom_units": [
            {
              "denom": "footoken",
              "exponent": 0,
              "aliases": []
            },
            {
              "denom": "mfootoken",
              "exponent": 6,
              "aliases": []
            }
          ],
          "base": "footoken",
          "display": "mfootoken",
          "name": "Foo Token",
          "symbol": "FOO"
        },
        {
          "description": "A staking test token",
          "denom_units": [
            {
              "denom": "aunit",
              "exponent": 0,
              "aliases": []
            },
            {
              "denom": "unit",
              "exponent": 18,
              "aliases": []
            }
          ],
          "base": "aunit",
          "display": "unit",
          "name": "Stake Token",
          "symbol": "STEAK"
        },
        {
          "description": "A second non-staking test token",
          "denom_units": [
            {
              "denom": "footoken2",
              "exponent": 0,
              "aliases": []
            },
            {
              "denom": "mfootoken2",
              "exponent": 6,
              "aliases": []
            }
          ],
          "base": "footoken2",
          "display": "mfootoken2",
          "name": "Foo Token2",
          "symbol": "F20"
        }
      ]
    },
    "bech32ibc": {
      "nativeHRP": "treasurenet",
      "hrpIBCRecords": []
    },
    "capability": {
      "index": "1",
      "owners": []
    },
    "crisis": {
      "constant_fee": {
        "denom": "aunit",
        "amount": "1000"
      }
    },
    "distribution": {
      "params": {
        "community_tax": "0.010000000000000000",
        "base_proposer_reward": "0.010000000000000000",
        "bonus_proposer_reward": "0.040000000000000000",
        "tat_reward": "0.800000000000000000",
        "withdraw_addr_enabled": true
      },
      "fee_pool": {
        "community_pool": []
      },
      "delegator_withdraw_infos": [],
      "previous_proposer": "",
      "outstanding_rewards": [],
      "validator_accumulated_commissions": [],
      "validator_historical_rewards": [],
      "validator_current_rewards": [],
      "delegator_starting_infos": [],
      "validator_slash_events": []
    },
    "evidence": {
      "evidence": []
    },
    "evm": {
      "accounts": [],
      "params": {
        "evm_denom": "aunit",
        "enable_create": true,
        "enable_call": true,
        "extra_eips": [],
        "chain_config": {
          "homestead_block": "0",
          "dao_fork_block": "0",
          "dao_fork_support": true,
          "eip150_block": "0",
          "eip150_hash": "0x0000000000000000000000000000000000000000000000000000000000000000",
          "eip155_block": "0",
          "eip158_block": "0",
          "byzantium_block": "0",
          "constantinople_block": "0",
          "petersburg_block": "0",
          "istanbul_block": "0",
          "muir_glacier_block": "0",
          "berlin_block": "0",
          "london_block": "0",
          "arrow_glacier_block": "0",
          "gray_glacier_block": "0",
          "merge_netsplit_block": "0"
        },
        "allow_unprotected_txs": false
      }
    },
    "feegrant": {
      "allowances": []
    },
    "feemarket": {
      "params": {
        "no_base_fee": false,
        "base_fee_change_denominator": 8,
        "elasticity_multiplier": 2,
        "enable_height": "0",
        "base_fee": "1000000000",
        "min_gas_price": "0.000000000000000000",
        "min_gas_multiplier": "0.500000000000000000"
      },
      "block_gas": "0"
    },
    "genutil": {
      "gen_txs": [
        {
          "body": {
            "messages": [
              {
                "@type": "/cosmos.staking.v1beta1.MsgCreateValidator",
                "description": {
                  "moniker": "localtestnet",
                  "identity": "",
                  "website": "",
                  "security_contact": "",
                  "details": ""
                },
                "commission": {
                  "rate": "0.100000000000000000",
                  "max_rate": "0.200000000000000000",
                  "max_change_rate": "0.010000000000000000"
                },
                "min_self_delegation": "158000000000000000000",
                "delegator_address": "treasurenet1wf78qmzhfsjndy3v6wsdxjfqnmwnyy2grwxmrg",
                "validator_address": "treasurenetvaloper1wf78qmzhfsjndy3v6wsdxjfqnmwnyy2gzs46zq",
                "pubkey": {
                  "@type": "/cosmos.crypto.ed25519.PubKey",
                  "key": "dGvx6FL1zdjKsmzZ7R/2EBfCgJcsneP0rUpMkxs9Si8="
                },
                "value": {
                  "denom": "aunit",
                  "amount": "258000000000000000000"
                }
              },
              {
                "@type": "/gravity.v1.MsgSetOrchestratorAddress",
                "validator": "treasurenetvaloper1wf78qmzhfsjndy3v6wsdxjfqnmwnyy2gzs46zq",
                "orchestrator": "treasurenet1tpkgljjswp6j8pr2e88lmgled0fnlhncrn5cje",
                "eth_address": "0x89264C1D176B372FBde0188c4645e0E8a4CD8d79"
              }
            ],
            "memo": "f5aff6fc4837935c0d8188e2c0044ffd4ece06d3@192.168.0.60:26656",
            "timeout_height": "0",
            "extension_options": [],
            "non_critical_extension_options": []
          },
          "auth_info": {
            "signer_infos": [
              {
                "public_key": {
                  "@type": "/treasurenet.crypto.v1.ethsecp256k1.PubKey",
                  "key": "AzaTWMVN4SlZq9C+fsI0aQzQuQ+HV5+I1mHW7LwjjWhO"
                },
                "mode_info": {
                  "single": {
                    "mode": "SIGN_MODE_DIRECT"
                  }
                },
                "sequence": "0"
              }
            ],
            "fee": {
              "amount": [],
              "gas_limit": "200000",
              "payer": "",
              "granter": ""
            }
          },
          "signatures": [
            "z6BPflcCKQ6/3oDQ7zvvjg1jLqLF0Q8OkeO/66Z7CSR79A1AGpy7LKD7XrK+ErTqjJOv71aT2LZq37MKXBdMlAA="
          ]
        }
      ]
    },
    "gov": {
      "starting_proposal_id": "1",
      "deposits": [],
      "votes": [],
      "proposals": [],
      "deposit_params": {
        "min_deposit": [
          {
            "denom": "aunit",
            "amount": "10000000"
          }
        ],
        "max_deposit_period": "172800s"
      },
      "voting_params": {
        "voting_period": "172800s"
      },
      "tally_params": {
        "quorum": "0.334000000000000000",
        "threshold": "0.500000000000000000",
        "veto_threshold": "0.334000000000000000"
      }
    },
    "gravity": {
      "params": {
        "gravity_id": "defaultgravityid",
        "contract_source_hash": "",
        "bridge_ethereum_address": "0x0000000000000000000000000000000000000000",
        "bridge_chain_id": "0",
        "signed_valsets_window": "20000000",
        "signed_batches_window": "10000000",
        "signed_logic_calls_window": "10000000",
        "target_batch_timeout": "43200000",
        "average_block_time": "5000",
        "average_ethereum_block_time": "15000",
        "slash_fraction_valset": "0.001000000000000000",
        "slash_fraction_batch": "0.001000000000000000",
        "slash_fraction_logic_call": "0.001000000000000000",
        "unbond_slashing_valsets_window": "10000000",
        "slash_fraction_bad_eth_signature": "0.001000000000000000",
        "valset_reward": {
          "denom": "",
          "amount": "0"
        },
        "bridge_active": true,
        "ethereum_blacklist": []
      },
      "gravity_nonces": {
        "latest_valset_nonce": "0",
        "last_observed_nonce": "0",
        "last_slashed_valset_nonce": "0",
        "last_slashed_batch_block": "0",
        "last_slashed_logic_call_block": "0",
        "last_tx_pool_id": "0",
        "last_batch_id": "0"
      },
      "valsets": [],
      "valset_confirms": [],
      "batches": [],
      "batch_confirms": [],
      "logic_calls": [],
      "logic_call_confirms": [],
      "attestations": [],
      "delegate_keys": [],
      "erc20_to_denoms": [],
      "unbatched_transfers": []
    },
    "ibc": {
      "client_genesis": {
        "clients": [],
        "clients_consensus": [],
        "clients_metadata": [],
        "params": {
          "allowed_clients": ["06-solomachine", "07-tendermint"]
        },
        "create_localhost": false,
        "next_client_sequence": "0"
      },
      "connection_genesis": {
        "connections": [],
        "client_connection_paths": [],
        "next_connection_sequence": "0",
        "params": {
          "max_expected_time_per_block": "30000000000"
        }
      },
      "channel_genesis": {
        "channels": [],
        "acknowledgements": [],
        "commitments": [],
        "receipts": [],
        "send_sequences": [],
        "recv_sequences": [],
        "ack_sequences": [],
        "next_channel_sequence": "0"
      }
    },
    "mint": {
      "minter": {
        "inflation": "0.130000000000000000",
        "annual_provisions": "0.000000000000000000",
        "tatprobability": "0.010000000000000000",
        "newannual_provisions": "0.000000000000000000",
        "unitgrant": "0.000000000000000000"
      },
      "params": {
        "mint_denom": "aunit",
        "inflation_rate_change": "0.130000000000000000",
        "inflation_max": "0.200000000000000000",
        "inflation_min": "0.070000000000000000",
        "goal_bonded": "0.670000000000000000",
        "pro_bability": "1.000000000000000000",
        "unit_grant": "0",
        "blocks_per_year": "6311520",
        "start_block": "1",
        "end_block": "1",
        "height_block": "12",
        "per_reward": "5000000000000000000"
      }
    },
    "params": null,
    "slashing": {
      "params": {
        "signed_blocks_window": "100",
        "min_signed_per_window": "0.500000000000000000",
        "downtime_jail_duration": "600s",
        "slash_fraction_double_sign": "0.050000000000000000",
        "slash_fraction_downtime": "0.010000000000000000"
      },
      "signing_infos": [],
      "missed_blocks": []
    },
    "staking": {
      "params": {
        "unbonding_time": "5s",
        "max_validators": 400,
        "max_entries": 100,
        "historical_entries": 10000,
        "bond_denom": "aunit",
        "tat_tokens": "1"
      },
      "last_total_power": "0",
      "last_validator_powers": [],
      "validators": [],
      "delegations": [],
      "unbonding_delegations": [],
      "redelegations": [],
      "exported": false,
      "last_tat_total_power": "0"
    },
    "transfer": {
      "port_id": "transfer",
      "denom_traces": [],
      "params": {
        "send_enabled": true,
        "receive_enabled": true
      }
    },
    "upgrade": {},
    "vesting": {}
  }
}
```

## 介绍

- "genesis_time": 区块链开始的时间。
- "genutil"：用于使用的各种创世实用程序功能，包括创世交易创建（gentx）和创世文件验证命令以及 Tendermint 相关初始化。
- "ibc"：跨不同链的区块链间通信。
- "chain_id"：区块链的唯一标识符。有关更多详细信息，请参阅此。
- "initial_height": 区块链的初始高度。
- "consensus_params: 创世文件中定义的共识参数。
  - "block":
  * "max_bytes"：块的最大大小（以字节为单位）。
  * "max_gas"：每个区块的 gas limit，默认值为“-1”，即不强制执行有关 gas 的规则。
  * "time_iota_ms"：连续块之间的最小时间增量，以毫秒为单位。
  - "evidence"：使用证据反应器进行证据存储处理和区块提议检测。
  * "max_age_num_blocks":该字段将被弃用。
  * "max_age_duration": 证据的最大年龄。任何早于此的证据都将被拒绝。
  * "max_num"：证据的最大年龄（块数）。
  - "validator":
  * "pub_key_types": 支持的验证器公钥类型。
- "app_hash"：创世块中定义的初始应用程序状态。
- "auth"
  - "params": 创世文件中定义的 auth 模块的参数。
  * "max_memo_characters": 交易备忘录中的最大字符数。
  * "tx_sig_limit"：交易的最大签名者数量。
  * "tx_size_cost_per_byte"：交易每字节消耗的气体量。
  * "sig_verify_cost_ed25519"edd2519:签名验证的 Gas 成本。
  * "sig_verify_cost_secp256k1"secp256k1:签名验证的 Gas 成本。
  - "accounts"：创世账户，它定义了代币的初始分配。
  * "@type"： 帐户类型。
  * "address": 创世账户的地址。
  * "pub_key"：创世账户的公钥。
  * "account_number"：状态下账户的账号。
  * "sequence"：用于统计该账户发送的交易数量。每次将事务包含在块中时它都会递增，并用于防止重放攻击。
  * "base_vesting_account":
  * "original_vesting"：特殊类型的记账，代币需要归属一段时间才能转移。代币可以在归属期内被委托。
  * "denom"：令牌的面额。
  * "amount"：归属账户中的总金额。
  * "delegated_free"：授予后可以转让的委托代币数量。
  * "delegated_vesting"：仍在授予中的委托代币数量。
  * "endtime": 归属结束时间。
- "bank"bank 模块处理令牌。
  - "params"：创世文件中定义的银行模块的参数。
  * "send_enabled": 创世纪中的传输能力。
  * "default_send_enabled"：“send_enabled”值的默认值控制发送传输能力。
- "distribution"：处理分配块逻辑和向验证者和委托者收费的模块。
  - "delegator_starting_infos":
  - "delegator_withdraw_infos": 委托人提币地址列表。
  - "fee_pool":
  * "community_pool"：在社区池中分配资金（如果有）。
  - "outstanding_rewards"：未领取的奖励，如果有的话。
  - "params": 创世文件中定义的分发模块的参数。
  * "base_proposer_reward"：基于有效区块中收取的交易费用的基本奖金。
  * "bonus_proposer_reward"：在有效区块中收取的交易费用的最大奖金。
  * "community_tax": 社区税率。
  * "withdraw_addr_enabled"：委托人是否可以设置不同地址提取奖励。
  - "previous_proposer": 前一个区块的提议者，如果有的话。
  - "validator_accumulated_commissions"：未收取的验证者佣金，如果有的话。
  - "validator_current_rewards"：与验证者当前奖励相关的信息（如果有）。
  - "validator_historical_rewards"：与验证者的历史奖励相关的信息（如果有）。
  - "validator_slash_events"：与验证者历史削减事件相关的信息（如果有）。
- "gov": 治理模块。
  - "deposit_params"：治理提案所需保证金参数。
  * "max_deposit_period"：治理提案的最长存放期限。
  * "min_deposit"：治理提案所需的最低保证金。
  - "deposits"：每个提案 ID 的存款列表，如果有的话。
  - "proposals"：提案清单，如果有的话。
  - "starting_proposal_id": 初始提案 id，从"1"
  - "tally_params"：理货参数。
  * "quorum"：需要投票才能使结果有效的绑定质押代币的最小百分比。
  * "threshold"YES: 使结果有效所需的最小投票百分比。
  * "veto_threshold"NO_WITH_VETO：结果有效的最大票数百分比。
  - "votes"：每个提案 ID 的投票列表（如果有）。
  - "voting_params"：投票参数。
  * "voting_period": 治理提案的投票期。
- "mint": 用于令牌铸造的铸造模块。
  - "minter":
  * "annual_provisions"：年度预期拨备（在创世纪中设置为零）。
  * "inflation"：目标年通货膨胀率，每周复利。
  - "params":创世文件中定义的 mint 模块的参数。
  * "blocks_per_year"：预计每年生产的区块数量。
  * "goal_bonded"：以百分比表示的目标绑定令牌。
  * "inflation_max": 最大通货膨胀率。
  * "inflation_min": 最低通货膨胀率。
  * "inflation_rate_change": 通货膨胀率的最大年度变化。
  * "mint_denom"：正在铸造的令牌类型。
- "slashing": 罚没模块，用于惩罚验证者的不当行为。
  - "missed_blocks"：与验证者错过的区块相关的信息，如果有的话。
  - "params": 创世文件中定义的 slashing 模块的参数。
  * "downtime_jail_duration"：低可用性验证器的监禁时间。
  * "min_signed_per_window"：总错过块的阈值，以百分比表示。
  * "signed_blocks_window": 计 ​​ 算验证者活跃度的窗口。
  * "slash_fraction_double_sign"：拜占庭验证者减少股权的最大百分比。
  * "slash_fraction_downtime": 可用性低的验证者减少权益的最大百分比。
  - - "signing_infos"：与罚没模块的每个验证器相关的信息（如果有）。
- "staking"：处理权益证明相关逻辑的权益模块。
  - "delegations"：与验证器的委托状态相关的信息（如果有）。
  - "exported": 这个创世文件是否是通过导出以前的状态生成的。
  - "last_total_power"：创世记中的总投票权，如果有的话。
  - "last_validator_powers"：每个验证者在最后已知状态下的投票权，如果有的话。
  - "params": 创世文件中定义的质押模块的参数。
  * "bond_denom": 用于质押的硬币面额。
  * "historical_entries"：要保留的历史条目数。
  * "max_entries"：解除绑定委托或重新委托的最大条目数。
  * "max_validators": 验证器的最大数量。
  * "unbonding_time"：解除绑定的持续时间。
  - "redelegations"：验证者的重新委托列表，如果有的话。
  - "unbonding_delegations"：验证者的解除绑定委托列表，如果有的话。
  - "validators"：现有验证器列表，如果有的话。
