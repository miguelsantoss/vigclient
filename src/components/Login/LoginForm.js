import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Icon, Button, Form } from 'semantic-ui-react';

import TextFieldGroup from '../common/textField.js';
import validateInput from '../../utils/loginValidation';
import { login } from '../../actions/authActions';
import style from './style';

class LoginForm extends React.Component {
  constructor (props) {
    super(props);
    this.state = {
      identifier: '',
      password  : '',
      errors    : {},
      isLoading : false
    };
    
    this.onSubmit = this.onSubmit.bind(this);
    this.onChange = this.onChange.bind(this);
  }

  isValid() {
    const { errors, isValid } = validateInput(this.state);

    if(!isValid) {
      this.setState({ errors });
    }

    return isValid;
  }

  onSubmit(e) {
    e.preventDefault();
    
    if (this.isValid()) {
      this.setState({ errors: {}, isLoading: true });
      this.props.login(this.state).then(
        (res) => this.props.history.push('/'),
        (err) => this.setState({ errors: err.response.data.errors, isLoading: false })
      );
    }
  }

  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  render() {
    const { errors, identifier, password, isLoading } = this.state;
    return (
      <div style={style.back}>
      <Form onSubmit={this.onSubmit} style={style.card}>
        <div style={style.top}>
          <h1 style={style.top.text}>VIGILANTE</h1>
        </div>
        
        {errors.form &&  <div style={style.warning}>{errors.form}</div>}
        
        <div style={style.forms.grid}>
          <TextFieldGroup 
          style={style.forms}
          field    = 'identifier'
          label    = 'Username / Email'
          value    = {identifier}
          error    = {errors.identifier}
          onChange = {this.onChange}
          />
          
          <TextFieldGroup
          style={style.forms}
          field    = 'password'
          label    = 'Password'
          value    = {password}
          error    = {errors.password}
          onChange = {this.onChange}
          type     = 'password'
          />

          <Button type='submit'color='blue' animated fluid  style={style.button} disabled={isLoading}>
            <Button.Content visible>Submit</Button.Content>
            <Button.Content hidden>
              <Icon name='right arrow' />
            </Button.Content>
          </Button>
        </div>
      </Form>
      </div>
    );
  }
}
LoginForm.propTypes = {
  login: PropTypes.func.isRequired,
};

export default connect(null, { login })(LoginForm);
