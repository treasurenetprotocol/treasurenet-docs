# General Supply Framework

### Step 1: How many `$UNIT` tokens?

First, Treasurenet compares the actual RWA production rate amount against a Target Rate set by the DAO Governance module.

How does actual real-world asset production rate stand against Target Rate?
Reduce block reward based on the difference between actual rate and Target Rate.

Subsequently, there would be 3 general scenarios:

Fails to meet Target Rate - block reward reduced by 10% to 50%, depending on the magnitude of the difference
Meets Target Rate - block reward reduced by 10%
Surpasses the Target Rate - block reward reduced by 1% to 10%, depending on the magnitude of the difference
Total supply:

UNIT token supply may likely be between 700 million to 800 million.

This estimate is based on the following highlighted assumptions. However, it is vital to understand that the actual amount of future RWA production will determine the outcome. Specifically, more RWA production will lead to higher UNIT supply, and vice versa.

| Key Assumptions                                | Value                    | Description                                                                                            |
| ---------------------------------------------- | ------------------------ | ------------------------------------------------------------------------------------------------------ |
| Period                                         | `30,000,000` blocks      | Each period is ~ 1-year                                                                                |
| Initial block reward                           | `10 UNIT/block`          | For the initial 2 periods, block reward maintains constant, giving time for the RWA ecosystem to build |
| Target Rate (for RWA production)               | `10%`                    | Default Target Rate for periodic RWA production growth rate                                            |
| Maximum block reward reduction                 | `50%`                    | Lower edge case; if 0 RWA is produced, block reward aggressively reduces by 50%                        |
| Minimum block reward reduction                 | `1%`                     | Upper edge case; if the RWA growth rate is more than 1,000%, block reward reduces just 1%              |
| Default block reward reduction                 | `10%`                    | Default reduce; if RWA growth rate equals Target Rate, block reward reduces by 10%                     |
| Future RWA production growth rate distribution | PERT [`-50%, 15%, 500%`] | It is difficult to forecast the RWA production growth rate,                                            |

We assume the first 3 periods’ growth rate to be `500%`, as we develop more RWA connections.

Then, the steady-s`$TAT`e growth rate be modeled as a PERT Distribution,
defined by - `50%` as the low expected rate, `15%` as the expected rate, and `500%` as the maximum expected rate.

When simulated for 500 periods, UNIT supply may resemble this following distribution. For complete details, please stay tuned for the further releases.

![Expected_supply](/img/docs/expected_supply.png)

### Step 2: Who earns `$UNIT`?

After determining the total block reward, each block reward is awarded to Active Validator nodes and Active Super Validator nodes.

|        | Active Validator node | Active Super Validator node                 |
| ------ | --------------------- | ------------------------------------------- |
| Apple  | Red                   | USA                                         |
| Action | Stakes `$UNIT`        | -Stakes `$UNIT` -Bids `$TAT` (burns `$TAT`) |
| Reward | Base Rewards          | Base Rewards; Super Validator Rewards       |

`$UNIT` holders can stake `$UNIT` into any of the nodes to share in proportional Base Rewards. $`$TAT` holders can bid $`$TAT` as well to share in proportional Super Validator Rewards, which is the Bonus Stake described in Core Concepts.

In the long run, we estimate Super Validator Rewards make up for about ~30% of the block rewards.
The magnitude of Super Validator Rewards varies based on how competitive the $`$TAT` bids are between nodes, and based on how many Super Validators are there. Details to be further described in future release.
