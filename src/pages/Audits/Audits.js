import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import _ from 'lodash';
import { Segment, Table, Icon } from 'semantic-ui-react';

import { SORT_AUDITS_BY } from '../../actions/audits';

class Audits extends Component {
  handleSort = (key) => {
    const { sort } = this.props;
    if (!this.props.sort || this.props.sort.key !== key) this.props.sortAuditsBy(key, true);
    else if (sort.key === key) this.props.sortAuditsBy(key, !sort.ascending);
  }

  iconName = (tableKey) => {
    const { key, ascending } = this.props.sort;
    if (key === tableKey) {
      if (ascending) return 'triangle up';
    }
    return 'triangle down';
  }

  renderAudits = () =>
    _.map(this.props.audits, audit => (
      <Table.Row key={audit.serial_number}>
        <Table.Cell><Link to={`/audit/${audit.serial_number}`}>{audit.serial_number}</Link></Table.Cell>
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
                <span>Serial Number </span>
                <Icon name='sort' />
              </Table.HeaderCell>
              <Table.HeaderCell>
                <span>Type </span>
                <Icon
                  name={this.iconName('category')}
                  size='small'
                  link
                  onClick={() => this.handleSort('category')}
                />
              </Table.HeaderCell>
              <Table.HeaderCell>
                <span>Date Iniciated</span>
                <Icon
                  name={this.iconName('created_at')}
                  size='small'
                  link
                  onClick={() => this.handleSort('created_at')}
                />
              </Table.HeaderCell>
              <Table.HeaderCell>
                <span>Date Closed</span>
                <Icon
                  name={this.iconName('closed_at')}
                  size='small'
                  link
                  onClick={() => this.handleSort('closed_at')}
                />
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
  sort: PropTypes.shape({
    key: PropTypes.string.isRequired,
    ascending: PropTypes.bool.isRequired,
  }).isRequired,
  sortAuditsBy: PropTypes.func.isRequired,
};

const mapDispatchToProps = dispatch => ({
  sortAuditsBy: (sortKey, ascending) => dispatch(SORT_AUDITS_BY(sortKey, ascending)),
});

const mapStateToProps = state => ({
  audits: state.audits.auditList,
  sort: state.audits.auditSort,
});

export default connect(mapStateToProps, mapDispatchToProps)(Audits);
