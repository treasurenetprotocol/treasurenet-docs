---
sidebar_position: 3
---

# Gas and Fees

The concept of Gas represents the amount of computation required to execute specific operations on the state machine.

Gas originates from Ethereum, where a small amount of token value is paid to the system to cover the computational cost of operations. This prevents unrestricted growth of computational workload in EVM transactions. Each operation in the EVM consumes a certain amount of Gas, usually a fraction of the native token. Users need to pay for the operations they wish to perform, which typically include transactional operations such as transfers or contract invocations and deployments.

Similar to Ethereum, TN (Treasurenet) utilizes the concept of Gas, which reflects the resource usage during execution. Operations on TN are represented as writes to the blockchain ledger.

During message execution on TN, fees are calculated and charged to the users. The fee is calculated based on the total Gas consumed during message execution, where the fee equals Gas multiplied by the Gas price.

## Matching EVM Gas Consumption

TN is an EVM-compatible blockchain system that supports Ethereum [Web3](https://web3js.readthedocs.io/en/v1.7.5/) tools. Therefore, Gas consumption must align with other EVM systems, especially Ethereum.

The main difference between EVM and Cosmos state transitions is that EVM uses a gas table to determine the cost for each OPCODE, while Cosmos charges Gas fees for each CRUD operation based on the cost per byte accessed in the GasConfig.

```golang
// GasConfig defines gas cost for each operation on KVStores
type GasConfig struct {
	HasCost          Gas
	DeleteCost       Gas
	ReadCostFlat     Gas
	ReadCostPerByte  Gas
	WriteCostFlat    Gas
	WriteCostPerByte Gas
	IterNextCostFlat Gas
}
```

To match the gas consumption of the EVM, the gas consumption logic in the SDK is ignored. Instead, gas consumption is calculated by subtracting the remaining gas from the state transition from the gas limit defined in the message and adding the refund.

To ignore the gas consumption of the SDK, we reset the transaction GasMeter count to 0 and manually set it to the value calculated by the EVM module when execution is completed.

### AnteHandler

The [AnteHandler](https://docs.cosmos.network/main/basics/gas-fees.html#antehandler) in the Cosmos SDK performs basic checks before transaction execution. These checks typically include signature verification, transaction field validation, transaction fees, etc.

Regarding gas consumption and fees, the AnteHandler checks if the user has sufficient balance to pay for the transaction cost (amount plus fees) and whether the gas limit defined in the message is greater than or equal to the inherent gas calculation of the message.

## Gas Refunds

In the EVM, gas can be specified before execution. The specified total gas is consumed at the start of execution (during the AnteHandler step), and if there is any remaining gas after execution, the remaining gas is refunded to the user.
