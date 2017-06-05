import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import { withRouter } from 'react-router';
import { Menu, Icon, Divider, Image } from 'semantic-ui-react';
import logo from './assets/logo.png';

class Sidebar extends Component {
    state = { activeItem: 'gamepad' }
    handleItemClick = (e, { name }) => this.setState({ activeItem: name })
    render () {
        const { activeItem } = this.state;

        return (
          <Menu icon='labeled' vertical fixed='left' inverted>
            <Image src={logo} size='small' />
            <Divider />
            <Menu.Item name='home' active={activeItem === 'home'} onClick={this.handleItemClick} as={NavLink} to='/'>
              <Icon name='home' />
              Home
        </Menu.Item>

            <Menu.Item name='audits' active={activeItem === 'audits'} onClick={this.handleItemClick} as={NavLink} to='/audits/2'>
              <Icon name='browser' />
              Audits
        </Menu.Item>

            <Menu.Item name='machines' active={activeItem === 'machines'} onClick={this.handleItemClick} as={NavLink} to='/machines/1'>
              <Icon name='computer' />
              Machines
        </Menu.Item>
          </Menu>
        );
    }
  }

export default withRouter(Sidebar);
