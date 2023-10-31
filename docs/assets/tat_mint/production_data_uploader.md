# Production Data Uploader

:::info
Because development has not yet been completely completed, the project remains private for the time being and will be made public soon.
:::

[GitHub](https://github.com/treasurenetprotocol/treasurenet-tnservices-productiondata-uploader)

## Configuration

`./testnet.yaml`

```yaml

environment:
      - MONGO_URL=mongodb+srv://<USERNAME>:<PASSWORD>@<MONGODB URL>/<DATABASE>  # MONGODB INFO (It is recommended to use Mongo Atlas)
      - EVM_ENDPOINT=https://node0.testnet.treasurenet.io  # Treasurenet Node Endpoint
      - UPLOADER=  # Uploader EVM Address
      - SENDER=  # Uploader EVM Private Key
      - TNGATEWAY_ACCESS_TOKEN_URL=https://tngateway.testnet.treasurenet.io/oauth/access_token  # TNGATEWAY Get Access Token URL 
      - TNGATEWAY_CLIENT_ID= # TNGATEWAY Oauth2.0 Client ID
      - TNGATEWAY_CLIENT_SECRET= # TNGATEWAY Oauth2.0 Client Secret
      - TNGATEWAY_SCOPE= # TNGATEWAY Oauth2.0 Scope
      - TNGATEWAY_API_URL=https://tngateway.testnet.treasurenet.io/api # TNGATEWAY API URL

```

## How to use

```shell

docker-compose -f testnet.yaml up -d

```
## How to build 

```shell

docker build -t treasurenet/productiondatauploader:1.0 .

```

## How to change frequency

`./index.js`

```javascript
const rule = new schedule.RecurrenceRule();
rule.hour = [0, 12];
```

## Want to upload production volume for a specific date

`./index.js`

```javascript

const startDate = '2023-01-01'  //Start Date
for (let i = 0; i < 90; i++) {  //times
    ...
}

```
