import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from "react-router-dom";

import './bootstrap.min.css'
import './App.css';

import Home from './components/Home.js';
import Search from './components/Search.js';

class App extends Component {
  onetClientname = 'adadevelopersacademy';

  state = {
    user: {
      age:  null,
      savings: null,
      houseCost: null,
      spendingPerYear: null, // do inflation later?
      desiredSavingsIncreasePerYear:  null,
    }
    // Dummy user for testing and debugging.
    // user: {
    //   age: 40,
    //   savings: 500,
    //   houseCost: 8E5,
    //   spendingPerYear: 30E3,
    //   desiredSavingsIncreasePerYear: 1E3,
    // }
  }

  setUser = (user) => {
    this.setState({
      user: user
    });
  }

  render() {
    return (
      <main className="App">
        <Router>
          <Route exact path="/" render={
            (props) => <Home
              {...props}
              setUserCallback={this.setUser}
            />
          } />
          <Route path="/search" render={
            (props) => <Search
              {...props}
              user={this.state.user}
              onetClientname={this.onetClientname}
              setUserCallback={this.setUser}
            />
          } />
        </Router>
      </main>
    );
  }

}

export default App;
