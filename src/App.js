import React, { Component } from 'react';
import './App.css';
//import ReactDOM from 'react-dom';
import { Button, Col, Container, Form, Row, Table } from 'react-bootstrap';

//import WhereIAmForm from './components/WhereIAmForm.js';
//import WhereIWantToBeForm from './components/WhereIWantToBeForm.js';
//import Results from './components/Results.js';
import SavingsTimeline from './components/SavingsTimeline';
import axios from 'axios';

class App extends Component {

  constructor() {
    super();
    this.state = {
      //whereIAmCallback: this.getWhereIAm,
      //whereIWantToBeCallback: this.,
      careers: [],
      user: {
        age: 20,
        savings: 500,
        houseCost: 500E3,
        spendingPerYear: 35E3, // do inflation later?
        desiredSavingsIncreasePerYear: 10E3,
        searchText: null
      }
    }
    this.onetClientname = 'adadevelopersacademy';

    this.searchCareers = this.searchCareers.bind(this);
    this.handleFormChange = this.handleFormChange.bind(this);

    this.searchSubmitted = false;
  }

  // componentDidMount() {
  //   this.getResults()
  // }

  getResults() {

  }

  processOccupations(occupations) {
    // https://services.onetcenter.org/reference/mnm/career/outlook
    const jobOutlookPromises = occupations.map(occupation => {
      const url = `https://services.onetcenter.org/ws/mnm/careers/${occupation.code}/job_outlook`
      return axios.get(url, { params: { client: this.onetClientname } });
    })
    // axios.all gathers the results promises
    //  this makes it synchronous
    axios.all(jobOutlookPromises).then((jobOutlooks) => {
      let careers = jobOutlooks.map((jobOutlook, index) => {
        const occupation = occupations[index];
        const salary = jobOutlook.data.salary.annual_median;
        return {
          title: occupation.title,
          code: occupation.code,
          annualMedianSalary: salary,
          savingsTimeline: <SavingsTimeline
            user={this.state.user}
            jobSalary={salary}
          />
        };
      });
      console.log(careers)
      careers = careers.filter(career => this.state.user.spendingPerYear <= 0.7 * career.annualMedianSalary);
      this.setState({
        careers: careers,
      });
    });
  }

  getWhereIAm() {

  }

  getWhereIWantToBe() {

  }

  searchCareers(event) {
    event.preventDefault();

    console.log(this.state.searchText)

    // https://services.onetcenter.org/reference/mnm/search
    const url = 'https://services.onetcenter.org/ws/mnm/search'
    axios.get(url, {
      params: {
        keyword: this.state.searchText,
        client: this.onetClientname
      },
      //timeout: 10000,
    }).then((response) => {
      console.log(response)
      this.processOccupations(response.data.career)
    });

    this.searchSubmitted = true;
  }

  handleFormChange(event) {
    const target = event.target;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    const name = target.name;

    this.setState({
      [name]: value
    });
  }

  render() {
    const careerRows = this.state.careers.map((career) => {
      console.log("regenerating careers")
      return (
        <tr>
          <td>{career.title}</td>
          <td>${career.annualMedianSalary.toLocaleString()}</td>
          <td>{career.savingsTimeline}</td>
        </tr>
      );
    });

    let resultsTable = null;
    if (this.searchSubmitted === true) {
      resultsTable = (
        <Table bordered hover>
          <thead>
            <tr>
              <th>Career</th>
              <th>Annual Median Salary</th>
              <th>Savings Timeline Chart</th>
            </tr>
          </thead>
          <tbody>
            {careerRows}
          </tbody>
        </Table>
      );
    }

    return (
      <main className="App">
        {/* <header className="App-header">
        </header> */}
        {/* <section className="where-i-am-form">
          <WhereIAmForm
            whereIAmCallback = {this.state.whereIAmCallback}
          />
        </section> 
          <section className="user-skills-form">
          <WhereIWantToBeForm
              whereIWantToBeCallback = {this.state.whereIWantToBeCallback}
            />
          </section> */}
        <Container>
          <Form onSubmit={this.searchCareers}>
            <Form.Group controlId="formSearchBar">
              <Form.Label>Search Careers</Form.Label>
              <Form.Control
                type="search"
                name="searchText"
                value={this.state.searchText}
                onChange={this.handleFormChange}
              />
            </Form.Group>
            <Button variant="primary" type="submit">
              Submit
             </Button>
          </Form>
          {resultsTable}
        </Container>
      </main >
    );
  }

}

export default App;
