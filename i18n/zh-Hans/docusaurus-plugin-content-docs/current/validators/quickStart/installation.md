---
sidebar_position: 1
---

## 安装二进制文件

Treasurenet 是一款非常快速的 POS 区块链，并且整体兼容以太坊。Treasurenet 集成看 Tendermint 和 ethereum 实现了 POS+BFT 的共识机制。

## 单节点部署

1. 确保您按照了 go 环境和 git
   :::caution
   ❗️ Treasurenet 构建需要安装[Go](https://golang.org/dl/) 版本 1.18+
   Golang 官网下载地址: https://golang.org/dl/
   :::

2. 打开官网下载地址选择对应系统版本。

3. 进入安装包存放路径，在 ~ 下创建 go 文件夹，并进入 go 文件夹。
   :::note
   `mkdir ~/go && cd ~/go` <br />
   `wget https://go.dev/dl/go1.18.linux-amd64.tar.gz`  
   :::

4. 添加/usr/local/go/bin 目录到 PATH 变量中(linux 中 GOPATH 环境变量配置)

:::note
在`etc/profile`或者`vi .bashrc`中写入并保存 <br />
`export GOPATH=$HOME/go` <br />
`export PATH=$PATH:$GOPATH/BIN` <br />
更新一下配置文件 <br />
`source etc/profile` 或者 `source .bashrc` <br />
查看环境变量 <br />
`go env`
:::

### Github

克隆代码并 build treasurenet

```shell
    git clone https://github.com/treasurenetprotocol/treasurenet.git
    go env -w GO111MODULE=on
    cd treasurenet
    go mod tidy
    make install
```

检查是否正确安装

```shell
    treasurenetd version
```

### Docker

```shell
    make build-docker
```

```shell
    docker run -it -p 26657:26657 -p 26656:26656 -v ~/.treasurenetd/:/root/.treasurenetd tn/treasurenet:latest treasurenetd version

    # To initialize
    # docker run -it -p 26657:26657 -p 26656:26656 -v ~/.treasurenetd/:/root/.treasurenetd tn/treasurenetd:latest treasurenetd init test-chain --chain-id test_9000-2

    # To run
    # docker run -it -p 26657:26657 -p 26656:26656 -v ~/.treasurenetd/:/root/.treasurenetd tn/treasurenetd:latest treasurenetd start

```
