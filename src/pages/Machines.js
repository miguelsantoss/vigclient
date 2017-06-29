import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Table } from 'semantic-ui-react';
import { Link } from 'react-router-dom';
import _ from 'lodash';

class Machines extends Component {
  renderOpenPorts() {
    return (
      <div>
        <h4>Open Ports:</h4>
        <Table celled>
          <Table.Header>
            <Table.Row>
              <Table.HeaderCell>id</Table.HeaderCell>
              <Table.HeaderCell>port number</Table.HeaderCell>
              <Table.HeaderCell>protocol</Table.HeaderCell>
              <Table.HeaderCell>service</Table.HeaderCell>
            </Table.Row>
          </Table.Header>
          <Table.Body>
            {this.renderOpenPortEntries()}
          </Table.Body>
        </Table>
      </div>
    );
  }

  renderOpenPortEntries() {
    const { ports } = this.props;
    return _.map(ports, port => (
      <Table.Row key={port.id}>
        <Table.Cell>{port.id}</Table.Cell>
        <Table.Cell>{port.port_number}</Table.Cell>
        <Table.Cell>{port.protocol}</Table.Cell>
        <Table.Cell>{port.service}</Table.Cell>
      </Table.Row>
    ));
  }

  renderVulnerabilities() {
    return (
      <div>
        <h4>Vulnerabilities:</h4>
        <Table celled>
          <Table.Header>
            <Table.Row>
              <Table.HeaderCell>id</Table.HeaderCell>
              <Table.HeaderCell>title</Table.HeaderCell>
              <Table.HeaderCell>category</Table.HeaderCell>
              <Table.HeaderCell>risk_factor</Table.HeaderCell>
              <Table.HeaderCell>cvss_score</Table.HeaderCell>
            </Table.Row>
          </Table.Header>
          <Table.Body>
            {this.renderVulnerabilityEntries()}
          </Table.Body>
        </Table>
      </div>
    );
  }

  renderVulnerabilityEntries() {
    const { vulnerabilities } = this.props;
    return _.map(vulnerabilities, vuln => (
      <Table.Row key={vuln.id}>
        <Table.Cell><Link to={`/vulnerability/${vuln.id}`}>{vuln.id}</Link></Table.Cell>
        <Table.Cell>{vuln.title}</Table.Cell>
        <Table.Cell>{vuln.category}</Table.Cell>
        <Table.Cell>{vuln.risk_factor}</Table.Cell>
        <Table.Cell>{vuln.cvss_score}</Table.Cell>
      </Table.Row>
    ));
  }

  render() {
    const { id, hostname } = this.props.machine;
    const ipAddress = this.props.machine.ip_address;
    return (
      <div>
        <h2>Machine id: {id}</h2>
        <h2>Hostname: {hostname}</h2>
        <h2>Ip address: {ipAddress}</h2>
        {this.renderOpenPorts()}
        <br />
        {this.renderVulnerabilities()}
      </div>
    );
  }
}

Machines.propTypes = {
  machine: PropTypes.object.isRequired, // eslint-disable-line react/forbid-prop-types
  vulnerabilities: PropTypes.array.isRequired, // eslint-disable-line react/forbid-prop-types
  ports: PropTypes.array.isRequired, // eslint-disable-line react/forbid-prop-types
};

export default Machines;
