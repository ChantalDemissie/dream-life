import React from 'react';
import * as V from 'victory';

import CustomLabel from './CustomLabel.js'
import UnicodeDataSymbol from './UnicodeDataSymbol.js'

import './SavingsTimeline.css'

class SavingsTimeline extends React.Component {
  phases = {
    SAVING_FOR_A_HOUSE: 1,
    SAVING_FOR_RETIREMENT: 2,
    RETIREMENT: 3,
  };
  
  ageCutoff = 80;
  interestRateAfterTax = 0.05;
  incomeTaxRate = 0.3;

  constructor(props) {
    super(props);

    this.phaseTransitionLabels = new Map();
    this.phaseTransitionLabels.set(this.phases.SAVING_FOR_A_HOUSE, 'Buy House');
    this.phaseTransitionLabels.set(this.phases.SAVING_FOR_RETIREMENT, 'Retire');

    this.phaseTransitionSymbols = new Map();
    this.phaseTransitionSymbols.set(this.phases.SAVING_FOR_A_HOUSE, "🏠");
    this.phaseTransitionSymbols.set(this.phases.SAVING_FOR_RETIREMENT, "🌟"); 

    console.log("construct")
  }

  convertIntegerToDollarString(integer) {
    if (integer >= 1E6) {
      return  (`$${integer / 1E6}m`);
    } else if (integer >= 1E3) {
      return (`$${integer / 1000}k`);
    }
    return (`$${integer}`);
  }

  render() {
    console.log("render")
    this.generate();

    console.log("RENDER", this.props.jobSalary);
    return (
      <div style={{display: "flex", flexWrap: "wrap"}}>
        <V.VictoryChart
          //domainPadding={20}
          theme={V.VictoryTheme.material}
          width={600}
          height={200}
          padding={{left: 90, top: 50, right: 10, bottom: 50}}

        >
          <V.VictoryAxis
            // tickValues={[]}
            // tickFormat={["Q1", "Q2", "Q3", "Q4"]}
            label="Age"
            axisLabelComponent={<V.VictoryLabel dy={25} />}
          />
          <V.VictoryAxis
            dependentAxis
            tickFormat={(x) => this.convertIntegerToDollarString(x)}
            label="Savings"
            axisLabelComponent={<V.VictoryLabel dy={-60} />}
          />
          <V.VictoryArea
            style={{
              data: { 
                fill: "green", 
                stroke: "black",
                strokeWidth: 3, 
                strokeOpacity: 0.1,
                fillOpacity: 0.4,
              },
              labels: {
                fontSize: 15,
                fill: "black",
                stroke: "black",
                strokeWidth: 0.1,
                fillOpacity: 1.0,
                opacity: 1.0,
                padding: 20,
                //background: "blue",
              },
            }}
            data={this.savingsPerYear}
            x="age"
            y="savings"
            //interpolation="natural"
            //labelComponent={<CustomLabel dy={-20} />}
          />
          <V.VictoryScatter
            // style={{
            //   data: { 
            //     fill: "black", 
            //     stroke: "black",
            //     strokeWidth: 3, 
            //     strokeOpacity: 0.1,
            //     fillOpacity: 0.4,
            //   },
            //   labels: {
            //     fontSize: 15,
            //     fill: "black",
            //     stroke: "black",
            //     strokeWidth: 0.1,
            //     fillOpacity: 1.0,
            //     opacity: 1.0,
            //     padding: 20,
            //     //background: "blue",
            //   },
            // }}
            data={this.phaseTransitions}
            x="age"
            y="savings"
            dataComponent={<UnicodeDataSymbol />}
            labelComponent={<CustomLabel dy={-20} />}
          />
        </V.VictoryChart>
      </div>
    )
  }

  generate() {

    /*
    age, starting savings, house cost, spending per year, income per year, desired savings increase per year
    later fixed inflation rate
  
    phase 1: saving for a house
    final savings = initial savings + income per year + (0.07 * current savings) - spending per year
    until you have enough to buy a house, then buy a house in queen anne
    then subtract house from your final savings
  
    phase 2: saving for retirement
    same formula as phase 1 except you save until
    desired savings increase per year = 0.07 * current savings - spending per year
  
    phase 3: retirement
    final savings = initial savings + (0.07 * current savings) - spending per year
  
    cuts off at 80 years old
    */

    this.savings = this.props.user.savings - this.props.user.outstandingDebt;

    this.phase = this.phases.SAVING_FOR_A_HOUSE;
    // create an array of savings until cutoff age

    this.savingsPerYear = [];
    this.phaseTransitions = [];

    // loop from start to end age.
    for (let age = this.props.user.age; age <= this.ageCutoff; age += 1) {
      const previousPhase = this.phase;
      const previousSavings = this.savings;
      switch (this.phase) {
        case this.phases.SAVING_FOR_A_HOUSE:
          this.saveForAHouse();
          break;
        case this.phases.SAVING_FOR_RETIREMENT:
          this.saveForRetirement();
          break;
        case this.phases.RETIREMENT:
          this.saveDuringRetirement();
          break;
        default:
          console.log('ERROR: invalid savings phase!!')
      }
      let label = null;
      let symbol = null;
      if (this.phase !== previousPhase) {
        label = this.phaseTransitionLabels.get(previousPhase);
        symbol = this.phaseTransitionSymbols.get(previousPhase);
      }
      const savingsForOneYear = {
        age: age,
        savings: this.savings,
        phase: this.phase,
        label: label,
        symbol: symbol
      };
      this.savingsPerYear.push(savingsForOneYear);
      if (this.phase !== previousPhase) {
        if (previousPhase === this.phases.SAVING_FOR_A_HOUSE) {
          savingsForOneYear.age = age - 1;
          savingsForOneYear.savings = previousSavings;
        }
        this.phaseTransitions.push(savingsForOneYear);
      }
    }

    console.log(this.savingsPerYear)
  }

  // final savings = initial savings + income per year + (0.07 * current savings) - spending per year
  // until you have enough to buy a house, then buy a house in queen anne
  // then subtract house from your final savings

  //TODO: make these private
  saveForAHouse() {
    this.savings += (1 - this.incomeTaxRate) * this.props.jobSalary;
    this.savings += this.interestRateAfterTax * this.savings;
    this.savings -= this.props.user.spendingPerYear;
    if (this.savings >= this.props.user.houseCost) {
      this.buyAHouse();
    }
  }

  buyAHouse() {
    this.savings -= this.props.user.houseCost;
    this.phase = this.phases.SAVING_FOR_RETIREMENT;
  }

  saveForRetirement() {
    this.savings += (1 - this.incomeTaxRate) * this.props.jobSalary;
    this.savings += this.interestRateAfterTax * this.savings;
    this.savings -= this.props.user.spendingPerYear;
    // desired savings increase per year = 0.07 * current savings - spending per year
    const savingsIncreasePerYearWithoutSalary = (this.interestRateAfterTax * this.savings) - this.props.user.spendingPerYear;
    if (this.props.user.desiredSavingsIncreasePerYear <= savingsIncreasePerYearWithoutSalary) {
      this.retire();
    }
  }

  retire() {
    this.phase = this.phases.RETIREMENT;
  }

  saveDuringRetirement() {
    this.savings += this.interestRateAfterTax * this.savings;
    this.savings -= this.props.user.spendingPerYear;
  }

}

export default SavingsTimeline;