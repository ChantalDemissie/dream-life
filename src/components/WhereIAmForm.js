import React from 'react';
import { Button, Form, Popover, OverlayTrigger } from 'react-bootstrap';
import CurrencyInput from 'react-currency-input';

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
    } else {
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

  handleCurrencyFormChange = (event, maskedvalue, floatvalue) => {
    const name = event.target.name;
    this.setState({ [name]: floatvalue });
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

  MoreInfoPopover(props) {
    const popover = (
      <Popover id="popover-basic">
        <Popover.Title as="h3">{props.title}</Popover.Title>
        <Popover.Content>{props.content}</Popover.Content>
      </Popover>
    );

    return (
      <OverlayTrigger trigger="click" placement="right" overlay={popover}>
        <Button variant="outline-info">?</Button>
      </OverlayTrigger>
    );
  }

  // Expects props 'name' and 'value' to 
  // associate with state variable.
  DollarCurrencyInput = (props) => {
    return (
      <CurrencyInput className="form-control"
        {...props}
        prefix="$"
        precision={0}
        onChangeEvent={this.handleCurrencyFormChange}
      />
    );
  }

  render() {
    if (!Popover.Content || !Popover.Title) {
      console.log("Popover content does not exist")
    }

    return (
      <div>
        {/* <Example /> */}
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
            <Form.Label>Current Savings <this.MoreInfoPopover
              title={'Current Savings'}
              content={'This includes money you have that you do not plan to spend, as well as the value of real estate, financial assets (e.g., stocks and bonds), and other valuable property you own that you are willing to sell to put towards buying your ideal house and retiring. If you are paying a mortgage, include the paid portion of the mortgage.'}
            />
            </Form.Label>
            <this.DollarCurrencyInput
              name="savings"
              value={this.state.savings}
            />
            {/* <Form.Control
            type="number"
            name="savings"
            value={this.state.savings}
            onChange={this.handleFormChange}
          /> */}
          </Form.Group>

          <Form.Group controlId="outstandingDebt">
            <Form.Label>Outstanding Debt <this.MoreInfoPopover
              title={'Outstanding Debt'}
              content={'This includes any money you currently owe (i.e., student loans, car loan, taxes, fees, large bills, etc.). This also includes any portion of a mortgage that would not be paid off by selling the property.'}
            />
            </Form.Label>
            <this.DollarCurrencyInput
              name="outstandingDebt"
              value={this.state.outstandingDebt}
            />
          </Form.Group>

          <Form.Group controlId="houseCost">
            <Form.Label>Ideal House Cost <this.MoreInfoPopover
              title={'Ideal House Cost'}
              content={<div>This is the full cost of your ideal house in the area you intend to live, including taxes and fees. If you are not sure what this bottom-line price would be, we suggest searching for houses in your area of interest using <a href="https://www.realestate.com" target="_blank" rel="noopener noreferrer">RealEstate.com</a>. If you already live in your ideal home, set this value to zero.</div>}
            />
            </Form.Label>
            <this.DollarCurrencyInput
              name="houseCost"
              value={this.state.houseCost}
            />
          </Form.Group>

          <Form.Group controlId="spendingPerYear">
            <Form.Label>Spending Per Year <this.MoreInfoPopover
              title={'Spending Per Year'}
              content={<div>This is your average spending per year to achieve the quality of life you desire. It does not include housing costs, but does include everything else you spend (e.g., food, utilities, entertainment, health costs, child costs, etc.). For those in the U.S., it should generally be at least $10,000, and is often much more.</div>}
            />
            </Form.Label>
            <this.DollarCurrencyInput
              name="spendingPerYear"
              value={this.state.spendingPerYear}
            />
          </Form.Group>

          <Form.Group controlId="desiredSavingsIncreasePerYear">
            <Form.Label>Ideal Savings Increase Per Year <this.MoreInfoPopover
              title={'Ideal Savings Increase Per Year'}
              content={<div>How much additional savings would you like to accumulate each year once you retire? Since you will not be earning a salary in retirement, these additional savings will come entirely from your wisely invested savings. Its value will determine when you can first retire in comfort by acting as a yearly safety buffer in retirement, a source of additional spending money in your retirement, and a means of accumulating wealth in retirement from compound interest. Dream Life assumes assumes that your invested savings earn ~7% on average yearly (reasonable for stock market index funds).</div>}
            />
            </Form.Label>
            <this.DollarCurrencyInput
              name="desiredSavingsIncreasePerYear"
              value={this.state.desiredSavingsIncreasePerYear}
            />
          </Form.Group>

          <Button variant="primary" type="submit">
            Submit
         </Button>
        </Form>

      </div>

    );
  }
}

export default WhereIAmForm;