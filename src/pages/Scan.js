import React, { Component } from 'react';
import { Table } from 'semantic-ui-react';
import { Link } from 'react-router-dom';
import _ from 'lodash';

class Scan extends Component {
  renderMachineList = () => {
    return (
      <div>
        <h4>Machine List:</h4>
        <Table celled>
          <Table.Header>
            <Table.Row>
              <Table.HeaderCell>id</Table.HeaderCell>
              <Table.HeaderCell>hostname</Table.HeaderCell>
              <Table.HeaderCell>ip address</Table.HeaderCell>
              <Table.HeaderCell>os family</Table.HeaderCell>
              <Table.HeaderCell>operating system</Table.HeaderCell>
            </Table.Row>
          </Table.Header>
          <Table.Body>
            {this.renderMachineEntry()}
          </Table.Body>
        </Table>
      </div>
    );
  }

  renderMachineEntry = () => {
    const { machines } = this.props;
    return _.map(machines, (machine) => {
      return (
        <Table.Row key={machine.id}>
          <Table.Cell><Link to={'/machine/'+machine.id}>{machine.id}</Link></Table.Cell>
          <Table.Cell>{machine.hostname}</Table.Cell>
          <Table.Cell>{machine.ip_address}</Table.Cell>
          <Table.Cell>{machine.os_family}</Table.Cell>
          <Table.Cell>{machine.operating_system}</Table.Cell>
        </Table.Row>
      );
    });
  }

  render() {
    return(
      <div>
        <h1>This is Scan {this.props.match.params.id}</h1>
        <h3>category: {this.props.scan.category}</h3>
        <h3>network: {this.props.scan.network}</h3>
        {this.renderMachineList()}
      </div>
    );
  }
}

export default Scan;
