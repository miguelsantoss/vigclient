import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import { Menu } from 'semantic-ui-react';

export default class MenuExampleInverted extends Component {
    state = { activeItem: 'home' }

    handleItemClick = (e, { name }) => this.setState({ activeItem: name })

    render () {
        const { activeItem } = this.state;

        return (
          <Menu inverted>
            <Menu.Item position='right' as={NavLink} to='/login' activeClassName='active'>Log out</Menu.Item>
          </Menu>
        );
    }
}

