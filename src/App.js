import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from "react-router-dom";
import queryString from 'query-string';

import './bootstrap.min.css'
import './App.css';

import Home from './components/Home.js';
import Search from './components/Search.js';

class App extends Component {
  onetClientname = 'adadevelopersacademy';

  state = {
    user: {
      age: null,
      savings: null,
      outstandingDebt: null,
      houseCost: null,
      spendingPerYear: null, // do inflation later?
      desiredSavingsIncreasePerYear: null,
    },
    // Dummy user for testing and debugging.
    // user: {
    //   age: 40,
    //   savings: 500,
    //   outstandingDebt: 9000,
    //   houseCost: 8E5,
    //   spendingPerYear: 30E3,
    //   desiredSavingsIncreasePerYear: 1E3,
    // },
    // Ensures search is restored from query only once.
    loadedSearchFromQuery: false,
  }

  setUser = (user) => {
    this.setState({
      user: user
    });
  }

  getUserFromQuery = (query) => {
    const user = {
      age: parseInt(query.age),
      savings: parseFloat(query.savings),
      outstandingDebt: parseFloat(query.outstandingDebt),
      houseCost: parseFloat(query.houseCost),
      spendingPerYear: parseFloat(query.spendingPerYear), 
      desiredSavingsIncreasePerYear: parseFloat(query.desiredSavingsIncreasePerYear),
    };
    return user;
  }

  search = (props) => {
    //check if props.location.search is set (how?)
    //if it is set, get query and create a user from it
    //else just use this.state.user from the form
    console.log(props.location.search)
    let user = null;
    let searchText = null;
    if (props.location.search && !this.loadedSearchFromQuery) {
      console.log("unicorn")
      const query = queryString.parse(
        props.location.search, { ignoreQueryPrefix: true })
      console.log('query parameters', query);
      user = this.getUserFromQuery(query);
      searchText = query.searchText;
      this.loadedSearchFromQuery = true;
    } else {
      user = this.state.user;
    }

    return (<Search
      {...props}
      searchText={searchText}
      user={user}
      onetClientname={this.onetClientname}
      setUserCallback={this.setUser}
    />);
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
            (props) => this.search(props)
          } />
        </Router>
      </main>
    );
  }

}

export default App;
