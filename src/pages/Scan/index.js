import React, { Component } from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';

import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { Table, Grid, Segment, Container, Header, Label, Button } from 'semantic-ui-react';
import Piechart from '../../components/Piechart/index';

class Scan extends Component {
  constructor(props) {
    super(props);

    const { match } = props;
    let scan = null;
    props.scanList.forEach((scanItem) => {
      if (scanItem.id === parseInt(match.params.id, 10)) {
        scan = _.cloneDeep(scanItem);
      }
    });

    if (scan && scan !== null) {
      scan.vulnerabilities.sort((a, b) => {
        if (a.risk_factor < b.risk_factor) return 1;
        if (a.risk_factor > b.risk_factor) return -1;
        if (a.count < b.count) return 1;
        if (a.count > b.count) return -1;
        return a.title.localeCompare(b.title);
      });
      scan.machines.forEach((machine) => {
        machine.vulnerabilities.sort((a, b) => {
          if (a.risk_factor < b.risk_factor) return 1;
          if (a.risk_factor > b.risk_factor) return -1;
          if (a.count < b.count) return 1;
          if (a.count > b.count) return -1;
          return a.title.localeCompare(b.title);
        });
      });

      this.state = {
        scan,
        vulnerabilities: scan.vulnerabilities,
        machines: scan.machines,
        selectedRow: null,
      };
    }
  }

  getMachineIndex = id => this.state.machines.map(m => m.id).indexOf(id)

  handleRowClick = (machine) => {
    this.setState({ ...this.state, selectedRow: machine });
  }

  labelColor = (risk) => {
    const colors = ['blue', 'green', 'yellow', 'red', 'purple'];
    return colors[risk];
  }

  renderPortList = () => {
    const tbStyle = {
    };
    return (
      <Table selectable compact basic='very' size='small' textAlign='center'>
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell>Port Number</Table.HeaderCell>
            <Table.HeaderCell>Protocol</Table.HeaderCell>
            <Table.HeaderCell>Service</Table.HeaderCell>
          </Table.Row>
        </Table.Header>
        <Table.Body style={tbStyle}>
          {this.renderPortEntries()}
        </Table.Body>
      </Table>
    );
  }

  renderPortEntries = () => {
    if (!this.state.selectedRow) {
      return (
        <Table.Row>
          <Table.Cell colSpan='3'>Select a machine first.</Table.Cell>
        </Table.Row>
      );
    }
    const { servicePorts } = this.state.selectedRow;
    if (servicePorts.length === 0) {
      return (
        <Table.Row>
          <Table.Cell colSpan='3'>Selected Machine has no open ports.</Table.Cell>
        </Table.Row>
      );
    }
    return _.map(servicePorts, port => (
      <Table.Row
        key={port.id}
      >
        <Table.Cell>{port.port_number}</Table.Cell>
        <Table.Cell>{port.protocol}</Table.Cell>
        <Table.Cell>{port.service}</Table.Cell>
      </Table.Row>
    ));
  }

  renderVulnerabilityList = () => {
    const tbStyle = {
    };
    return (
      <Table selectable compact basic='very' size='small'>
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell />
            <Table.HeaderCell>Title</Table.HeaderCell>
            <Table.HeaderCell>Count</Table.HeaderCell>
          </Table.Row>
        </Table.Header>
        <Table.Body style={tbStyle}>
          {this.renderVulnerabilityEntries()}
        </Table.Body>
      </Table>
    );
  }

  renderVulnerabilityEntries = () => {
    if (!this.state.selectedRow) {
      return (
        <Table.Row textAlign='center'>
          <Table.Cell colSpan='3'>Select a machine first.</Table.Cell>
        </Table.Row>
      );
    }
    const { vulnerabilities } = this.state.selectedRow;
    if (vulnerabilities.length === 0) {
      return (
        <Table.Row textAlign='center'>
          <Table.Cell colSpan='3'>Selected Machine has no detected vulnerabilities.</Table.Cell>
        </Table.Row>
      );
    }
    const labelColor = (risk) => {
      const colors = ['blue', 'green', 'yellow', 'red', 'purple'];
      return colors[risk];
    };
    const style = {
      padding: ' .2em .4em',
      textAlign: 'center',
      marginLeft: '1em',
      boxSizing: 'border-box',
      height: '17px',
      width: '18px',
      lineHeight: '1.2',
    };
    return _.map(vulnerabilities, vuln => (
      <Table.Row
        key={vuln.id}
      >
        <Table.Cell>
          <Label color={labelColor(vuln.risk_factor)} size='mini' style={style}>
            {vuln.risk_factor}
          </Label>
        </Table.Cell>
        <Table.Cell><strong>{vuln.title}</strong></Table.Cell>
        <Table.Cell>{vuln.count}</Table.Cell>
      </Table.Row>
    ));
  }

  renderMachineList = () => {
    const tableStyle = {
      display: 'block',
      overflowY: 'scroll',
      height: '600px',
    };
    const tbStyle = {
    };
    return (
      <Table selectable compact basic='very' size='small'>
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell>Hostname</Table.HeaderCell>
            <Table.HeaderCell>IP Address</Table.HeaderCell>
            <Table.HeaderCell>Operating System</Table.HeaderCell>
          </Table.Row>
        </Table.Header>
        <Table.Body style={tbStyle}>
          {this.renderMachineEntries()}
        </Table.Body>
      </Table>
    );
  }

  renderMachineEntries = () => {
    if (!this.state.scan) return null;
    const { machines } = this.state.scan;
    const { selectedRow } = this.state;

    return _.map(machines, machine => (
      <Table.Row
        key={machine.id}
        active={selectedRow && selectedRow.id === machine.id}
        onClick={() => this.handleRowClick(machine)}
      >
        <Table.Cell>{machine.hostname}</Table.Cell>
        <Table.Cell>{machine.ip_address}</Table.Cell>
        <Table.Cell>{machine.operating_system}</Table.Cell>
      </Table.Row>
    ));
  }

  render() {
    return (
      <Grid>
        <Grid.Row>
          <Grid.Column width={8}>
            <Segment>
                <Header as='h4' icon='unordered list' content='MACHINE LIST' />
              {this.renderMachineList()}
            </Segment>
          </Grid.Column>
          <Grid.Column width={8}>
            <Segment>
              <Container>
                <Header as='h4' icon='setting' content='OPEN PORTS' />
                {this.renderPortList()}
              </Container>
            </Segment>
            <Segment>
              <Container>
                <Header as='h4' icon='heartbeat' content='VULNERABILITIES' />
                {this.renderVulnerabilityList()}
                <Link to={`${this.props.match.url}/vulnerabilities`}>
                  <Button compact size='tiny' fluid>Show All Vulnerabilities</Button>
                </Link>
              </Container>
            </Segment>
          </Grid.Column>
        </Grid.Row>
      </Grid>
    );
  }
}

Scan.propTypes = {
  match: PropTypes.object.isRequired, // eslint-disable-line react/forbid-prop-types
  scanList: PropTypes.arrayOf(PropTypes.shape({
    category: PropTypes.string.isRequired,
    id: PropTypes.number.isRequired,
    machines: PropTypes.arrayOf(PropTypes.shape({
      dns_name: PropTypes.string.isRequired,
      hostname: PropTypes.string.isRequired,
      id: PropTypes.number.isRequired,
      ip_address: PropTypes.string.isRequired,
      mac_address: PropTypes.string.isRequired,
      operating_system: PropTypes.string.isRequired,
      scan_id: PropTypes.number.isRequired,
      servicePorts: PropTypes.arrayOf(PropTypes.shape({
        id: PropTypes.number.isRequired,
        machine_id: PropTypes.number.isRequired,
        port_number: PropTypes.number.isRequired,
        protocol: PropTypes.string.isRequired,
        service: PropTypes.string.isRequired,
      })).isRequired,
    })).isRequired,
  })).isRequired,
};

const mapStateToProps = state => ({
  scanList: state.audits.scanList,
});

export default connect(mapStateToProps)(Scan);
