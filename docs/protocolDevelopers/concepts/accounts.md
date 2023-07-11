# Accounts

## Keyring

Keyring contains public-private key pairs used for interacting with nodes. For example, a Validator Key needs to be set up before running a node to correctly sign blocks. The private key can be stored in different locations, known as "Keyring Backends," such as the file system or the operating system's native key storage.

### Add Keys

You can use the following commands separately to obtain help regarding the "keys" command and to get more information.

```shell
  treasurenetd keys
```

```shell
  treasurenetd keys [command] --help
```

To create a new key in Keyring, run the 'add' subcommand with the `<key_name>` parameter. You must provide a password for the newly generated key.

```shell
  treasurenetd keys add mykey
```

The command generates a new 24-word mnemonic, persists it to the relevant backend, and outputs information about the key pair. If this key pair will be used to store valuable tokens, be sure to write down the mnemonic in a secure place!

By default, the keyring generates an eth_secp256k1 key. The keyring also supports ed25519 keys, which can be created by passing the --algo flag. The keyring can, of course, hold both types of keys simultaneously.

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

## Keyring Backends

### OS

os is the default option because the default credential manager of the operating system is designed to meet the most common needs of users and provide them with a comfortable experience without compromising security.

The os backend relies on operating system-specific defaults to securely handle key storage. Typically, the credential subsystem of the operating system handles password prompts, private key storage, and user sessions based on the user's password policy. Here is a list of the most popular operating systems and their respective password managers:

- macOS (since Mac OS 8.6): [Keychain](https://support.apple.com/en-gb/guide/keychain-access/welcome/mac)
- Windows: [Credentials Management API](https://docs.microsoft.com/en-us/windows/win32/secauthn/credentials-management)
- GNU/Linux:
  - [libsecret](https://gitlab.gnome.org/GNOME/libsecret)
  - [kwallet](https://api.kde.org/frameworks/kwallet/html/index.html)

GNU/Linux distributions that use GNOME as the default desktop environment usually come with [Seahorse](https://wiki.gnome.org/Apps/Seahorse). Users of KDE-based distributions typically use [KDE Wallet Manager](https://userbase.kde.org/KDE_Wallet_Manager). Although the former is actually a convenient frontend for libsecret, the latter is a kwallet client.

### File

The file stores an encrypted keychain in the application's configuration directory. This keychain prompts for a password each time it is accessed, which may result in repetitive password prompts within a single command.

### Password Store

The passport backend utilizes the [pass](https://www.passwordstore.org/) utility to manage disk encryption of key-sensitive data and metadata. The keys are stored in GPG-encrypted files in an application-specific directory. Pass is compatible with the most popular UNIX operating systems and GNU/Linux distributions.

The password store must be set up before the initial use:

```shell
  pass init <GPG_KEY_ID>
```

### KDE Wallet Manager

The kwallet backend utilizes the KDE Wallet Manager, which is installed by default on GNU/Linux distributions that have KDE as the default desktop environment. Please refer to the [KWallet Handbook](https://docs.kde.org/stable5/en/kwalletmanager/kwallet5/) for more information.

### In Memory

The in-memory backend stores the keys in memory. The keys are immediately deleted when the program exits.
