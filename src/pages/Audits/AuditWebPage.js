import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Table } from 'semantic-ui-react';
import _ from 'lodash';

class Audit extends Component {
  renderPageScanEntries = () => {
    const pageScan = this.props.page;
    return _.map(pageScan, page => (
      <Table.Row key={page.id}>
        <Table.Cell>{page.id}</Table.Cell>
        <Table.Cell>{page.url}</Table.Cell>
      </Table.Row>
    ));
  }
  renderWebScans() {
    if (this.props.page) {
      return (
        <div>
          <h4>Web scans:</h4>
          <Table celled>
            <Table.Header>
              <Table.Row>
                <Table.HeaderCell>id</Table.HeaderCell>
                <Table.HeaderCell>url</Table.HeaderCell>
              </Table.Row>
            </Table.Header>
            <Table.Body>
              {this.renderPageScanEntries()}
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
        {this.renderWebScans()}
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

export default Audit;
