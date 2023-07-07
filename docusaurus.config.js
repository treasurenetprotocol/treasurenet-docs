// @ts-check
// Note: type annotations allow type checking and IDEs autocompletion

const lightCodeTheme = require('prism-react-renderer/themes/github');
const darkCodeTheme = require('prism-react-renderer/themes/dracula');

/** @type {import('@docusaurus/types').Config} */
const config = {
    title: 'Treasurenet Documentation',
    tagline: 'Treasurenet Built on Real-World Rare Assets.',
    url: 'https://docs.treasurenet.io',
    baseUrl: '/',
    onBrokenLinks: 'ignore',
    onBrokenMarkdownLinks: 'ignore',
    favicon: 'img/favicon.ico',

    organizationName: 'treasurenetprotocol',
    projectName: 'treasurenetDoc',

    i18n: {
        defaultLocale: 'zh-Hans',
        locales: ['en', 'zh-Hans'],
    },

    presets: [
        [
            '@docusaurus/preset-classic',
            /** @type {import('@docusaurus/preset-classic').Options} */
            ({
                sitemap: {
                    changefreq: 'weekly',
                    priority: 0.5,
                    ignorePatterns: ['/tags/**'],
                    filename: 'sitemap.xml',
                },
                gtag: {
                    trackingID: 'G-YTTVBEEG0V',
                    anonymizeIP: true,
                },
                docs: {
                    sidebarPath: require.resolve('./sidebars.js'),
                    // Please change this to your repo.
                    // Remove this to remove the "edit this page" links.
                    editUrl: ({locale, docPath}) => {
                        if (locale === 'zh-Hans') {
                            return `https://github.com/treasurenetprotocol/docs/blob/feature/1.0.1/docs/${docPath}`
                        } else {
                            return `https://github.com/treasurenetprotocol/docs/blob/feature/1.0.1/i18n/${locale}/docusaurus-plugin-content-docs/current/${docPath}`
                        }
                    },
                    showLastUpdateAuthor: true,
                    showLastUpdateTime: true,
                    sidebarCollapsible: true,
                },
                blog: {
                    showReadingTime: false,
                    // Please change this to your repo.
                    // Remove this to remove the "edit this page" links.
                    editUrl:
                        'https://github.com/treasurenetprotocol/docs/blob/master',
                    feedOptions: {
                        type: 'rss',
                        copyright: `Copyright © ${new Date().getFullYear()} Treasurenet Foundation, Inc.`,
                    },
                },
                theme: {
                    customCss: require.resolve('./src/css/custom.css'),
                },
            }),
        ],
    ],

    themeConfig:
    /** @type {import('@docusaurus/preset-classic').ThemeConfig} */
        ({
            algolia: {
                appId: 'YOUR_APP_ID',
                apiKey: 'YOUR_SEARCH_API_KEY',
                indexName: 'YOUR_INDEX_NAME',
                contextualSearch: true,
                externalUrlRegex: 'external\\.com|domain\\.com',
                replaceSearchResultPathname: {
                    from: '/docs/',
                    to: '/',
                },
                searchParameters: {},
                searchPagePath: 'search',
            },
            colorMode: {
                defaultMode: 'dark',
                disableSwitch: false,
                respectPrefersColorScheme: false,
            },
            navbar: {
                title: 'Treasurenet Docs',
                logo: {
                    alt: 'treasurenet',
                    src: 'img/logo.png',
                },
                items: [
                    {
                        type: 'doc',
                        docId: 'about/introduction',
                        position: 'left',
                        label: '指南',
                    },
                    /*{
                        type: 'doc',
                        docId: 'api/intro',
                        position: 'left',
                        label: 'API',
                    },*/
                    {to: '/blog', label: 'Blog', position: 'left'},
                    {
                        href: 'https://github.com/treasurenetprotocol',
                        label: 'GitHub',
                        position: 'right',
                    },
                    {
                        type: 'localeDropdown',
                        position: 'right',
                    },
                ],
            },
            footer: {
                style: 'light',
                links: [
                    {
                        title: '文档',
                        items: [
                            {
                                label: '指南',
                                to: '/docs/about/introduction',
                            },
                            /*{
                                label: 'API',
                                to: '/docs/api/intro',
                            },*/
                        ],
                    },
                    {
                        title: '产品',
                        items: [
                            {
                                label: 'Treasurenet',
                                href: 'https://www.treasurenet.io',
                            },
                            {
                                label: 'Treasurenet Faucet',
                                href: 'https://faucet.treasurenet.io',
                            },
                            {
                                label: 'Producer 认证',
                                href: 'https://mplatform.treasurenet.io',
                            },
                            {
                                label: '服务平台',
                                href: 'https://splatform.treasurenet.io',
                            },
                        ],
                    },
                    {
                        title: '社交',
                        items: [
                            {
                                label: 'Stack Overflow',
                                href: 'https://stackoverflow.com/questions/tagged/docusaurus',
                            },
                            {
                                label: 'Discord',
                                href: 'https://discord.com/channels/990530508834340905/990530510746964004',
                            },
                            {
                                label: 'Twitter',
                                href: 'https://twitter.com/treasurenet_io',
                            },
                            {
                                label: 'Telegram',
                                href: 'https://t.me/+hN6G5mGAlD8xMmI5',
                            }
                        ],
                    },
                    {
                        title: '其他',
                        items: [
                            {
                                label: 'Blog',
                                to: '/blog',
                            },
                            {
                                label: 'GitHub',
                                href: 'https://github.com/treasurenetprotocol',
                            },
                        ],
                    },
                ],
                copyright: `Copyright © ${new Date().getFullYear()} Treasurenet Foundation, Inc.`,
            },
            prism: {
                theme: lightCodeTheme,
                darkTheme: darkCodeTheme,
            },
        })
};

module.exports = config;
