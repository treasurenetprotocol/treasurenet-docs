---
sidebar_position: 1
---

# 地址转换器

一个简单的以太坊（ETH）、COSMOS 和 Treasurenet 地址之间的转换器。

### 安装方法

```shell
    npm install @treasurenet/address-converter
```

### 使用方法

#### 转换器 (Converter)

```javascript
import {
  ethToTreasurenet,
  treasurenetToEth,
  ethToCosmos,
  cosmosToEth,
} from "@treasurenet/address-converter";

let address = ethToTreasurenet("0xe2D61e49ff8a9d724CC54d338D8076F878aC6b71");
// "treasurenet1uttpuj0l32whynx9f5ecmqrklpu2c6m3973048"

let address = treasurenetToEth(
  "treasurenet1uttpuj0l32whynx9f5ecmqrklpu2c6m3973048"
);
// "0xe2D61e49ff8a9d724CC54d338D8076F878aC6b71"

let address = ethToCosmos("0xe2D61e49ff8a9d724CC54d338D8076F878aC6b71");
// "cosmos1uttpuj0l32whynx9f5ecmqrklpu2c6m37sldk9"

let address = cosmosToEth("cosmos1uttpuj0l32whynx9f5ecmqrklpu2c6m37sldk9");
// "0xe2D61e49ff8a9d724CC54d338D8076F878aC6b71"
```

#### 解码器

```javascript
import { ETH, TREASURENET, COSMOS } from "@treasurenet/address-converter";

let hex = ETH.decoder("0xe2D61e49ff8a9d724CC54d338D8076F878aC6b71");
// hex.toString('hex') === "e2d61e49ff8a9d724cc54d338d8076f878ac6b71"

hex = TREASURENET.decoder("treasurenet1uttpuj0l32whynx9f5ecmqrklpu2c6m3973048");
// hex.toString('hex') === "e2d61e49ff8a9d724cc54d338d8076f878ac6b71"

hex = COSMOS.decoder("cosmos1uttpuj0l32whynx9f5ecmqrklpu2c6m37sldk9");
// hex.toString('hex') === "e2d61e49ff8a9d724cc54d338d8076f878ac6b71"
```

#### 编码器

```javascript
import { ETH, TREASURENET, COSMOS } from "@treasurenet/address-converter";

let address = ETH.encoder(
  Buffer.from("e2d61e49ff8a9d724cc54d338d8076f878ac6b71", "hex")
);
// address === "0xe2D61e49ff8a9d724CC54d338D8076F878aC6b71"

address = TREASURENET.encoder(
  Buffer.from("e2d61e49ff8a9d724cc54d338d8076f878ac6b71", "hex")
);
// address === "treasurenet1uttpuj0l32whynx9f5ecmqrklpu2c6m3973048"

address = COSMOS.encoder(
  Buffer.from("e2d61e49ff8a9d724cc54d338d8076f878ac6b71", "hex")
);
// address === "cosmos1uttpuj0l32whynx9f5ecmqrklpu2c6m37sldk9"
```
