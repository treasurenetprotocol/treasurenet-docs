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
            label: '关于Treasurenet',  //About Treasurenet
            link: {
                type: 'generated-index',
                title: '关于Treasurenet',
            },
            items: [
                'about/introduction',
                {
                    type: 'category',
                    label: '核心概念', //Core Concepts
                    link: {
                        type: 'generated-index',
                        title: '核心概念',
                    },
                    items: [
                        'about/core_concepts/layer_1_built_on_RWA_production',
                        {
                            type: 'category',
                            label: 'Producers',  //Producers
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
                            label: '去中心化RWA审计', //Decentralized RWA Audit
                            link: {
                                type: 'generated-index',
                                title: '去中心化RWA审计',
                            },
                            items: [
                                'about/core_concepts/d_audit/decentralized_RWA_audit',
                                {
                                    type: 'category',
                                    label: '隐私保护',  //Privacy Protection
                                    link: {
                                        type: 'generated-index',
                                        title: '隐私保护',
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
                            label: '质押和额外质押',  //Stake & Bonus Stake
                            link: {
                                type: 'generated-index',
                                title: '质押和额外质押',
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
                    label: '代币经济',//Tokenomics
                    link: {
                        type: 'generated-index',
                        title: '代币经济',
                        description: '$UNIT 代币的总供应量是有限的，但确切的限制将根据稀有资产未来的生产情况而有所不同。 这是因为 Treasurenet 区块奖励会随着时间的推移而减少。 生产者共同创建 RWA，以防止 $UNIT 区块奖励快速衰减。 虽然 BTC 每期减少 50%，但 $UNIT 奖励的减少率取决于铸造的 $TAT，即资产的生产量。',
                    },
                    items: [
                        'about/tokenomics/unit_token',
                        'about/tokenomics/tat_token',
                        'about/tokenomics/general_supply_framework',
                    ]
                },
                {
                    type: 'category',
                    label: '开发中的Dapp',  //dApps Under Development
                    link: {
                        type: 'generated-index',
                        title: '开发中的Dapp',
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
            label: '常见概念',//Fundamentals
            link: {
                type: 'generated-index',
                title: '常见概念',
            },
            items: [
                {
                    type: 'category',
                    label: '钱包', //Digital Wallets
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
            label: 'USTN金融平台',  //USTN Finance Platform
            link: {
                type: 'generated-index',
                title: 'USTN金融平台',
            },
            items: [
                'ustn/overview',
                'ustn/financial-operations',
                'ustn/qa'
            ]
        },
        {
            type: 'category',
            label: '去中心化治理', //Governance
            link: {
                type: 'generated-index',
                title: '去中心化治理',
            },
            items: [
                'governance/overview',
                'governance/dao-website',
                'governance/community-pool',
            ]
        },
        {
            type: 'category',
            label: '产生资产', //Assets Production
            link: {
                type: 'generated-index',
                title: '产生资产',
            },
            items: [
                'assets/producer_portal',
                'assets/connection_guidelines',
                {
                    type: 'category',
                    label: '铸造TAT',  //TAT Mint by Asset-Class
                    link: {
                        type: 'generated-index',
                        title: '铸造TAT',
                        description: '注意：文档正在处理中。 进一步的资产连接正在开发中。 要求可以通过 DAO 治理提案进行调整。',
                    },
                    items: [
                        {
                            type: 'category',
                            label: '链接现实世界',  //Pilot real-world connection
                            link: {
                                type: 'generated-index',
                                title: '链接现实世界',
                                description: '这适用于所有要连接的可量化的现实世界资产，其中 $TAT 记录了它们各自的可验证资产生产的市场价值。'
                            },
                            items: [
                                'assets/tat_mint/production_audit',
                                'assets/tat_mint/market_value',
                                'assets/tat_mint/data_requirements',
                            ]
                        },
                        {
                            type: 'category',
                            label: 'Producer 指南', //Pilot Producer Guide
                            link: {
                                type: 'generated-index',
                                title: 'Producer 指南',
                            },
                            items: [
                                'assets/tat_mint/registration',
                                'assets/tat_mint/wellmanagement',
                                'assets/tat_mint/expense',
                                'assets/tat_mint/mint',
                                'assets/tat_mint/messages',
                            ]
                        }
                    ]
                },
                {
                    type: 'category',
                    label: '新资产加入', //New Asset Workflow Registration
                    link: {
                        type: 'generated-index',
                        title: '新资产加入',
                        description: 'Treasurenet欢迎稀有资产加入网络并生成相应的TAT。 请通过任何沟通渠道联系Treasurenet基金会。'
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
                    label: '操作指南',  //Operation Guide
                    items: [
                        'staking/operation-guide/staking',
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
                    label: '基本概念',  //Basic Concepts
                    items: [
                        'validators/concepts/validator-delegator',
                        'validators/concepts/becoming-a-validator',
                        'validators/concepts/incentives',
                    ],
                },
                {
                    type: 'category',
                    label: '快速开始',  //Quick Start
                    items: [
                        'validators/quickStart/installation',
                        'validators/quickStart/treasurenetd',
                        'validators/quickStart/run-a-node',
                        'validators/quickStart/init',
                    ],
                },
                {
                    type: 'category',
                    label: '配置和启动',  //Setup & Configuration
                    items: [
                        'validators/setup/run-a-validator',
                        'validators/setup/configuration',
                    ]
                },
                'validators/join-testnet',
                'validators/join-mainnet',
                /*'validators/faq',*/
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
                    label: '操作指南', //Guides
                    items: [
                        'developers/guides/wallet-integration',
                        'developers/guides/erc20',
                        'developers/guides/trace-transactions',
                        'developers/guides/query-balances'
                    ]
                },
                {
                    type: 'category',
                    label: '本地环境',  //Localnet
                    items: [
                        'developers/localnet/single-node',
                        'developers/localnet/multi-node',
                        'developers/localnet/testnet-command',
                    ]
                },
                {
                    type: 'category',
                    label: 'Testnet', //Testnet
                    items: [
                        'developers/testnet/faucet',
                    ]
                },
                {
                    type: 'category',
                    label: 'Treasurenet EVM 工具集', //Treasurenet EVM Tooling
                    items: [
                        'developers/ethereum-tooling/remix',
                        'developers/ethereum-tooling/hardhat',
                        'developers/ethereum-tooling/truffle',
                    ]
                },
                {
                    type: 'category',
                    label: '工具库', //Client Libraries
                    items: [
                        'developers/client-libraries/address-converter'
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
                    label: '基本概念', //Basic Concepts
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
                    label: '模块',  //Modules
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
            label: '区块浏览器',
            items: [
                'blockExplorers/intro',
            ]
        },
    ],
    api: [
        'api/intro',
        {
            type: 'category',
            label: '官方合约', //Official Contracts
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
            label: '工具集', //Tools
            items: [
                'api/tools/intro',
            ]
        }
    ]
};

module.exports = sidebars;
