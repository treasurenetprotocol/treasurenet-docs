# 账户

## 公私钥对

公私钥对包含用于与节点交互的公钥和私钥。例如，需要在运行节点之前设置一个验证器密钥用以正确签署区块。私钥可以存放在不同的位置，称为"[Keyring Backends](/)"，例如文件系统或者操作系统自己的密钥存储。

### 添加密钥

您可以分别使用以下命令来获取有关 keys 命令的帮助，来获取更多信息

```shell
  treasurenetd keys
```

```shell
  treasurenetd keys [command] --help
```

要在 Keyring 中创建新的密钥，请运行带有<key_name>参数的 add 子命令。您必须为新生成的密钥提供密码。

```shell
  treasurenetd keys add mykey
```

该命令生成一个新的 24 词助记词，将其持久化到相关后端，并输出有关密钥对的信息。 如果此密钥对将用于保存具有价值的令牌，请务必在安全的地方写下助记词！

默认情况下，密钥环会生成一个 eth_secp256k1 密钥。 密钥环还支持 ed25519 密钥，可以通过传递 --algo 标志来创建。 密钥环当然可以同时持有两种类型的钥匙。

```shell
treasurenetd keys add mykey

Enter keyring passphrase:
Re-enter keyring passphrase:

- name: mykey
  type: local
  address: eth1ntxtlnks5qrz5kethz489kv6z4gc4supsgcvvs
  pubkey: '{"@type":"/treasurenet.crypto.v1.ethsecp256k1.PubKey","key":"ApcwN2it5mHnO1a4Hq3Ey9hoZY2+CjdR0nQUdNFJ2LZb"}'
  mnemonic: ""


**Important** write this mnemonic phrase in a safe place.
It is the only way to recover your account if you ever forget your password.

height donkey nasty surface catch effort frog birth fortune december aspect glimpse goose firm divorce tornado panic metal kitten dumb witness glimpse also discover
```

## 密钥环后端

### 操作系统

操作系统是默认选项，因为操作系统的默认凭据管理器旨在满足用户最常见的需求，并在不影响安全性的情况下为他们提供舒适的体验。

操作系统后端依赖于操作系统特定的默认值来安全地处理密钥存储。 通常，操作系统的凭证子系统根据用户的密码策略处理密码提示、私钥存储和用户会话。 以下是最流行的操作系统及其各自的密码管理器的列表：

- macOS (since Mac OS 8.6): [Keychain](https://support.apple.com/en-gb/guide/keychain-access/welcome/mac)
- Windows: [Credentials Management API](https://docs.microsoft.com/en-us/windows/win32/secauthn/credentials-management)
- GNU/Linux:
  - [libsecret](https://gitlab.gnome.org/GNOME/libsecret)
  - [kwallet](https://api.kde.org/frameworks/kwallet/html/index.html)

使用 GNOME 作为默认桌面环境的 GNU/Linux 发行版通常附带 [Seahorse](https://wiki.gnome.org/Apps/Seahorse)。 基于 KDE 的发行版的用户通常使用 [KDE Wallet Manager](https://userbase.kde.org/KDE_Wallet_Manager)。 虽然前者实际上是一个 libsecret 方便的前端，但后者是一个 kwallet 客户端。

### 文件

该文件将加密的密钥环存储在应用程序的配置目录中。 此密钥环在每次访问时都会要求输入密码，这可能会在单个命令中出现多次，从而导致重复的密码提示。

### 密码存储

通行证后端使用 [pass](https://www.passwordstore.org/) 实用程序来管理密钥敏感数据和元数据的磁盘加密。 密钥存储在应用程序特定目录中的 gpg 加密文件中。 pass 适用于最流行的 UNIX 操作系统以及 GNU/Linux 发行版。

密码存储必须在首次使用前设置：

```shell
  pass init <GPG_KEY_ID>
```

### KDE 钱包管理器

kwallet 后端使用 KDE 钱包管理器，它默认安装在将 KDE 作为默认桌面环境的 GNU/Linux 发行版上。 请参阅 [KWallet Handbook](https://docs.kde.org/stable5/en/kwalletmanager/kwallet5/) 了解更多信息。

### 内存

内存后端将密钥存储在内存中。 程序退出后立即删除密钥。
