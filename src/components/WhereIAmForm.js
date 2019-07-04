import React, { Component } from 'react';
import PropTypes from 'prop-types';
//import 'bootstrap/dist/css/bootstrap.min.css';
import './WhereIAmForm.css'

class WhereIAmForm extends Component {
  constructor(props) {
    super(props);

    this.state = {
      age: '',
      savings: '',
      educationLevel: '',
    };
  }

  onAgeChange = (event) => {
    this.setState({
      age: event.target.value,
    });
  }

  onSavingsChange = (event) => {
    this.setState({
      savings: event.target.value,
    });
  }

  onEducationLevelChange = (event) => {
    this.setState({
      educationLevel: event.target.value,
    });
  }

  onFormSubmit = (event) => {
    event.preventDefault();

    const newUser = {
      age: this.state.age,
      savings: this.state.savings,
      educationLevel: this.state.educationLevel
    }

    this.props.newUserCallback(newUser);
  }

  render() {
    return (
      <form className="where-i-am-form" onSubmit={this.onFormSubmit}>
        <h3>Input your information
        </h3>
        <div>
          <label htmlFor="age">Age:</label>
          <input 
            age="age" 
            onChange={this.onAgeChange}
            value={this.state.age}
          />
        </div>
        <div>
          <label htmlFor="educationlevel"> Current Education Level:</label>
          <input 
            name="educationlevel" 
            onChange={this.oneducationLevelChange}
            value={this.state.educationLevel}
          />
        </div>
        <div>
          <label htmlFor="Savings">Current savings:</label>
          <textarea
            name="savings" 
            onChange={this.onSavingsChange}
            value={this.state.savings}
          />
        </div>
        <input className="btn btn-success new-user-form--submit" type="submit" name="submit" value="Next" />
      </form>
    );
  }


}

WhereIAmForm.propTypes = {
  NewUSerCallback: PropTypes.func.isRequired,
};

export default WhereIAmForm;