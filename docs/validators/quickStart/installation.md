---
sidebar_position: 1
---

# Installation

## Install Binaries

Treasurenet is a high-performance blockchain network that uses the Proof-of-Stake (PoS) consensus mechanism. It is compatible with Ethereum and also incorporates Tendermint and Ethereum's technologies to implement a PoS+BFT (Byzantine Fault Tolerance) consensus mechanism. This combination allows Treasurenet to achieve fast transaction processing times, high throughput, and strong security guarantees.

## Single Node Deployment

1. Make sure you have set up the go environment and git.

   :::caution
   ❗️ Treasurenet build requires Go version 1.18+ Golang website download: https://golang.org/dl/
   :::

2. Open the official download address and select the corresponding system version.

3. To enter the Installation package storage path and create a go folder under ~ and then enter the go folder you may use the following commands in your terminal.

   :::note
   `mkdir ~/go && cd ~/go` <br />
   `wget https://go.dev/dl/go1.18.linux-amd64.tar.gz`  
   :::

4. Add the /usr/local/go/bin directory to the PATH variable (GOPATH environment variable configuration in linux)

:::note
Write and save in `etc/profile` or `vi .bashrc` <br />
`export GOPATH=$HOME/go` <br />
`export PATH=$PATH:$GOPATH/BIN` <br />
Update the configuration file `source etc/profile` or `source .bashrc` <br />
View Environment Variables <br />
`go env`
:::

### Github

To clone the code and build Treasurenet, you can run the following commands in your terminal:

```shell
    git clone https://github.com/treasurenetprotocol/treasurenet.git
    go env -w GO111MODULE=on
    cd treasurenet
    go mod tidy
    make install
```

Check for proper Installation

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
