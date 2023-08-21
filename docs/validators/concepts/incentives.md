---
sidebar_position: 1
---

# Block Rewards

To encourage active participation in the voting process, Treasurenet provides rewards for nodes involved in consensus, including delegators, active validators, and proposers.

Treasurenet will select a Proposer from the list of validators based on certain rules, who will be responsible for creating blocks. After a block is successfully created, the block reward (Unit Token) is distributed to the accounts of all participants in the consensus.

The consensus reward consists of the block issuance reward and the total transaction fees for each block. We allocate the consensus reward into different portions: community governance, block proposer reward, additional reward for validator, and PoS reward.

<br>

**<center>UNIT supply is finite and disinflationary.</center>**

_<center>Logic similar to BTC supply, where block reward reduces so the block reward sum is a finite sum of the infinite series.</center>_

_<center>However for TN, supply is determined by future asset production.<br> Disfinationary means emission slows down year-on-year.</center>_


<br>

Period **n** block reward **r** is defined:

<center><font size=5>r_n=f_n \times r_{n-1}</font></center><br>

Block reward factor (**f**) in period **n** is set:

<center><font size=5>50\% \leq f_n \leq 90\%</font></center>

<center><font size=2 color=gray>Block reward will be reduced by 1% (where f=99%) to 50% (where f=50%)</font></center><br>


To determine **f_n** , TN compares TAT minted between 2 previous periods where, a delta (**d**) is defined for period **n**:

<center><font size=5>d_n = \frac{\frac{TAT_{from period n-1}}{TAT_{from period n-2}}}{1+g}</font></center>

<center><font size=2 color=gray>Delta (d) looks back at 2 previous periods，period n-1 and period n-2 to determine d.</font></center><br>



- Where, asset production goal (**g**) is set to 10% by default. **g** may be changed by **DAO**.

  + When d_n=0, f_n=50%; 

	_This is the maximum reduction scenario where there is no new TAT_

  + When 0<d_n<1, f_n is scaled, so that 75%<f_n<90%.

	_Specifically, f_n=0.75+[(0.9-0.75)]d_n_

  + When  d_n \geq 1 , f_n is scaled, so that 90% \leq f_n \leq 99%

	_Specifically, f_n=MIN(0.99, 0.01*ROUNDDOWN(d_n-1)+0.9)_

  + Note that when  d_n \geq 10, f_n=99%; 

	_This is the minimum reduction scenario where there are more than 10x new TAT_


- **Pre-selected f key values:** 50%, 75%, 90%, 99%

	Pre-selected f key values rationale：

  + **50%** is the most aggressive block reward reduction scenario, where this will be the same as the BTC ‘halving’ events. This signals an inactive asset ecosystem. 

	_Selected 50% so that at worst with 0 asset production, TN references BTC halving._

  + **75%** is the lower bound of the expected reduction scenario, where there is low asset production. This signals a slowing ecosystem, like a recession. 	

	_Selected 75% to be lower bound so that penalty for slowing asset production is not too great, allowing future block rewards to not be dramatically reduced for an off year._

  + **90%** is the targeted reduction scenario, where asset production is at grow target. This signals a normal productive ecosystem, like a steady state. 

	_Selected 90% so that future validators obtain more block rewards as the ecosystem steadily increases asset production records._

  + **99%** is the upper bound of the expected reduction scenario, where there is very high asset production. This signals a fast growing ecosystem, like an expansion. 

	_Selected 99% so that in rare case when asset production is vastly increasing, block rewards are kept nearly unchanged._


- **Pre-selected g value:** 10%

	Pre-selected g key values rationale

  + **10%** is targeted asset production growth rate, changeable by DAO vote. 

	_Selected 10% so that goal is easily attainable early on._


_<font color=gray>UNIT emission is almost like a game, where **High** asset production, with respect to a production goal, keeps block reward factor **f** **high**, but a **failure** will cause a reward ‘**halving**’ event.</font>_


## POS Reward

Recall that in period n, the block reward (**r**) is: **r_n**

Block reward **r_n** is split into default values and emitted to recipients: 
<center><font size=5>r_n=CMP+PR+SVR+BR</font></center>

- Community Pool  **CMP**<br>
  _CMP=1%_ 

- Proposer Reward   **PR**<br>
  _PR \leq 5%_

- Super Validator Reward   **SVR**<br>
  _SVR=SVF  \times \frac{of Active Super Validators}{of all Active Validatorsr}  \times r <br>
	SVF=60% Super Validator Factor determines the Super Validator Reward_

- Base Reward   **BR**<br>
  _BR=100%-CMP-PR-SVR<br>
  BR \leq 44%_

