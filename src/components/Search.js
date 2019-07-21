import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import axios from 'axios';

import './Search.css';

import SavingsTimeline from './SavingsTimeline';

import KeywordSearchForm from './KeywordSearchForm';
import CareersTable from './CareersTable.js';
import WhereIAmForm from './WhereIAmForm';

class Search extends React.Component {
  searchSubmitted = false;
  state = {
    careers: [],
  }

  setUser = (user) => {
    this.props.setUserCallback(user);
  }

  searchCareers = (searchText) => {
    // https://services.onetcenter.org/reference/mnm/search
    const url = 'https://services.onetcenter.org/ws/mnm/search'
    axios.get(url, {
      params: {
        keyword: searchText,
        client: this.props.onetClientname
      },
      //timeout: 10000,
    }).then((response) => {
      console.log(response)
      this.processOccupations(response.data.career)
    });

    this.searchSubmitted = true;
  }

  processOccupations(occupations) {
    console.log(this.props.user)

    // https://services.onetcenter.org/reference/mnm/career/outlook
    const reportPromises = occupations.map(occupation => {
      const url = `https://services.onetcenter.org/ws/mnm/careers/${occupation.code}/report`
      return axios.get(url, { params: { client: this.props.onetClientname } });
    })
    // axios.all gathers the results promises
    //  this makes it synchronous
    axios.all(reportPromises).then((reports) => {
      console.log(reports)
      let careers = reports.map((report, index) => {
        const occupation = occupations[index];
        const salary = report.data.job_outlook.salary.annual_median;
        const educationRequirements = report.data.education.education_usually_needed.category;
        return {
          title: occupation.title,
          code: occupation.code,
          annualMedianSalary: salary,
          educationRequirements: educationRequirements,
          savingsTimeline: <SavingsTimeline
            user={this.props.user}
            jobSalary={salary}
          />
        };
      });
      console.log(careers)
      careers = careers.filter(career => this.props.user.spendingPerYear <= 0.7 * career.annualMedianSalary);
      this.setState({
        careers: careers,
      });
    });
  }

  render() {
    let careersTable = null;
    if (this.searchSubmitted === true) {
      careersTable = <CareersTable
        careers={this.state.careers}
      />;
    }

    return (
      <Container className="custom-container" fluid={true}>
        <Row className="my-3">
          <Col>
            <h2 className="text-center">Search Careers</h2>
          </Col>
          <Col xs={6}>
            <KeywordSearchForm
              formCallback={this.searchCareers}
            />
          </Col>
          <Col></Col>
        </Row>

        <Row>
          <Col>
            <WhereIAmForm
              formCallback={this.setUser}
              user={this.props.user}
            />
          </Col>
          <Col xs={10}>
            {careersTable}
          </Col>
          <Col></Col>
        </Row>
      </Container>
    )
  }
}

export default Search;