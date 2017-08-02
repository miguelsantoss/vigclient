import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import _ from 'lodash';
import { Segment, Table, Icon } from 'semantic-ui-react';

import SORT_AUDITS from '../actions/audits';

class Audits extends Component {
  renderAudits = () =>
    _.map(this.props.audits, audit => (
      <Table.Row key={audit.serial_number}>
        <Table.Cell>{audit.serial_number}</Table.Cell>
        <Table.Cell>{audit.category}</Table.Cell>
        <Table.Cell>{audit.created_at}</Table.Cell>
        <Table.Cell>{audit.closed_at ? audit.closed_at : 'Audit open'}</Table.Cell>
      </Table.Row>
    ))

  render() {
    return (
      <Segment>
        <Table compact='very' singleLine celled striped selectable>
          <Table.Header>
            <Table.Row style={{ background: 'red' }}>
              <Table.HeaderCell>
                Serial Number
                <Icon name='triangle down' size='mini' />
              </Table.HeaderCell>
              <Table.HeaderCell>
                Type
                <Icon name='triangle down' size='mini' />
              </Table.HeaderCell>
              <Table.HeaderCell>
                Date Iniciated
                <Icon name='triangle down' size='mini' />
              </Table.HeaderCell>
              <Table.HeaderCell>
                Date Closed
                <Icon name='triangle down' size='mini' />
              </Table.HeaderCell>
            </Table.Row>
          </Table.Header>
          <Table.Body>
            {this.renderAudits()}
          </Table.Body>
        </Table>
      </Segment>
    );
  }
}

Audits.propTypes = {
  audits: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      category: PropTypes.string.isRequired,
      created_at: PropTypes.string.isRequired,
      closed_at: PropTypes.string,
      serial_number: PropTypes.string.isRequired,
    }),
  ).isRequired,
  sortAuditsBy: PropTypes.func.isRequired,
};

const mapDispatchToProps = dispatch => ({
  sortAuditsBy: (sortKey, ascending) => dispatch(SORT_AUDITS(sortKey, ascending)),
});

const mapStateToProps = state => ({
  audits: state.audits.auditList,
});

export default connect(mapStateToProps, mapDispatchToProps)(Audits);
