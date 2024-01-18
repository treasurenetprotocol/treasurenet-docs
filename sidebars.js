/**
 * Creating a sidebar enables you to:
 - create an ordered group of docs
 - render a sidebar for each doc of that group
 - provide next/previous navigation

 The sidebars can be generated from the filesystem, or explicitly defined here.

 Create as many sidebars as you want.
 */

// @ts-check

/** @type {import('@docusaurus/plugin-content-docs').SidebarsConfig} */
const sidebars = {
    docs: [
        {
            type: 'category',
            label: 'About Treasurenet',
            link: {
                type: 'generated-index',
                title: 'About Treasurenet',
            },
            items: [
                'about/introduction',
                {
                    type: 'category',
                    label: 'Core Concepts',
                    link: {
                        type: 'generated-index',
                        title: 'Core Concepts',
                    },
                    items: [
                        'about/core_concepts/layer_1_built_on_RWA_production',
                        {
                            type: 'category',
                            label: 'Producers',
                            link: {
                                type: 'generated-index',
                                title: 'Producers',
                            },
                            items: [
                                'about/core_concepts/producers/what_is_a_producer',
                                'about/core_concepts/producers/benefits_of_a_producer',
                                'about/core_concepts/producers/production_data',
                            ]
                        },
                        'about/core_concepts/tn_gateway_and_tools',
                        {
                            type: 'category',
                            label: 'Decentralized RWA Audit',
                            link: {
                                type: 'generated-index',
                                title: 'Decentralized RWA Audit',
                            },
                            items: [
                                'about/core_concepts/d_audit/decentralized_RWA_audit',
                                {
                                    type: 'category',
                                    label: 'Privacy Protection',
                                    link: {
                                        type: 'generated-index',
                                        title: 'Privacy Protection',
                                    },
                                    items: [
                                        'about/core_concepts/d_audit/privacy_protection/what_constitutes_private_data_in_treasurenet',
                                        'about/core_concepts/d_audit/privacy_protection/why_protect_asset_privacy',
                                        'about/core_concepts/d_audit/privacy_protection/how_to_protect_private_data',
                                    ]
                                },

                            ]
                        },
                        {
                            type: 'category',
                            label: 'Stake & Bonus Stake',
                            link: {
                                type: 'generated-index',
                                title: 'Stake & Bonus Stake',
                            },
                            items: [
                                'about/core_concepts/stake_and_bonus_stake/what_is_staking',
                                'about/core_concepts/stake_and_bonus_stake/what_is_bonus_stake',
                                'about/core_concepts/stake_and_bonus_stake/why_is_there_bonus_stake',
                            ]
                        },
                    ]
                },
                {
                    type: 'category',
                    label: 'Tokenomics',
                    link: {
                        type: 'generated-index',
                        title: 'Tokenomics',
                        description: 'The total supply of $UNIT tokens is finite, but the exact limit will vary depending on the future production of rare assets. This is because Treasurenet block rewards reduce over time. Producers work together to create RWAs to prevent $UNIT block rewards from decaying quickly. Whereas BTC reduces by 50% per period, $UNIT rewards reduce at a rate based on $TAT minted, hence asset produced. ',
                    },
                    items: [
                        'about/tokenomics/unit_token',
                        'about/tokenomics/tat_token',
                        'about/tokenomics/general_supply_framework',
                    ]
                },
                {
                    type: 'category',
                    label: 'dApps Under Development',
                    link: {
                        type: 'generated-index',
                        title: 'dApps Under Development',
                    },
                    items: [
                        'about/dapps_under_development/ustn',
                        'about/dapps_under_development/tn_dex',
                        'about/dapps_under_development/use_cases',
                    ]
                },
            ]
        },
        {
            type: 'category',
            label: 'Fundamentals',
            link: {
                type: 'generated-index',
                title: 'Fundamentals',
            },
            items: [
                {
                    type: 'category',
                    label: 'Digital Wallets',
                    items: [
                        'fundamentals/wallets/metamask',
                        'fundamentals/wallets/coinbase',
                        'fundamentals/wallets/keplr',
                    ]
                },
                'fundamentals/transfer-tokens',
            ]
        },
        {
            type: 'category',
            label: 'USTN Finance Platform',
            link: {
                type: 'generated-index',
                title: 'USTN Finance Platform',
            },
            items: [
                'ustn/overview',
                'ustn/financial-operations',
                'ustn/qa'
            ]
        },
        {
            type: 'category',
            label: 'Governance',
            link: {
                type: 'generated-index',
                title: 'Governance',
            },
            items: [
                'governance/overview',
                'governance/dao-website',
                'governance/community-pool',
            ]
        },
        {
            type: 'category',
            label: 'Assets Production',
            link: {
                type: 'generated-index',
                title: 'Assets Production',
            },
            items: [
                'assets/producer_portal',
                'assets/connection_guidelines',
                {
                    type: 'category',
                    label: 'TAT Mint by Asset-Class',
                    link: {
                        type: 'generated-index',
                        title: 'TAT Mint by Asset-Class',
                        description: 'Notice: Documentation is in progress. Further asset connections under development. Requirements may be adjusted via DAO Governance proposals.',
                    },
                    items: [
                        {
                            type: 'category',
                            label: 'Pilot real-world connection',  //Pilot real-world connection
                            link: {
                                type: 'generated-index',
                                title: 'Pilot real-world connection',
                                description: 'This is applicable for all quantifiable real-world assets to be connected, where $TAT records their respective market value of verifiable asset production.'
                            },
                            items: [
                                'assets/tat_mint/production_audit',
                                'assets/tat_mint/market_value',
                                'assets/tat_mint/data_requirements',
                            ]
                        },
                        {
                            type: 'category',
                            label: 'Pilot Producer Guide',
                            link: {
                                type: 'generated-index',
                                title: 'Pilot Producer Guide',
                            },
                            items: [
                                'assets/tat_mint/registration',
                                'assets/tat_mint/wellmanagement',
                                {
                                    type: 'category',
                                    label: 'Automatic Upload Tools',
                                    link: {
                                        type: 'generated-index',
                                        title: 'Automatic Upload Tools',
                                    },
                                    items: [
                                        'assets/tat_mint/production_data_intro',
                                        'assets/tat_mint/production_data_process',
                                        'assets/tat_mint/production_data_uploader',
                                        'assets/tat_mint/production_data_manual'
                                    ]
                                },
                                'assets/tat_mint/expense',
                                'assets/tat_mint/mint',
                                'assets/tat_mint/messages',
                            ]
                        }
                    ]
                },
                {
                    type: 'category',
                    label: 'New Asset Workflow Registration',
                    link: {
                        type: 'generated-index',
                        title: 'New Asset Workflow Registration',
                        description: 'Treasurenet welcomes rare assets to join the network and generate corresponding TAT. Please contact Treasurenet Foundation through any communication channels.'
                    },
                    items: [
                        'assets/new_asset_workflow',
                    ]
                }
            ]
        },
        {
            type: 'category',
            label: 'For Delegaters',
            link: {
                type: 'generated-index',
                title: 'For Delegaters',
            },
            items: [
                'staking/introduction',
                {
                    type: 'category',
                    label: 'Operation Guide',
                    items: [
                        'staking/operation-guide/staking-use-website',
                        'staking/operation-guide/staking-use-code',
                        'staking/operation-guide/stakeboosting',
                    ],

                },
                /*'staking/qa',*/
            ]
        },
        {
            type: 'category',
            label: 'For Validators',
            link: {
                type: 'generated-index',
                title: 'For Validators',
            },
            items: [
                'validators/overview',
                {
                    type: 'category',
                    label: 'Basic Concepts',
                    items: [
                        'validators/concepts/validator-delegator',
                        'validators/concepts/becoming-a-validator',
                        'validators/concepts/rewards',
                    ],
                },
                {
                    type: 'category',
                    label: 'Quick Start',
                    items: [
                        'validators/quickStart/installation',
                        'validators/quickStart/treasurenetd',
                        'validators/quickStart/run-a-node',
                        'validators/quickStart/init',
                    ],
                },
                {
                    type: 'category',
                    label: 'Setup & Configuration',
                    items: [
                        'validators/setup/run-a-validator',
                        'validators/setup/configuration',
                    ]
                },
                'validators/join-testnet',
                'validators/join-mainnet',
                'validators/create-your-gentx',
                'validators/faq',
            ]
        },
        {
            type: 'category',
            label: 'For Dapp Devs',
            link: {
                type: 'generated-index',
                title: 'For Dapp Devs',
            },
            items: [
                'developers/quick-connect',
                'developers/tn-gateway',
                'developers/clients',
                {
                    type: 'category',
                    label: 'Guides',
                    items: [
                        'developers/guides/wallet-integration',
                        'developers/guides/erc20',
                        'developers/guides/trace-transactions',
                        'developers/guides/query-balances'
                    ]
                },
                {
                    type: 'category',
                    label: 'Localnet',
                    items: [
                        'developers/localnet/single-node',
                        'developers/localnet/multi-node',
                        'developers/localnet/testnet-command',
                    ]
                },
                {
                    type: 'category',
                    label: 'Testnet',
                    items: [
                        'developers/testnet/faucet',
                    ]
                },
                {
                    type: 'category',
                    label: 'Treasurenet EVM Tooling',
                    items: [
                        'developers/ethereum-tooling/remix',
                        'developers/ethereum-tooling/hardhat',
                        'developers/ethereum-tooling/truffle',
                    ]
                },
                {
                    type: 'category',
                    label: 'Javascript Libraries',
                    items: [
                        {
                            type:'link',
                            label:'@treasurenet/address-converter',
                            href:'https://www.npmjs.com/package/@treasurenet/address-converter'
                        },
                        {
                            type:'link',
                            label:'@treasurenet/proto',
                            href:'https://www.npmjs.com/package/@treasurenet/proto'
                        },
                        {
                            type:'link',
                            label:'@treasurenet/provider',
                            href:'https://www.npmjs.com/package/@treasurenet/provider'
                        },
                        {
                            type:'link',
                            label:'@treasurenet/eip712',
                            href:'https://www.npmjs.com/package/@treasurenet/eip712'
                        },
                        {
                            type:'link',
                            label:'@treasurenet/transactions',
                            href:'https://www.npmjs.com/package/@treasurenet/transactions'
                        },
                        {
                            type:'link',
                            label:'@treasurenet/hash',
                            href:'https://www.npmjs.com/package/@treasurenet/hash'
                        },
                    ]
                },
                {
                    type: 'category',
                    label: 'Ethereum JSON-RPC',
                    items: [
                        'developers/eth-json-rpc/methods',
                    ]
                },
                {
                    type: 'link',
                    label: 'Cosmos gRPC & REST',
                    href: 'https://www.google.com'
                },
                /*'developers/faq'*/
            ]
        },
        {
            type: 'category',
            label: 'For Protocol Devs',
            link: {
                type: 'generated-index',
                title: 'For Protocol Devs',
            },
            items: [
                'protocolDevelopers/overview',
                {
                    type: 'category',
                    label: 'Basic Concepts',
                    items: [
                        'protocolDevelopers/concepts/accounts',
                        'protocolDevelopers/concepts/transactions',
                        'protocolDevelopers/concepts/encoding',
                        'protocolDevelopers/concepts/gas-and-fees',
                        'protocolDevelopers/concepts/multisig',
                    ]
                },
                {
                    type: 'category',
                    label: 'Modules',
                    items: [
                        'protocolDevelopers/modules/overview',
                        'protocolDevelopers/modules/auth',
                        'protocolDevelopers/modules/bank',
                        'protocolDevelopers/modules/mint',
                        'protocolDevelopers/modules/staking',
                        'protocolDevelopers/modules/slashing',
                        'protocolDevelopers/modules/gov',
                        'protocolDevelopers/modules/distribution'

                    ]
                },
                {
                    type: 'category',
                    label: 'Genesis File',
                    items: [
                        'protocolDevelopers/genesis/genesis',
                    ]
                },
            ]
        },
        {
            type: 'category',
            label: 'Block Explorers',
            items: [
                'blockExplorers/intro',
            ]
        },
    ],
    api: [
        'api/intro',
        {
            type: 'category',
            label: 'Official Contracts',
            items: [
                'api/officialContracts/tat',
                'api/officialContracts/ustn',
                'api/officialContracts/treasure-data',
                'api/officialContracts/bid',
            ]
        },
        {
            type: 'category',
            label: 'Ethereum JSON-RPC Methods',
            items: [
                'api/eth-json-rpc/web3-methods',
                'api/eth-json-rpc/eth-methods',
                'api/eth-json-rpc/websocket-methods',
                'api/eth-json-rpc/personal-methods',
                'api/eth-json-rpc/debug-methods',
                'api/eth-json-rpc/miner-methods',
                'api/eth-json-rpc/txpool-methods',
            ]
        },
        {
            type: 'link',
            label: 'Cosmos gRPC & REST',
            href: 'https://www.google.com'
        },
        {
            type: 'category',
            label: 'Tools',
            items: [
                'api/tools/intro',
            ]
        }
    ]
};

module.exports = sidebars;
