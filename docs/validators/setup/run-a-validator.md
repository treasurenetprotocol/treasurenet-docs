---
sidebar_position: 1
---

# Run a Validator

## Create Your Validator

您的节点公钥能够被用来通过质押Unit Token来创建一个节点。你可以通过下面的命令找到您的Validator公钥。

```shell
    treasurenetd tendermint show-validator
    
    {"@type":"/cosmos.crypto.ed25519.PubKey","key":"ZZ35B4oaIo2Az2+Pt8QW/3xIaRPRRXFKb14mmzvdjFw="}
```
:::caution
  ❗️ 注意：绝对不要使用test模式的keyring backend来创建您的主网validator key。这样做可能会导致您的资金通过eth_sendTransaction JSON-RPC节点远程访问，造成资金损失。

  参考：[Security Advisory: Insecurely configured geth can make funds remotely accessible](https://blog.ethereum.org/2015/08/29/security-alert-insecurely-configured-geth-can-make-funds-remotely-accessible)
:::

想要在测试网启动您的Validator节点，仅需要使用如下命令

```shell

treasurenetd tx staking create-validator \
  --amount=158000000000000000000aUnit \
  --pubkey=$(treasurenetd tendermint show-validator) \
  --moniker="choose a moniker" \
  --chain-id=<chain_id> \
  --commission-rate="0.05" \
  --commission-max-rate="0.10" \
  --commission-max-change-rate="0.01" \
  --min-self-delegation="1000000" \
  --gas="auto" \
  --gas-prices="0.025aUnit" \
  --from=<key_name>


```

## Edit Validator Description

您可以编辑validator的公开表述。这些信息用于标识您的validator，并且staker将根据这些信息来觉得作为哪个validator的delegator进行质押。

确保每一项都已经提供，如果其中的一些参数没有被提供，这项内容将为空（moniker默认为设备名称）。

--identity可用于通过 Keybase 或 UPort 等系统验证身份。与 Keybase 一起使用时，应使用由[keybase.io](https://keybase.io/) --identity生成的 16 位字符串填充帐户。这是一种跨多个在线网络验证您的身份的加密安全方法。Keybase API 允许我们检索您的 Keybase 头像。这就是您可以将徽标添加到验证器配置文件的方式。

<key_name> 用于指定您正在编辑的验证器。如果您选择不包含某些标志，请记住必须包含 --from 标志以标识要更新的validator

```shell

treasurenetd tx staking edit-validator
  --moniker="choose a moniker" \                #The validator's name
  --website="https://www.treasurenet.io" \      #The validator's (optional) website
  --identity=6A0D65E29A4CBC8E \                 #The (optional) identity signature (ex. UPort or Keybase)
  --details="To infinity and beyond!" \         #The validator's (optional) details
  --chain-id=<chain_id> \                       #The network chain ID
  --from=<key_name> \                           #Name or address of private key with which to sign
  --commission-rate="0.10"                      #The new commission rate percentage


```

## View Validator Description

```shell
    treasurenetd query staking validator <account>
```

## Track Validator Signing Information

```shell
    treasurenetd query slashing signing-info <validator-pubkey> --chain-id=<chain_id>
```

## Unjail Validator

当Validator因停机、双签等原因而“Jail”时，您必须从validator操作员账户提交Unjail交易才能再次获得区块奖励。

```shell
    treasurenetd tx slashing unjail --from=<key_name> --chain-id=<chain_id>
```

## Confirm Your Validator is Running

```shell
    treasurenetd query tendermint-validator-set | grep "$(treasurenetd tendermint show-address)"
```

## Common Problems

### My validator voting power is 0.

您的validator是Jail状态。 这通常是因为validators没有参与最近10000个区块中的500次投票或者validator进行过双签。

如果确认您的validator因为出现上述动作而造成Jail状态，您可以尝试通过这些方式恢复。

首先，如果validator没有运行，尝试启动它。

```shell
    treasurenetd start
```

等待节点更新至最新的区块（时间取决于您的节点和最新区块之间的差距），然后尝试unjail您的validator。

可以参考[unjail your validator章节](#unjail-validator)

最后，检查您的validator的voting power是否恢复了正常

```shell
    treasurenetd status
```

### My node crashes because of ```too many open files```.

Linux 可以打开（每个进程）的默认文件数是 1024。 treasurenetd 如果打开超过 1024 个文件,就可能会导致进程崩溃。 

快速的解决方式是运行 ```ulimit -n 4096```（即增加允许打开的文件数），然后使用``` treasurenetd start``` 重新启动进程。 

如果您使用 systemd 或其他进程管理器来启动 treasurenetd，则可能需要在该级别进行一些配置。 解决此问题的示例 systemd 文件如下：

```shell
# /etc/systemd/system/treasurenetd.service
[Unit]
Description=TreasurenNet Node
After=network.target

[Service]
Type=simple
User=ubuntu
WorkingDirectory=/home/ubuntu
ExecStart=/home/ubuntu/go/bin/treasurenetd start
Restart=on-failure
RestartSec=3
LimitNOFILE=4096

[Install]
WantedBy=multi-user.target
```
