import React from 'react';
import { Redirect } from 'react-router-dom';
import { Container, Row, Col } from 'react-bootstrap';


import WhereIAmForm from './WhereIAmForm.js';

class Home extends React.Component {
  state = {
    redirectToSearch: false
  };

  setUser = (user) => {
    console.log('set user', user);
    this.props.setUserCallback(user);
    this.setState({
      redirectToSearch: true
    });
  }

  render() {
    if (this.state.redirectToSearch) {
      return <Redirect to="/search" />;
    }
    return (
      <Container>
        <Row>
          <Col>
            <h2 class="my-5 text-center">Dream Life</h2>
            <text>Use our Dream Life calculator to determine your age of home ownership and retirement based on your career choice and lifestyle choices. 
              This calculator factors in your age, current savings, ideal house cost, average spending per year and ideal savings per year.
              After we have recieved this information from you, you can search for a career using keywords.
              The search will return the Career title, Annual Median Salary, Education Requirements and a Savings Timeline Chart (unique to your personalized information!) showing when you can achieve your goals of home ownership and retirement.
              Enjoy and let your dream life start here!</text>
            <h3 class="my-5 text-center"> Please fill out this form</h3>
          </Col>
        </Row>
        <Row>
          <Col></Col>
          <Col>
            <WhereIAmForm
              formCallback={this.setUser}
            />
          </Col>
          <Col></Col>
        </Row>
      </Container>
    )
  }

}

export default Home;