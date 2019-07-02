import React from 'react';
import logo from './logo.svg';
import './App.css';
//import ReactDOM from 'react-dom';
import * as V from 'victory';

function App() {
  const data = [
    {quarter: 1, earnings: 13000},
    {quarter: 2, earnings: 16500},
    {quarter: 3, earnings: 14250},
    {quarter: 4, earnings: 19000}
  ];

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Hello, World!
        </a>
      </header>
      <V.VictoryChart
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
      </V.VictoryChart>
     
    </div>
  );
}

export default App;
