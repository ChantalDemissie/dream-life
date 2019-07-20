import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import axios from 'axios';

import SavingsTimeline from './SavingsTimeline';

import KeywordSearchForm from './KeywordSearchForm';
import CareersTable from './CareersTable.js';

class Search extends React.Component {
  searchSubmitted = false;
  state = {
    careers: [],
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
    const jobOutlookPromises = occupations.map(occupation => {
      const url = `https://services.onetcenter.org/ws/mnm/careers/${occupation.code}/job_outlook`
      return axios.get(url, { params: { client: this.props.onetClientname } });
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
      <Container>
        <Row className="my-3">
          <Col>
            <h2 className="text-center">Search Careers</h2></Col>
          <Col xs={6}>
            <KeywordSearchForm
              formCallback={this.searchCareers}
            />
          </Col>
          <Col></Col>
        </Row>
        <Row>
          <Col>
            {careersTable}
          </Col>
        </Row>
      </Container>
    )
  }
}

export default Search;