import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { withRouter } from 'react-router';
import _ from 'lodash';
import moment from 'moment';

// import { Icon, Divider } from 'semantic-ui-react';
import { Menu } from 'semantic-ui-react';

export const auditType = [
  'EXTERNAL',
  'INTERNAL',
  'WEB',
];

class Sidebar extends Component {
  renderAudits() {
    const { audits } = this.props;
    // Sort audits by data iniciated
    // FIXME: use closed_at date in the sort too - deal with NULL
    const auditsByDate = audits.sort((a, b) => moment(b.initiated_at, 'YYYY-MM-DD') - moment(a.initiated_at, 'YYYY-MM-DD'));
    // Map each audit into a Menu item element
    const auditsRender = _.map(auditsByDate, audit => (
      <Menu.Item key={audit.id} as={Link} to={`/audit/${audit.id}`}>
        {`Audit${audit.id}-${audit.serial_number}`}
      </Menu.Item>
    ));
    return auditsRender;
  }

  render() {
    const { style } = this.props;
    return (
      <Menu vertical fixed='left' inverted style={style}>
        <Menu.Item>
          <Menu.Header as={Link} to='/profile'>Client Profile</Menu.Header>
        </Menu.Item>
        <Menu.Item>
          <Menu.Header as={Link} to='/audits'>Audits</Menu.Header>
          <Menu.Menu>
            {this.renderAudits()}
          </Menu.Menu>
        </Menu.Item>
      </Menu>
    );
  }
}

Sidebar.propTypes = {
  audits: PropTypes.array.isRequired, // eslint-disable-line react/forbid-prop-types
  style: PropTypes.object.isRequired, // eslint-disable-line react/forbid-prop-types
};

export default withRouter(Sidebar);
