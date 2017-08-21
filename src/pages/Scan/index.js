import React, { Component } from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';

import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { Table, Grid, Segment, Container, Header, Label, Button, Loader } from 'semantic-ui-react';

import { FETCH_SCAN_BY_ID } from '../../actions/scans';

class Scan extends Component {
  state = {
    selectedRow: null,
  }
  componentWillMount = () => {
    this.props.fetchScanByID(this.props.match.params.id);
  }

  componentWillReceiveProps = (nextProps) => {
    const { scan } = nextProps;
    if (scan && !scan.fetchLoading && (this.state && this.state.scan.fetchLoading)) {
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
      this.setState({ scan, selectedRow: null });
    } else if (scan && (scan.fetchLoading || scan.fetchError)) {
      this.setState({ scan });
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
      <Table
        // toggle selectable only when scan is not loading or when machine is selected
        selectable={!(!this.state.scan || this.state.scan.fetchLoading) || !!this.state.selectedRow}
        compact
        basic='very'
        size='small'
        textAlign='center'
      >
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
    if (!this.state.scan || this.state.scan.fetchLoading) {
      return (
        <Table.Row textAlign='center'>
          <Table.Cell colSpan='3'><Loader size='tiny' active inline='centered' /></Table.Cell>
        </Table.Row>
      );
    }
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
      <Table
        // toggle selectable only when scan is not loading or when machine is selected
        selectable={!(!this.state.scan || this.state.scan.fetchLoading) || !!this.state.selectedRow}
        compact
        basic='very'
        size='small'
      >
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
    if (!this.state.scan || this.state.scan.fetchLoading) {
      return (
        <Table.Row textAlign='center'>
          <Table.Cell colSpan='3'><Loader size='tiny' active inline='centered' /></Table.Cell>
        </Table.Row>
      );
    }
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
      <Table
        // toggle selectable only when scan is not loading or when machine is selected
        selectable={!(!this.state.scan || this.state.scan.fetchLoading)}
        compact
        basic='very'
        size='small'
      >
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
    if (!this.state.scan || this.state.scan.fetchLoading) {
      return (
        <Table.Row textAlign='center'>
          <Table.Cell colSpan='3'><Loader size='tiny' active inline='centered' /></Table.Cell>
        </Table.Row>
      );
    }
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
                  <Button compact size='tiny' fluid>
                    {(!this.state.scan || this.state.scan.fetchLoading) ? <Loader size='tiny' active inline='centered' /> :
                    <span>Show All Vulnerabilities</span> }
                  </Button>
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
  fetchScanByID: PropTypes.func.isRequired,
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string.isRequired,
    }).isRequired,
    url: PropTypes.string.isRequired,
  }).isRequired,
  scan: PropTypes.shape({
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
        service: PropTypes.string,
      })).isRequired,
    })).isRequired,
  }),
};

Scan.defaultProps = {
  scan: null,
};

const mapDispatchToProps = dispatch => ({
  fetchScanByID: id => dispatch(FETCH_SCAN_BY_ID(id)),
});

const mapStateToProps = (state, ownProps) => ({
  scan: _.find(state.scans.list, { id: parseInt(ownProps.match.params.id, 10) }),
});

export default connect(mapStateToProps, mapDispatchToProps)(Scan);
