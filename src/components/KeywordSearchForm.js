import React, { Component } from 'react';
import { Button, Form, Col } from 'react-bootstrap';


class KeywordSearchForm extends Component {

  constructor(props) {
    super(props);
    this.state = {
      searchText: props.searchText
    };
    this.onSubmit = this.onSubmit.bind(this);
    this.handleFormChange = this.handleFormChange.bind(this);
  }

  onSubmit(event) {
    event.preventDefault();
    console.log(this.state.searchText)
    this.props.formCallback(this.state.searchText);
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
    return (
      <Form onSubmit={this.onSubmit}>
        <Form.Row>
          <Col xs={10}>
            <Form.Group controlId="formSearchBar">
              <Form.Label className="sr-only">Search Careers</Form.Label>
              <Form.Control
                type="search"
                name="searchText"
                value={this.state.searchText}
                onChange={this.handleFormChange}
              />
            </Form.Group>
          </Col>
          <Col>
            <Button variant="primary" type="submit">
              Submit
            </Button>
          </Col>
        </Form.Row>
      </Form>
    );
  }

}

export default KeywordSearchForm;