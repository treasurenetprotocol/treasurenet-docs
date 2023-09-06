---
sidebar_position: 1
---

# Genesis.json

The genesis.json file is located in the data directory (default "/root/.treasurenetd"). Building upon the standard Tendermint genesis format, we have customized our own genesis file that includes different modules and facilitates the special functionalities of the Treasurenet chain.

## Fields in genesis

Specifically, the genesis file includes the following fields:

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

## introduce

- "genesis_time": The time at which the blockchain starts.
- "genutil": Various genesis utility functionalities used, including genesis transaction creation (gentx) and genesis file verification commands, as well as Tendermint-related initialization.
- "ibc": Inter-Blockchain Communication across different chains.
- "chain_id": The unique identifier of the blockchain. For more detailed information, please refer to this.
- "initial_height": The initial height of the blockchain.
- "consensus_params": Consensus parameters defined in the genesis file.
  - "block":
    - "max_bytes": The maximum size of a block in bytes.
    - "max_gas": The gas limit per block, with a default value of "-1" indicating no enforced rules regarding gas.
    - "time_iota_ms": The minimum time increment between consecutive blocks in milliseconds.
  - "evidence": Handling of evidence storage and block proposal detection using the evidence reactor.
    - "max_age_num_blocks": This field will be deprecated.
    - "max_age_duration": The maximum age of evidence. Any evidence older than this will be rejected.
    - "max_num": The maximum age of evidence in terms of block count.
  - "validator":
    - "pub_key_types": The supported validator public key types.
- "app_hash": The initial application state defined in the genesis block.
- "auth":
  - "params": Parameters of the auth module defined in the genesis file.
    - "max_memo_characters": The maximum number of characters in a transaction memo.
    - "tx_sig_limit": The maximum number of signers for a transaction.
    - "tx_size_cost_per_byte": The gas cost per byte for a transaction.
    - "sig_verify_cost_ed25519": The gas cost for signature verification using ed25519.
    - "sig_verify_cost_secp256k1": The gas cost for signature verification using secp256k1.
  - "accounts": Genesis accounts that define the initial allocation of tokens.
    - "@type": The account type.
    - "address": The address of the genesis account.
    - "pub_key": The public key of the genesis account.
    - "account_number": The account number under the state.
    - "sequence": The number of transactions sent by the account. It increments each time a transaction is included in a block and is used to prevent replay attacks.
    - "base_vesting_account":
      - "original_vesting": Special type of account where tokens need to vest over a period before being transferable. Tokens can be delegated within the vesting period.
      - "denom": The denomination of the token.
      - "amount": The total amount in the vesting account.
      - "delegated_free": The amount of delegated tokens that can be transferred after being granted.
      - "delegated_vesting": The amount of tokens still in the process of being granted.
      - "endtime": The end time of the vesting period.
- "bank": The bank module handles tokens.
  - "params": Parameters of the bank module defined in the genesis file.
    - "send_enabled": The transfer capability in the genesis.
    - "default_send_enabled": The default value of "send_enabled" controlling the sending transfer capability.
- "distribution": Module responsible for distribution block logic and charging validators and delegators.
  - "delegator_starting_infos":
  - "delegator_withdraw_infos": List of delegator withdrawal addresses.
  - "fee_pool":
    - "community_pool": Allocation of funds (if any) in the community pool.
  - "outstanding_rewards": Unclaimed rewards, if any.
  - "params": Parameters of the distribution module defined in the genesis file.
    - "base_proposer_reward": Base bonus based on transaction fees collected in valid blocks.
    - "bonus_proposer_reward": Maximum bonus based on transaction fees collected in valid blocks.
    - "community_tax": Community tax rate.
    - "withdraw_addr_enabled": Whether delegators can set different addresses for reward withdrawals.
  - "previous_proposer": The proposer of the previous block, if any.
  - "validator_accumulated_commissions": Unwithdrawn validator commissions, if any.
  - "validator_current_rewards": Information related to the validator's current rewards (if any).
  - "validator_historical_rewards": Information related to the validator's historical rewards (if any).
  - "validator_slash_events": Information related to the validator's historical slash events (if any).
- "gov": The governance module.
  - "deposit_params": Deposit parameters for governance proposals.
    - "max_deposit_period": The maximum deposit period for governance proposals.
    - "min_deposit": The minimum deposit required for governance proposals.
  - "deposits": List of deposits for each proposal ID, if any.
  - "proposals": List of proposals, if any.
  - "starting_proposal_id": The initial proposal ID, starting from "1".
  - "tally_params": Tally parameters.
    - "quorum": The minimum percentage of bonded tokens required for a vote to be valid.
    - "threshold": The minimum percentage of votes required to make a result valid.
    - "veto_threshold": The maximum percentage of votes for a result to be valid.
  - "votes": List of votes for each proposal ID, if any.
  - "voting_params": Voting parameters.
    - "voting_period": The voting period for governance proposals.
- "mint": The mint module for token minting.
  - "minter":
    - "annual_provisions": The annual expected provisions (set to zero in the genesis).
    - "inflation": The target annual inflation rate compounded weekly.
  - "params": Parameters of the mint module defined in the genesis file.
    - "blocks_per_year": The estimated number of blocks produced per year.
    - "goal_bonded": The target bonded tokens as a percentage.
    - "inflation_max": The maximum inflation rate.
    - "inflation_min": The minimum inflation rate.
    - "inflation_rate_change": The maximum annual change in the inflation rate.
    - "mint_denom": The token type being minted.
- "slashing": The slashing module for penalizing validators' misbehavior.
  - "missed_blocks": Information related to missed blocks by validators, if any.
  - "params": Parameters of the slashing module defined in the genesis file.
    - "downtime_jail_duration": The jail duration for low availability validators.
    - "min_signed_per_window": The threshold of total missed blocks as a percentage.
    - "signed_blocks_window": The window for calculating validator activity.
    - "slash_fraction_double_sign": The maximum percentage by which Byzantine validators reduce their stake.
    - "slash_fraction_downtime": The maximum percentage by which low availability validators reduce their stake.
  - "signing_infos": Information related to each validator in the slashing module (if any).
- "staking": The staking module responsible for the logic of proof-of-stake.
  - "delegations": Information related to delegation status with validators (if any).
  - "exported": Whether this genesis file is generated from exporting a previous state.
  - "last_total_power": The total voting power in the genesis if available.
  - "last_validator_powers": The voting power of each validator in the last known state if available.
  - "params": Parameters of the staking module defined in the genesis file.
    - "bond_denom": The denomination of coins used for staking.
    - "historical_entries": The number of historical entries to retain.
    - "max_entries": The maximum number of entries for unbonding delegations or redelegations.
    - "max_validators": The maximum number of validators.
    - "unbonding_time": The duration of unbonding.
  - "redelegations": List of redelegations for validators if any.
  - "unbonding_delegations": List of unbonding delegations for validators if any.
  - "validators": List of existing validators if any.
