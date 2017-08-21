import React, { Component } from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';

import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { Table, Grid, Segment, Container, Header, Label, Loader } from 'semantic-ui-react';
import Piechart from '../../components/Piechart/index';

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

  getMachineIndex = id => this.state.scan.machines.map(m => m.id).indexOf(id)

  handleRowClick = (id) => {
    this.setState({ ...this.state, selectedRow: id });
  }

  labelColor = (risk) => {
    const colors = ['blue', 'green', 'yellow', 'red', 'purple'];
    return colors[risk];
  }

  renderRelatedMachines = () => (
    <Table
      // toggle selectable only when scan is not loading or when machine is selected
      selectable={!(!this.state.scan || this.state.scan.fetchLoading)}
      compact
      basic='very'
      size='small'
      textAlign='center'
    >
      <Table.Header>
        <Table.Row>
          <Table.HeaderCell>IP Address</Table.HeaderCell>
          <Table.HeaderCell>Source</Table.HeaderCell>
        </Table.Row>
      </Table.Header>
      <Table.Body>
        {this.renderRelatedMachineEntries()}
      </Table.Body>
    </Table>
  )

  renderRelatedMachineEntries = () => {
    if (!this.state.scan || this.state.scan.fetchLoading) {
      return (
        <Table.Row textAlign='center'>
          <Table.Cell colSpan='3'><Loader size='tiny' active inline='centered' /></Table.Cell>
        </Table.Row>
      );
    }

    const { vulnerabilities, machines } = this.state.scan;
    const { selectedRow } = this.state;

    const getVulnIndex = (id) => {
      for (let i = 0; i < vulnerabilities.length; i += 1) {
        if (vulnerabilities[i].id === id) return i;
      }
      return -1;
    };

    if (!selectedRow) {
      return (
        <Table.Row>
          <Table.Cell colSpan='4'>Select a vulnerability first.</Table.Cell>
        </Table.Row>
      );
    }

    const index = getVulnIndex(selectedRow);
    if (index === -1) return null;
    return _.map(vulnerabilities[index].relatedMachines, (machine) => {
      const machineIndex = this.getMachineIndex(machine.machine_id);
      return (
        <Table.Row key={machine.machine_id}>
          <Table.Cell>{machines[machineIndex].ip_address}</Table.Cell>
          <Table.Cell><Link to={`/vulnerability/${machine.vuln_id}`}>Vulnerabilities</Link></Table.Cell>
        </Table.Row>
      );
    });
  }

  renderVulnerabilityList = () => {
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
        style={tableStyle}
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
    const style = {
      padding: ' .2em .4em',
      textAlign: 'center',
      marginLeft: '1em',
      boxSizing: 'border-box',
      height: '17px',
      width: '18px',
      lineHeight: '1.2',
    };

    const { vulnerabilities } = this.state.scan;
    const { selectedRow } = this.state;

    return _.map(vulnerabilities, vuln => (
      <Table.Row
        key={vuln.id}
        active={selectedRow === vuln.id}
        onClick={() => this.handleRowClick(vuln.id)}
      >
        <Table.Cell>
          <Label color={this.labelColor(vuln.risk_factor)} size='mini' style={style}>
            {vuln.risk_factor}
          </Label>
        </Table.Cell>
        <Table.Cell><strong>{vuln.title}</strong></Table.Cell>
        <Table.Cell>{vuln.count}</Table.Cell>
      </Table.Row>
    ));
  }

  render() {
    const disabledViz = true;
    return (
      <Grid>
        <Grid.Row>
          <Grid.Column width={10}>
            <Segment>
              {this.renderVulnerabilityList()}
            </Segment>
          </Grid.Column>
          <Grid.Column width={6}>
            <Segment>
              <Header as='h4' icon="laptop" content='RELATED MACHINES' />
              {this.renderRelatedMachines()}
            </Segment>
            <Segment>
              <Container>
                <Header as='h4' icon='heartbeat' content='VULNERABILITIES' />
                { !disabledViz && <Piechart data={this.state.visData.allVulns} id='piechart-all-vulnerabilities' /> }
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
        service: PropTypes.string.isRequired,
      })).isRequired,
    })).isRequired,
  }).isRequired,
};

const mapDispatchToProps = dispatch => ({
  fetchScanByID: id => dispatch(FETCH_SCAN_BY_ID(id)),
});

const mapStateToProps = (state, ownProps) => ({
  scan: _.find(state.scans.list, { id: parseInt(ownProps.match.params.id, 10) }),
});

export default connect(mapStateToProps, mapDispatchToProps)(Scan);

