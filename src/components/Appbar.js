import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import { Menu } from 'semantic-ui-react';

export default class AppBar extends Component {
    state = {}
    handleItemClick = (e, { name }) => this.setState({ activeItem: name })

    render () {
        const { activeItem } = this.state;
        return (
          <Menu inverted style={this.props.style}>
            <Menu.Item name='user' >
              {this.props.client.name}
            </Menu.Item>
            <Menu.Item position='right' name='user' active={activeItem === 'browse'} onClick={this.handleItemClick} as={NavLink} to='/login'>
              Log Out
            </Menu.Item>
          </Menu>
        );
    }
}

