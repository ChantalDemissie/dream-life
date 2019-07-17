import React from 'react';
import { Redirect } from 'react-router-dom';

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
    return <WhereIAmForm
      formCallback={this.setUser}
    />
  }

}

export default Home;