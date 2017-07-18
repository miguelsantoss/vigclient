import React from 'react';
import PropTypes from 'prop-types';
import { Icon, Button, Form } from 'semantic-ui-react';

import validateInput from '../../utils/signupValidation';
import TextFieldGroup from '../common/textField';
import style from '../Login/style';


class SignupForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      email: '',
      password: '',
      passwordConfirmation: '',
      errors: {},
      isLoading: false,
      invalid: false
    }
    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.checkUserExists = this.checkUserExists.bind(this);
  }

  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  isValid(){
    const { errors, isValid } = validateInput(this.state);

    if (!isValid) {
      this.setState({ errors });
    }

    return isValid;
  }

  checkUserExists(e){
    const field =  e.target.name;
    const val   = e.target.value;
    if (val !== ''){
      this.props.isUserExists(val).then(res => {
        let errors = this.state.errors;
        let invalid;
        if (res.data.user) {
          errors[field] = 'Theres a User with same ' + field;
          invalid = true;
        } else {
          errors[field] = '';
          invalid = false;
        }
        this.setState({ errors, invalid })
      });
    }
  }

  onSubmit(e) {
    e.preventDefault();
    
    if(this.isValid()){
      this.setState({ errors: {}, isLoading: true });
      this.props.userSignupRequest(this.state).then(
        () =>{
          this.props.addMessages({
            type: 'success',
            text: 'Sign in!'
          });
          this.props.history.push('/');
        },
        (err) => this.setState({ errors: err.response.data, isLoading: false })
      );
    }
  }

  render(){
    const {errors} = this.state;
    return(
      <div style={style.back}>
        <Form onSubmit={this.onSubmit} style={style.card}>
          <div style={style.top}>
            <h1 style={style.top.text}>REGISTER</h1>
          </div>

          <div style={style.forms.grid}>
          <TextFieldGroup
            style={style.forms}
            field='username'
            value={this.state.username}
            label='Username'
            error={errors.username}
            type='text'
            onChange={this.onChange}
            checkUserExists={this.checkUserExists}
          />
          
          <TextFieldGroup
            style={style.forms}
            field='email'
            value={this.state.email}
            label='Email'
            error={errors.email}
            type='email'
            onChange={this.onChange}
            checkUserExists={this.checkUserExists}
          />
          
          <TextFieldGroup
            style={style.forms}
            field='password'
            value={this.state.password}
            label='Password'
            error={errors.password}
            type='password'
            onChange={this.onChange}
            checkUserExists={this.checkUserExists}
          />
          
          <TextFieldGroup
            style={style.forms}
            field='passwordConfirmation'
            value={this.state.passwordConfirmation}
            label='Password Confirmation'
            error={errors.passwordConfirmation}
            type='password'
            onChange={this.onChange}
            checkUserExists={this.checkUserExists}
          />

          <Button 
            type='submit'
            color='blue' animated fluid  
            style={style.button} 
            disabled={this.state.isLoading || this.state.invalid}>
            <Button.Content visible>SignUp</Button.Content>
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

SignupForm.proTypes = {
  userSignupRequest: PropTypes.func.isRequired,
  addMessages: PropTypes.func.isRequired,
  isUserExists:PropTypes.func.isRequired
}

export default SignupForm;