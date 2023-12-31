# Rules

该部分内容，主要围绕Treasurenet Production Portal中涉及的重点计算规则进行说明。

### 资质
#### 什么是资质准入？
资质准入，是Producer在将资产添加到Treasurenet中时，对您本身做的资质审查和准入。

#### 如何资质准入？
1. Producer 登录Production Portal，先进行 KYB（企业验证），再进行 KYC（个人验证），KYB 通过后才可进行KYC。
2. KYB 与 KYC 均为外部系统进行验证，KYC 通过后， Producer 准入通过。

注意：如果还没有通过 KYC 就中断准入流程，不保存已填写内容，下次进入系统后您需重新填写准入申请。

### 年审
#### 什么是年审？
年审，特指系统对实体矿产的载体——油井，进行的每年一次的资质审查。如果不完成年审，您资产的产量将无法铸造TAT。

#### 如何年审？
1. 当一口井添加成功满360天后，您将收到系统发送的站内信，同时可以在油井管理页面看到油质年审功能；
2. Producer需点击该功能，打开油质年审详情页，重新上传矿井油质化学成分等信息，提交申请；
3. Foundation Manager会审核您填写的信息
    * 审核通过，则年审通过，您的矿井新增365天的有效期
    * 审核不通过，您需要修改年审信息，再次提交

### 产量审计
#### 什么是产量审计？
产量审计，是将上月的产量与政府产量对比，计算出产量偏差比，根据产量偏差比会对Producer的保证金进行相应扣除，并修正产量和产量价值。

系统将根据产量审计后的产量价值，进行TAT的铸造，因此产量审计是很重要的一步，影响着您能获得的TAT的多少。

#### 如何触发产量审计？
1. 由Producer在 WellManagement 页面，选择“可铸造”状态的产量记录，点击【Mint TAT】。
2. 在弹窗内选择【yes】
    *  触发对该月产量的审计动作。
    *  根据产量审计结果铸造相应的TAT、扣除保证金。

#### 怎样进行产量审计？

1. 系统每天会分别统计每口矿井，您上传的产量总和；
2. 每月固定时间从官方平台，获取该口矿井的月度产量数据；
    * 当前资产使用的官方产量，是政府背书的产量数据，完全公开，无法篡改
3. 将上述两个值进行对比，计算出产量偏差比；
4. 根据产量偏差比修正生产商上月矿产产量和对应的市场价值。
5. 根据产量偏差比扣除保证金
    * 修正后市场价值=（官方公布上月产量/链上存储的生产商上月产量）*链上存储上月产量价值。
    * 产量偏差比=（链上存储生产商上月产量-官方公布上月产量）/官方公布上月产量*100%产量偏差比。
    * 扣除保证金规则：

   | 产量偏差比 | 修正产量 | 扣除保证金 |
   | ---    | ------   | ---   |
   | <0  | 生产商 | 不扣  |
   | 0  | 生产商  | 不扣 |
   |（0, 10%]   | 官方产量 | 不扣  |
   |（10%, 30%] | 官方产量  | 扣除的保证金=(修正后的市场价值*产量偏差比*保证金扣除比例 )<br/>保证金扣除比例=1%（该值由governance模块设置）  |
   | >30%| 官方产量 | 扣除的保证金=(修正后的市场价值*产量偏差比*保证金扣除比例 )<br/>产量偏差比=100%保证金扣除比例=1%（该值由governance模块设置） |


### 市场价值
#### 什么是市场价值？
市场价值特指Producer持有的资产，在真实交易市场中的价值。我们会在真实世界中的价格网站中，查询最新的资产单价进行相关计算。

Production Portal中的市场价值=您上传的资产产量*官方价格网站中的单价。

#### 怎样计算市场价值？
不同的资产，市场价值的计算方式有略微不同，目前的石油和天然气的市场价值计算规则为：
* OIL 市场价值（美元） = 当天产量 * 当天价格 * 油价折扣
* GAS 市场价值（美元） = 当天产量 * 当天价格

油价折扣为石油该种资产特有的规则，不同品相对应的不同价格，完全根据您添加矿井时的具体参数进行计算。

#### 油价折扣怎样计算？
在您添加矿井时，需要填写该矿井的折扣比、酸度、API比重，这三个值将影响该井的油价折扣大小，具体如下：
* 折扣比90% ：API比重 > 31.10 && 酸度 < 0.50%
* 折扣比85% ：API比重 > 31.10 && 酸度 >= 0.50%
* 折扣比80% ：API比重 <= 31.10 && 酸度 < 0.50%
* 折扣比75% ：API比重 <= 31.10 && 酸度 >= 0.50%


### 官方数据

#### 官方产量数据
1. 每月UTC时间的5日0:00AM，系统会定时获取官方产量数据；
2. 官方产量获取地址：https://www.petrinex.gov.ab.ca/publicdata
3. 系统将根据要审计产量的年月，在上述地址进行筛选；
4. 从筛选结果中根据月份、资产类型等条件找出要审计矿井的编号，记录对应的月度产量。

#### 官方产量价格
* 油的价格
1. 获取地址：https://oilprice.com/commodity-price-charts?page=chart&sym=CLY00
2. 获取规则：查询并记录昨日的收盘价格

* 汽的价格
1. 获取地址：https://www.eia.gov/dnav/ng/ng_pri_fut_s1_d.htm
2. 获取规则：查询并记录昨日的价格

### 铸造TAT
1. Producer在 WellManagement 页面，选择“可铸造”状态的产量记录，点击【Mint TAT】。
2. 在弹窗内选择【yes】，系统将根据产量审计后的矿产市场价值生成TAT，TAT铸造成功后直接转入您的账户中；
3. 如果您的矿井有受益人，受益人将按照其受益比例分得您铸造的TAT

例如：矿井1有两位受益人，A为Producer，受益比例80%，B为受益人1，受益比例20%，则矿井1在3月铸造100TAT，Producer账户内新增80TAT，受益人1账户新增20TAT。
