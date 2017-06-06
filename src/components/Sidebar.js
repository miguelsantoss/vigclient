import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import { withRouter } from 'react-router';
import { Menu, Icon, Divider, Image } from 'semantic-ui-react';
import logo from './assets/logo.png';

          // <Menu.Item name='audits' as={NavLink} to='/audits/2'>
          //   <Icon name='browser' />
          //   Audits
          // </Menu.Item>
          // <Menu.Item name='machines' as={NavLink} to='/machines/1'>
          //   <Icon name='computer' />
          //   Machines
          // </Menu.Item>
          // <Divider />

class Sidebar extends Component {
    render () {
      const { style } = this.props;
      return (
        <Menu icon='labeled' vertical fixed='left' inverted style={{...style}}>
          <Image src={logo} size='small' />

          <Menu.Item>
            <Menu.Header>DRC Vigilante</Menu.Header>
            <Menu.Menu>
              <Menu.Item as={NavLink} to='/' activeClassName='active'>
                Home
              </Menu.Item>
            </Menu.Menu>
          </Menu.Item>
          <Menu.Item>
            <Menu.Header>Audits</Menu.Header>
            <Menu.Menu>
              <Menu.Item as={NavLink} to='/audits/1' activeClassName='active'>Audit 1</Menu.Item>
              <Menu.Item as={NavLink} to='/audits/2' activeClassName='active'>Audit 2</Menu.Item>
            </Menu.Menu>
          </Menu.Item>

        </Menu>
      );
    }
  }

export default withRouter(Sidebar);
