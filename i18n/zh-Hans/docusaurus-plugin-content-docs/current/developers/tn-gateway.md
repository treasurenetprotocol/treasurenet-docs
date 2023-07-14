---
sidebar_position: 3
---

# TN-Gateway

TN Gateway 在 Treasurenet 区块链公链中起着至关重要的作用。它通过其 Restful API 接口，作为 Treasurenet 生态系统内各种外围工具、网站和 Dapps 的数据提供者。TN Gateway 通过使用 OAuth2 进行交互式认证，确保服务调用者身份的可信度。

TN-Gateway 内的数据来自 DataProvider 模块。该模块通过监控事件、进行区块链查询和利用外围服务如区块浏览器来提取和组织数据。然后将收集的数据存储在服务器的数据库集群中。TN-Gateway 提供广泛的数据，包括与 USTN Finance 相关的交易记录、质押活动、制造商和矿物信息、生产数据、代币交易记录、用户信息以及其他相关数据。它还为排序提供通用索引和统计服务。

外围服务和 DApps 的开发者可以通过遵循 API 文档中概述的指定调用规则来访问这些内容，一旦他们获得了必要的权限。

## 如何连接 TN-Gateway

:::caution
TN-Gateway 公共连接尚未开放
:::

从 TN-Gateway 获取数据：

1. 获取 client_id 和 client_secret 以通过 OAuth2 身份验证。
2. 查阅 API 文档以找到所需数据和端点。
3. 使用所需的参数发出 Restful API 请求。
4. 收到包含所请求数据的响应。

系统将根据实际情况返回数据形式的结果。

## 常见错误

| 代码 | 描述     | 解决方案                                                                                               |
| ---- | -------- | ------------------------------------------------------------------------------------------------------ |
| -1   | 系统错误 | 通过社交媒体联系我们                                                                                   |
| -2   | 常见错误 | 从错误消息中确定错误条件                                                                               |
| -3   | 参数错误 | 参数不正确，您可能需要检查 API 描述以确保参数的数量和类型是正确的。                                    |
| -4   | 权限错误 | 请检查您的账户是否具有此接口的权限。                                                                   |
| -5   | 授权错误 | 认证失败，或者认证错误。您需要检查 access_token 是否存在以及是否已过期。您可以尝试再次获取令牌并再次发 |