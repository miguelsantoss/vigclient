import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { Table } from 'semantic-ui-react';
import _ from 'lodash';

class Audit extends Component {
  renderScanEntries = () => {
    const scans = this.props.scan;
    return _.map(scans, scan => (
      <Table.Row key={scan.id}>
        <Table.Cell><Link to={`/scan/${scan.id}`}>{scan.id}</Link></Table.Cell>
        <Table.Cell>{scan.category}</Table.Cell>
        <Table.Cell>{scan.network}</Table.Cell>
      </Table.Row>
    ));
  }
  renderScans() {
    if (this.props.auditInfo.scan) {
      return (
        <div>
          <h4>Network scans:</h4>
          <Table celled>
            <Table.Header>
              <Table.Row>
                <Table.HeaderCell>id</Table.HeaderCell>
                <Table.HeaderCell>category</Table.HeaderCell>
                <Table.HeaderCell>network</Table.HeaderCell>
              </Table.Row>
            </Table.Header>
            <Table.Body>
              {this.renderScanEntries()}
            </Table.Body>
          </Table>
        </div>
      );
    }
    return null;
  }
  render() {
    return (
      <div>
        <h1>Audit {this.props.auditInfo.id} Serial Number: {this.props.auditInfo.serial_number}</h1>
        <h2>category: {this.props.auditInfo.category}</h2>
        <h3>{this.props.auditInfo.created_at} - {this.props.auditInfo.closed_at === '' ? 'present' : this.props.auditInfo.closed_at}</h3>
        {this.renderScans()}
      </div>
    );
  }
}

Audit.propTypes = {
  auditInfo: PropTypes.shape({
    scan: PropTypes.array,
    id: PropTypes.number.isRequired,
    category: PropTypes.string.isRequired,
    serial_number: PropTypes.string.isRequired,
    created_at: PropTypes.string.isRequired,
    closed_at: PropTypes.string.isRequired,
  }).isRequired,
};

Audit.defaultProps = {
  page: undefined,
};

export default Audit;
