# Production Data Process

:::info
Before you begin, please ensure that your host has the ability to connect to the Internet, has docker and docker-compose installed correctly, and has a available MongoAtlas database.

For the installation of docker, please refer to [here](https://docs.docker.com/engine/install/)

For the installation of docker-compose, please refer to [here](https://docs.docker.com/compose/install/)

To apply for free MongoAtlas, please refer to [here](https://www.mongodb.com/atlas)
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
