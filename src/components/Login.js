import React from 'react';
import { Icon, Button, Form } from 'semantic-ui-react';
import { Link } from 'react-router-dom';

////// STYLING \\\\\\
const style = {};

style.back = {
    height: '100vh',
    background: '#37474F',
    paddingTop: '10%'
};

style.card = {
    background: '#fff',
    borderRadius: '2px',
    height: '500px',
    margin: '0 auto',
    width: '500px',
    boxShadow: '0 10px 20px rgba(0,0,0,0.19), 0 6px 6px rgba(0,0,0,0.23)'
};

style.top = {
    background: '#2185D0',
    height: '100px',
    paddingTop: '3rem'
};

style.top.text = {
    color: '#fff',
    textAlign: 'center'
};

style.forms = {
    margin: '2rem auto'
};

style.forms.grid = {
    padding: '3rem'
};

style.button = {
    margin: 'auto',
    marginTop: '4rem'
};

////// COMPONENT \\\\\\
const Login = () => (
    <div style={style.back}>
        <Form style={style.card}>
            <div style={style.top}>
                <h1 style={style.top.text}>VIGILANTE</h1>
            </div>
            <div style={style.forms.grid}>
            <Form.Field style={style.forms}>
                <label>Username</label>
                <input placeholder='Username' />
            </Form.Field>
            <Form.Field style={style.forms}>
                <label>Password</label>
                <input placeholder='Password' />
            </Form.Field>
            <Link to='/'>
                <Button type='submit'color='blue' animated fluid style={style.button}>
                    <Button.Content visible>Submit</Button.Content>
                    <Button.Content hidden>
                        <Icon name='right arrow' />
                    </Button.Content>
                </Button>
            </Link>
            </div>
        </Form>
    </div>
);

export default Login;
