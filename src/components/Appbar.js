import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import { Menu } from 'semantic-ui-react';

export default class AppBar extends Component {
    state = {}
    handleItemClick = (e, { name }) => this.setState({ activeItem: name })

    render () {
        const { activeItem } = this.state;
        return (
          <Menu inverted>
            <Menu.Item position='right' name='user' active={activeItem === 'browse'} onClick={this.handleItemClick} as={NavLink} to='/login'>
              Log Out
            </Menu.Item>
          </Menu>
        );
    }
}

