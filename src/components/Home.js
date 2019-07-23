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
            <p style={{ fontSize: 18, padding: "30px 100px 0px 0px" }}><i>Use Dream Life to <b>search careers</b> and see when you will be able to <b>buy a house</b> and <b>retire</b>.</i></p>
          </Col>
          <Col>
            <h3 class="my-4 text-center">Where You Are</h3>
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