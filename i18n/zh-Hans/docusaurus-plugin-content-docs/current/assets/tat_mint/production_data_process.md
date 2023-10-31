# Production Data Process

:::info
在开始之前 请确保您的主机拥有连通互联网的能力，已经正确安装了docker和docker-compose，并拥有可用的MongoAtlas数据库

docker的安装请参考[这里](https://docs.docker.com/engine/install/)

docker-compose的安装请参考[这里](https://docs.docker.com/compose/install/)

申请免费的MongoAtlas请参考[这里](https://www.mongodb.com/atlas)
:::

## Configuration

`./testnet.yaml`

```yaml
environment:
  - MSSQL_DATABASE_USER=  # MSSQL username
  - MSSQL_DATABASE_PASSWORD=  # MSSQL password
  - MSSQL_DATABASE_DBNAME= # MSSQL Database
  - MSSQL_DATABASE_SERVER= # MSSQL Server URL
  - MSSQL_DATABASE_PORT= # MSSQL Server Port
  - MSSQL_DATABASE_TABLE= # MSSQL Table Name
  - MONGO_URL=mongodb+srv://<USERNAME>:<PASSWORD>@<MONGODB URL>/<DATABASE>  # MONGODB INFO (It is recommended to use Mongo Atlas)
volumes:
  - ./config/wellinfo_testnet.js:/app/config/wellinfo.js

```

`./config/wellinfo_testnet.js`

```javascript

module.exports = {
    uniqueId: {
        "locationID-Here": ['OILuniqueId-Here', 'GASuniqueId-Here'],
    }
};
```

## How to use

```shell

docker-compose -f testnet.yaml up -d

```

## How to build

```shell

docker build -t treasurenet/productiondataprocess:1.0 .

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

const startDate = moment('2023-08-01');  //START Date
const endDate = moment('2023-10-05');  //END Date
```


## Data Schema that can be accepted by the ProdctionDataUploader automatic tool

```javascript

const RecordSchema = new mongoose.Schema({
    location_id: {type: Number, index: true, required: true},
    date: {type: Number, index: true, required: true},
    amount: Number,
    month: Number,
    uniqueId: {type: String, required: true},
    status: {type: Number, default: dict.STATUS.UNUSED},  // 0:未使用 1：已使用
    timestamp: {type: Date, default: Date.now},
});

const OilDataRecordModel = mongoose.model('ProductionDataRecord_OIL', RecordSchema);
const GasDataRecordModel = mongoose.model('ProductionDataRecord_GAS', RecordSchema);

```
