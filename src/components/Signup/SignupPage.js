import React from 'react';
import SignupForm from './SignupForm';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { userSignupRequest, isUserExists } from '../../actions/signupActions';
import { addMessages } from '../../actions/messages';

class SignupPage extends React.Component {
    render(){
        const { userSignupRequest, addMessages, isUserExists } = this.props;
        return (
            <div className="row">
                <div className="col-md4 col-md-offset-4">
                    <SignupForm 
                        isUserExists={isUserExists}
                        userSignupRequest={userSignupRequest} 
                        history={this.props.history}
                        addMessages={addMessages} 
                    />
                </div>
            </div>
        );
    }
}

SignupPage.propTypes = {
  userSignupRequest: PropTypes.func.isRequired,
  history: PropTypes.object.isRequired,
  addMessages: PropTypes.func.isRequired,
  isUserExists:PropTypes.func.isRequired
};

export default connect(null, {userSignupRequest, addMessages, isUserExists})(SignupPage);