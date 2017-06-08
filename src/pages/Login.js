import React from 'react'
import { Button, Input, Form } from 'semantic-ui-react';
import { Link } from 'react-router-dom';

const Login = () => (
    <div>
      <Form>
        <Form.Field>
          <label>Enter Username</label>
          <input placeholder='Username' />
        </Form.Field>
        <Form.Field>
          <label>Enter Password</label>
          <Input type='password' placeholder='Password'/>
        </Form.Field>        
        <Button type='submit' as={Link} to='/'>Submit</Button>
      </Form>      
    </div>
)

export default Login
