import React from 'react'
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { addMessages } from '../actions/messages';

export default function(Component){
  class Authenticate extends React.Component {

    componentWillMount() {
      if (!this.props.isAuth) {
        this.props.addMessages({
          type: 'error',
          text: 'You need to login!'
        });
      this.props.history.push('/login');
      }
    }

    componentWillUpdate(nextProps) {
      if (!nextProps.isAuth) {
        this.props.history.push('/');
      }
    }
    render () {
      return (
        <Component {...this.props} />
      );
    }
  }

Authenticate.propTypes = {
  isAuth: PropTypes.bool.isRequired,
  addMessages: PropTypes.func.isRequired,
  history: PropTypes.object.isRequired,
}

Authenticate.contextTypes = {
  history: PropTypes.object.isRequired
}

function mapStateToProps(state) {
  return {
    isAuth: state.auth.isAuth
  };
}

  return connect(mapStateToProps, { addMessages })(Authenticate);
}
