---
sidebar_position: 3
---

# TN-Gateway

TN Gateway plays a crucial role in the Treasurenet blockchain public chain. It serves as a data provider for various peripheral tools, websites, and Dapps within the Treasurenet ecosystem through its Restful API interface. TN Gateway ensures the trustworthiness of the service caller's identity through interactive authentication using OAuth2.

The data within TN-Gateway is sourced from the DataProvider Module. This module extracts and organizes data by monitoring events, conducting blockchain queries, and utilizing peripheral services like block browsers. The collected data is then stored in a database cluster on the server. TN-Gateway provides a wide range of data, including transaction records related to USTN Finance, staking activities, manufacturer and mineral information, production data, token transaction records, user information, and other relevant data. It also offers common indexes and statistical services for sorting.

Developers of peripheral services and DApps can access these contents by following the specified calling rules outlined in the API documentation, once they have obtained the necessary permissions.

## How to connect to TN-Gateway ?

:::caution
TN-Gateway public connection is not yet open
:::

To retrieve data from TN-Gateway:

1. Obtain the `client_id` and `client_secret` to pass the OAuth2 authentication.
2. Consult the API documentation to find the desired data and endpoints.
3. Make a Restful API request with the required parameters.
4. Receive the response containing the requested data.

The system will return your results in data according to the actual situation.

## Common errors.

| code | description      | solution                                                                                                                                                                                          |
| ---- | ---------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| -1   | system error     | Contact us via social media                                                                                                                                                                       |
| -2   | common error     | Determining error conditions from error messages                                                                                                                                                  |
| -3   | Params error     | Incorrect parameters, you may need to check the API description to ensure that the number and type of parameters are correct.                                                                     |
| -4   | Permission error | Please check whether your account has permission for this interface.                                                                                                                              |
| -5   | authorized error | Authentication failed, or authentication error. You need to check whether the access_token exists and whether it has expired. You can try to obtain the token again and initiate the query again. |
