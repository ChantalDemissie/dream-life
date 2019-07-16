import React, { Component } from 'react';
import PropTypes from 'prop-types';
//import 'bootstrap/dist/css/bootstrap.min.css';
import './WhereIWantToBe.css'

class WhereIWantToBeForm extends Component {
  constructor(props) {
    super(props);

    this.state = {
      interests: '',
      skills: '',
    };
  }

  onInterestsChange = (event) => {
    this.setState({
      interests: event.target.value,
    });
  }

  onSkillsChange = (event) => {
    this.setState({
      skills: event.target.value,
    });
  }

  onFormSubmit = (event) => {
    event.preventDefault();

    const userSkills = {
      interests: this.state.interests,
      skills: this.state.skills,
    }

    //this.props.userSkillsCallback(userSkills);
  }

  render() {
    return (
      <form className="user-skills-form" onSubmit={this.onFormSubmit}>
        <h3>Lets find a career for you! Enter some more information below
        </h3>
        <div>
          <label htmlFor="interests">Interests:</label>
          <input 
            interests="interests" 
            onChange={this.onInterestsChange}
            value={this.state.interests}
          />
        </div>
        <div>
          <label htmlFor="skills">Skills:</label>
          <input
            name="skills" 
            onChange={this.onSkillsChange}
            value={this.state.skills}
          />
        </div>
        <input className="btn btn-success user-skills-form--submit" type="submit" name="submit" value="Next" />
      </form>
    );
  }


}

//WhereIWantToBeForm.propTypes = {
//  userSkillsCallback: PropTypes.func.isRequired,
//};

export default WhereIWantToBeForm;