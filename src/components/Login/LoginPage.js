import React from 'react';
import PropTypes from 'prop-types';
import LoginForm from './LoginForm';

class LoginPage extends React.Component {
  render() {
    return (
        <LoginForm history={this.props.history} />
    )
  }
}

LoginPage.propTypes = {
  history: PropTypes.object.isRequired
};

export default LoginPage;