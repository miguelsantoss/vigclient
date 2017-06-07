import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import { withRouter } from 'react-router';
import _ from 'lodash';
import moment from 'moment';

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

export const auditType = [
  'EXTERNAL',
  'INTERNAL',
  'WEB'
]

class Sidebar extends Component {
    renderAudits = () => {
      const { audits } = this.props;
      // Sort audits by data iniciated
      // FIXME: use closed_at date in the sort too - deal with NULL
      let auditsByDate = audits.sort((a,b) => moment(b.initiated_at, 'YYYY-MM-DD') - moment(a.initiated_at, 'YYYY-MM-DD'));
      // Map each audit into a Menu item element
      const auditsRender = _.map(auditsByDate, (audit) => {
        return (
          <Menu.Item key={audit.id} as={NavLink} to={'/audits/'+audit.id} activeClassName='active'>
          {'Audit ' + audit.id + '-' + audit.serial_number}
          </Menu.Item>
        );
      })
      return auditsRender;
    }

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
              {this.renderAudits()}
            </Menu.Menu>
          </Menu.Item>
        </Menu>
      );
    }
  }

export default withRouter(Sidebar);
