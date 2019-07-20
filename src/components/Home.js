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
            <h2 class="my-5 text-center">I am a website</h2>
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