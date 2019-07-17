import React, { Component } from 'react';
import { Button, Form } from 'react-bootstrap';


class KeywordSearchForm extends Component {

  constructor(props) {
    super(props);
    this.state = {
      searchText: null
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
    );
  }

}

export default KeywordSearchForm;