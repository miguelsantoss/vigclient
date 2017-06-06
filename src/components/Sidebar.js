import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import { withRouter } from 'react-router';
import _ from 'lodash';

//import { Icon, Divider } from 'semantic-ui-react';
import { Menu, Image } from 'semantic-ui-react';
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
    audits_menus = _.map((audit) => {
      console.log(audit);
      return (<h1>audit</h1>);
    }, this.props.audits)
    render () {
      const { style } = this.props;
      return (
        <Menu icon='labeled' vertical fixed='left' inverted style={{...style}}>
          <Image src={logo} size='small' />

          <Menu.Item>
            <Menu.Header as={NavLink} to='/' activeClassName='active'>DRC Vigilante</Menu.Header>
          </Menu.Item>
          <Menu.Item>
            <Menu.Header>Audits</Menu.Header>
            <Menu.Menu>
              <Menu.Item as={NavLink} to='/audits/1' activeClassName='active'>Audit 1</Menu.Item>
              <Menu.Item as={NavLink} to='/audits/2' activeClassName='active'>Audit 2</Menu.Item>
              {this.audits_menus}
            </Menu.Menu>
          </Menu.Item>

        </Menu>
      );
    }
  }

export default withRouter(Sidebar);
