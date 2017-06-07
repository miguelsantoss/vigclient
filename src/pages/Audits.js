import React, { Component } from 'react';
import { Table } from 'semantic-ui-react';
import _ from 'lodash';

class Audits extends Component {
  renderScanEntries = () => {
    const scans = this.props.scan;
    return _.map(scans, (scan) => {
        return (
        <Table.Row key={scan.id}>
          <Table.Cell>{scan.id}</Table.Cell>
          <Table.Cell>{scan.category}</Table.Cell>
          <Table.Cell>{scan.network}</Table.Cell>
        </Table.Row>
      );
    });
  }
  renderPageScanEntries = () => {
    const pageScan = this.props.page;
    return _.map(pageScan, (page) => {
        return (
        <Table.Row key={page.id}>
          <Table.Cell>{page.id}</Table.Cell>
          <Table.Cell>{page.url}</Table.Cell>
        </Table.Row>
      );
    });
  }
  renderScans = () => {
    if(this.props.scan) {
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
      )
    }
  }
  renderWebScans = () => {
    if(this.props.page) {
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
      )
    }
  }
  render() {
    return (
      <div>
        <h1>{'Audit ' + this.props.id + ' Serial Number: ' + this.props.serial_number}</h1>
        <h2>{'category: ' + this.props.category }</h2>
        {this.renderScans()}
        {this.renderWebScans()}
      </div>
    );
  }
}

export default Audits;