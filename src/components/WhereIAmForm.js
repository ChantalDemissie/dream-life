import React from 'react';
import { Button, Form } from 'react-bootstrap';
import './WhereIAmForm.css'

class WhereIAmForm extends React.Component {
  constructor(props) {
    super(props);
    if (props.user) {
      this.state = {
        age: props.user.age,
        savings: props.user.savings,
        outstandingDebt: props.user.outstandingDebt,
        houseCost: props.user.houseCost,
        spendingPerYear: props.user.spendingPerYear,
        desiredSavingsIncreasePerYear: props.user.desiredSavingsIncreasePerYear,
      };
    }  else {
      this.state = {
        age: '',
        savings: '',
        outstandingDebt: '',
        houseCost: '',
        spendingPerYear: '',
        desiredSavingsIncreasePerYear: '',
      };
    }
    this.onSubmit = this.onSubmit.bind(this);
    this.handleFormChange = this.handleFormChange.bind(this);
  }

  handleFormChange(event) {
    const target = event.target;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    const name = target.name;

    this.setState({
      [name]: value
    });
  }

  onSubmit = (event) => {
    event.preventDefault();

    const newUser = {
      age: parseInt(this.state.age),
      savings: parseFloat(this.state.savings),
      outstandingDebt: parseFloat(this.state.outstandingDebt),
      houseCost: parseFloat(this.state.houseCost),
      spendingPerYear: parseFloat(this.state.spendingPerYear),
      desiredSavingsIncreasePerYear: parseFloat(this.state.desiredSavingsIncreasePerYear),
    }

    this.props.formCallback(newUser);
  }

  render() {
    return (
      <Form onSubmit={this.onSubmit}>
        <Form.Group controlId="age">
          <Form.Label>Age</Form.Label>
          <Form.Control
            type="number"
            name="age"
            value={this.state.age}
            onChange={this.handleFormChange}
          />
        </Form.Group>

        <Form.Group controlId="savings">
          <Form.Label>Current Savings</Form.Label>
          <Form.Control
            type="number"
            name="savings"
            value={this.state.savings}
            onChange={this.handleFormChange}
          />
        </Form.Group>

        <Form.Group controlId="outstandingDebt">
          <Form.Label>Outstanding Debt</Form.Label>
          <Form.Control
            type="number"
            name="outstandingDebt"
            value={this.state.outstandingDebt}
            onChange={this.handleFormChange}
          />
        </Form.Group>

        <Form.Group controlId="houseCost">
          <Form.Label>Ideal House Cost</Form.Label>
          <Form.Control
            type="number"
            name="houseCost"
            value={this.state.houseCost}
            onChange={this.handleFormChange}
          />
        </Form.Group>

        <Form.Group controlId="spendingPerYear">
          <Form.Label>Average Spending Per Year</Form.Label>
          <Form.Control
            type="number"
            name="spendingPerYear"
            value={this.state.spendingPerYear}
            onChange={this.handleFormChange}
          />
        </Form.Group>

        <Form.Group controlId="desiredSavingsIncreasePerYear">
          <Form.Label>Ideal Savings Increase Per Year</Form.Label>
          <Form.Control
            type="number"
            name="desiredSavingsIncreasePerYear"
            value={this.state.desiredSavingsIncreasePerYear}
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

export default WhereIAmForm;