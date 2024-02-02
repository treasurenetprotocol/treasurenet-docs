---
sidebar_position: 1
---

# 操作指南

## USTN 金融

### 兑换

#### Exchange (UNIT → USTN)
输入想要兑换成USTN的UNIT数量，点击'Submit'提交。输入的数字要大于0且小于等于账户余额和兑换上限，否则无法成功提交。

规则说明：

1.用户提供UNIT兑换出USTN，根据UNIT数量、UNIT单价、USTN单价计算可兑换的USTN数目；

2.判断可兑换USTN数目是否大于市场所需USTN上限：

  - 如果>市场所需USTN上限，兑换失败；
  
  - <= 市场所需USTN上限，铸造USTN发送至用户账户。
  
3.可兑换USTN数目（结果向下取整） =( UNIT数目*UNIT单价) / USTN单价 ；

4.市场所需USTN上限 = max[ 系统已铸造USTN总量，5000 0000 ]；

5.系统已铸造USTN总数 >= 5000 0000时，兑换USTN入口将被关闭。

![USTN_Finance_Exchange](/img/docs/2.1USTN_Finance_Exchange.png)

在MetaMask进行确认，继续兑换则点击'Confirm'，中止操作则点击'Reject'。

![MetaMask](/img/docs/MetaMask.png)

点击'Confirm'后，系统会提示'Exchanged successfully!'。

![exchanged_successfully](/img/docs/2.1.3exchanged_successfully.png)

点击'VIEW HISTORY'，出现之前所有的兑换记录。通过右上角的Type可进行筛选，如选择 UNIT to USTN，列表中展示所有 UNIT to USTN的信息。

![VIEW_HISTORY](/img/docs/2.1.2VIEW_HISTORY.png)

#### Repurchase (USTN → UNIT)

输入想要回购的UNIT数量，点击'Submit'提交。输入的数字要大于0且小于等于账户余额，否则无法成功提交。

规则说明：

1.用户向系统提供USTN回购UNIT，根据USTN数量、USTN单价、UNIT单价计算用户可回购的UNIT数量；

2.判断用户回购UNIT数目是否 > 系统可回购UNIT上限：

  - <= 系统可回购上限，销毁用户提供的USTN，将回购UNIT返还给用户；
  
  - 如果>系统可回购上限，UNIT回购失败，返还用户提供的USTN。
  
3.系统可回购UNIT上限 = （系统USTN总量 - 市场所需USTN上限）*USTN单价/ UNIT单价；

4.UNIT回购功能开放、关闭条件：

  - 系统USTN总量 > 市场所需USTN上限，开放UNIT回购
  
  - 系统USTN总量 <= 市场所需USTN上限，关闭UNIT回购
  
![Repurchase](/img/docs/Repurchase.png)


在MetaMask进行确认，继续兑换则点击'Confirm'，中止操作则点击'Reject'。

![MetaMask](/img/docs/MetaMask.png)

点击'Confirm'后，系统会提示'Exchanged successfully!'。

![exchanged_successfully](/img/docs/2.1.3exchanged_successfully.png)


### 2. Deposit
#### Deposit USTN

输入想要存入的USTN数量，点击'Submit'进行提交。

注意：输入的数字要大于0且小于等于账户余额，否则无法成功提交。


![Deposit](/img/docs/2.2Deposit.png)

点击'VIEW HISTORY'，出现之前所有的存取记录。

![Deposit_HISTORY](/img/docs/2.2.2Deposit_HISTORY.png)

#### Withdraw USTN

输入想要取出的USTN数量，点击'Submit'进行提交。

注意：输入的数字要大于0且小于等于存入的数量，否则无法成功提交。

![Withdraw](/img/docs/Withdraw.png)


### 3. Loan
#### Loan

输入想要借的代币数量，会自动显示另一种代币的等价值，点击’Submit‘进行提交。

注意：输入的数字要大于0，否则无法成功提交。

![Lendinfg](/img/docs/2.3Lending.png)

点击'VIEW HISTORY'，出现之前所有的借还记录。

![Loan_history](/img/docs/2.3.1Loan_history.png)

点击Details，可以查看借款详情。

![Loan_Detail](/img/docs/2.3.1.4Loan_Detail.png)

#### Repay

在借款历史记录中，可以点击'Repayment'进行还款。

![Repayment](/img/docs/Repayment.png)

输入要还款的金额。

注意：输入的数字要大于0且小于等于该笔借款数量，否则无法成功提交。

![Repay](/img/docs/2.3.1.1Repay.png)

还款成功则显示'Repaid successfully!'; 全部还完则显示'Your loan has been paid off totally!'。

点击'Payment History' tab，可以查看之前的还款记录。

![Payment_History](/img/docs/2.3.2Payment_History.png)

#### Add collateral

当某笔贷款的抵押品的价值/贷出USTN的价值<=预警线时，系统会对用户发出预警，提示应当补充抵押品。

![Add collateral](/img/docs/2.3.1.3Add_collateral.png)

点击‘Add collateral’增加抵押品，在弹窗内输入抵押品数量。

![Add](/img/docs/2.3.1.3Add.png)

点击‘Submit’后，如果增加后的抵押品价值/贷出USTN价值>预警线，则不再预警。系统会提示‘Add collateral successfully! The alert status has been lifted.’。

![Add_collateral_successfully](/img/docs/2.3.1.4Add_collateral_successfully.png)

### 4. Auction

Auction界面可以可查询到所有正在拍卖的标的。

![Auotion_Pool](/img/docs/2.4Auotion_Pool.png)

点击‘Place a bid’可以参与竞标。

![bid](/img/docs/2.4.1-2bid.png)

点击'My bidding history'可以查看我自己参与竞买的记录。

![bidding_history](/img/docs/2.4.2bidding_history.png)

如果用户不是当前标的的最高出价人，点击‘Extract USTN’，可随时将自己投入的USTN提取出来。

![Extract_USTN](/img/docs/2.4.2.2Extract_USTN.png)

如果当前用户成功中标，点击‘Extract auction’，可将标的物提取至个人账户。

![Extract_auction](/img/docs/2.4.2.3Extract_auction.png)

点击‘Details’，可以查看某个标的的竞买详情，包括标的信息、中标人信息、竞拍人信息等。


![bid_Details](/img/docs/2.4.2.1bid_Details.png)

![bid_Details](/img/docs/2.4.2.1-2bid_Details.png)


### 5. Profile
#### My Assets

点击Profile可以进入个人中心页面，此页面展示用户USTN余额、存款余额、待还款额等关键数据的统计值。

其中，我的资产=USTN余额Balance+USTN存款余额Deposits；USTN 余额Balance，展示当前账户的USTN余额。

![Profile](/img/docs/2.5Profile.png)

点击My Assets中的三个板块中的按钮和'Detail'分别可以进入Exchange、Deposit、Loan页面；点击My auction板块的'Extract USTN'按钮和'Extract auction'按钮可以进入'My Bidding History'界面。

:::info
🚧 Documentation is in progress.
:::
