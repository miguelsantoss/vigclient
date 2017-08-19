import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { withRouter } from 'react-router';
import _ from 'lodash';
import moment from 'moment';

import { Menu, Loader } from 'semantic-ui-react';

class Sidebar extends Component {
  renderAudits() {
    const { audits } = this.props;
    // Sort audits by data iniciated
    // FIXME: use closed_at date in the sort too - deal with NULL
    // const auditsByDate = audits.sort((a, b) =>
    //   moment(b.initiated_at, 'YYYY-MM-DD') - moment(a.initiated_at, 'YYYY-MM-DD'),
    // );
    // Map each audit into a Menu item element
    if (this.props.status.fetchLoading) {
      return (
        <Loader size='tiny' inverted active inline='centered' />
      );
    }
    const auditsRender = _.map(audits, audit => (
      <Menu.Item key={audit.serial_number} as={Link} to={`/audit/${audit.serial_number}`}>
        {`${moment(audit.created_at).format('DD MMM YYYY')}${audit.closed_at === '' ? ' (Open)' : ''}`}
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
  status: PropTypes.shape({
    fetchLoading: PropTypes.bool.isRequired,
    fetchError: PropTypes.bool.isRequired,
  }).isRequired,
  style: PropTypes.object.isRequired, // eslint-disable-line react/forbid-prop-types
};

export default withRouter(Sidebar);
