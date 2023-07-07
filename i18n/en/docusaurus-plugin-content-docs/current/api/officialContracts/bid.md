---
sidebar_position: 1
---

# Bonus Stake

合约信息

|Environment|Address|ABI File|
|--|--|--|
|testnet|--|[📥](http://)|
|mainnet|--|[📥](http://)|


## stake TAT token

- Function: **bidTAT** 
- Type: **Transaction**

    质押Bonus Stake的合约函数，参数是stake的Tat token数量。
    
    ❗️请注意：无论投入的Tat Token是否为您取得了额外的奖励（Bonus Block Reward），您投入的Tat Token都将被销毁。
    
    ❗️请注意：请确保您的账户和您所属的Validator节点一切正常，如果您的账号找不到对应Validator，或者此时此刻您的Validator运行异常，Tat Token销毁之后将不能给您带来任何额外收益。
    
    Input
    
    |parameter name|type|description|
    |--|--|--|
    |amount|uint|Tat token 数量|
    
    Result
    
    |parameter name|type|description|
    |--|--|--|
    |result|boolean|正确返回true|



- Event: bidBurn

    监听此事件将可以获得所有人通过"bidTAT"函数正确质押的数据。
    
    Parameters
    
    |parameter name|type|description|
    |--|--|--|
    |sender|address|stake用户的地址|
    |amount|uint|Tat token 数量|

