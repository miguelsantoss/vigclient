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
  renderPageScanEntries = () => {
    const pageScan = this.props.page;
    return _.map(pageScan, page => (
      <Table.Row key={page.id}>
        <Table.Cell>{page.id}</Table.Cell>
        <Table.Cell>{page.url}</Table.Cell>
      </Table.Row>
    ));
  }
  renderScans() {
    if (this.props.scan) {
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
        <h1>Audit {this.props.id} Serial Number: {this.props.serial_number}</h1>
        <h2>category: {this.props.category}</h2>
        <h3>{this.props.initiated_at} - {this.props.closed_at === 'NULL' ? 'present' : this.props.closed_at}</h3>
        {this.renderScans()}
        {this.renderWebScans()}
      </div>
    );
  }
}

Audit.propTypes = {
  scan: PropTypes.array, // eslint-disable-line react/forbid-prop-types, react/require-default-props
  id: PropTypes.string.isRequired, // eslint-disable-line react/forbid-prop-types
  category: PropTypes.string.isRequired, // eslint-disable-line react/forbid-prop-types
  serial_number: PropTypes.string.isRequired, // eslint-disable-line react/forbid-prop-types
  initiated_at: PropTypes.string.isRequired, // eslint-disable-line react/forbid-prop-types
  closed_at: PropTypes.string.isRequired, // eslint-disable-line react/forbid-prop-types
  // eslint-disable-next-line react/forbid-prop-types
  page: PropTypes.oneOf([PropTypes.array, PropTypes.object]),
};

Audit.defaultProps = {
  page: undefined,
};

export default Audit;
