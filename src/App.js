import React, { Component } from 'react';
import './App.css';
//import ReactDOM from 'react-dom';
import * as V from 'victory';
import WhereIAmForm from './components/WhereIAmForm.js';
//import WhereIWantToBeForm from './components/WhereIWantToBeForm.js';

class App extends Component {

  constructor() {
    super();
    this.state = {
      whereIAmCallback: this.getWhereIAm,
      //whereIWantToBeCallback: this.,
    }
  }

  getWhereIAm() {

  }

  //getWhereIWantToBe()

  render() {
    // const data = [
    //   {quarter: 1, earnings: 13000},
    //   {quarter: 2, earnings: 16500},
    //   {quarter: 3, earnings: 14250},
    //   {quarter: 4, earnings: 19000}
    // ];
  
    return (
      <main className="App">
        {/* <header className="App-header">
        </header> */}
        <section className="where-i-am-form">
          <WhereIAmForm
            whereIAmCallback = {this.state.whereIAmCallback}
          />
        </section> 
          {/* <section className="user-skills-form">
          <WhereIWantToBeForm
              whereIWantToBeCallback = {this.state.whereIWantToBeCallback}
            />
          </section> */}
        {/* <V.VictoryChart
          domainPadding={20}
          theme={V.VictoryTheme.material}
        >
          <V.VictoryAxis
            tickValues={[1,2,3,4]}
            tickFormat={["Q1", "Q2", "Q3", "Q4"]}
          />
          <V.VictoryAxis
            dependentAxis
            tickFormat={(x) => (`$${x / 1000}k`)}  
          />
          <V.VictoryBar
            data={data}
            x="quarter"
            y="earnings"
          />
        </V.VictoryChart> */}
        </main>
    );
  }

  
}

export default App;
