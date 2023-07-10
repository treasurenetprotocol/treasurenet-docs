# Market Value

## What is market value?

`$TAT` is intended to record the economic value of the underlying various asset production.

Here, market value refers to the value of natural gas and oil produced as observed in real-world trading markets. Treasurenet’s Oracle module uses the Oracle Feeder Tool to query for values from whitelisted data sources.

## How to calculate market value?

Different assets have different ways of calculating market value. But, the general framework would be to

1. observe a publicly acceptable financial value and
2. apply any relevant discount factor

Here, the current market value calculation is simple for natural gas and oil, due to the naturally observable qualities of the asset.

```
- OIL Market value (USD) = Daily production * Daily price * Oil price discount
- GAS Market value (USD) = Daily production * Daily price
```

## What is the Oil price discount?

The oil price discount is a unique rule for this asset class, different oil grades correspond to different values. Acidity, and API gravity of the Oil production matters. These three values will affect the size of the oil price discount for this well, specifically as follows:

```
- 90% discount ratio: API gravity > 31.10 && Acidity < 0.50%
- 85% discount ratio: API gravity > 31.10 && Acidity >= 0.50%
- 80% discount ratio: API gravity <= 31.10 && Acidity < 0.50%
- 75% discount ratio: API gravity <= 31.10 && Acidity >= 0.50%
```
