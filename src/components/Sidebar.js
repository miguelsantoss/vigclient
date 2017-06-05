import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import { withRouter } from 'react-router';
import { Menu, Icon, Divider, Image } from 'semantic-ui-react';
import logo from './assets/logo.png';

class Sidebar extends Component {
    render () {
        return (
          <Menu icon='labeled' vertical fixed='left' inverted>
            <Image src={logo} size='small' />
            <Divider />
            <Menu.Item name='home'as={NavLink} to='/'>
              <Icon name='home' />
              Home
        </Menu.Item>
            <Menu.Item name='audits' as={NavLink} to='/audits/2'>
              <Icon name='browser' />
              Audits
        </Menu.Item>
            <Menu.Item name='machines' as={NavLink} to='/machines/1'>
              <Icon name='computer' />
              Machines
        </Menu.Item>
          </Menu>
        );
    }
  }

export default withRouter(Sidebar);
