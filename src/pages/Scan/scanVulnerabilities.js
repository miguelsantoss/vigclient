import React, { Component } from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';

import { Redirect, Route, Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { Table, Grid, Segment, Container, Header, Label } from 'semantic-ui-react';
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

      this.state = {
        scan,
        vulnerabilities: scan.vulnerabilities,
        machines: scan.machines,
        selectedRow: null,
      };
    }
  }

  getMachineIndex = id => this.state.machines.map(m => m.id).indexOf(id)

  handleRowClick = (id) => {
    this.setState({ ...this.state, selectedRow: id });
  }

  labelColor = (risk) => {
    const colors = ['blue', 'green', 'yellow', 'red', 'purple'];
    return colors[risk];
  }

  renderRelatedMachines = () => (
    <Table selectable compact basic='very' size='small' textAlign='center'>
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
    if (!this.state.scan) return null;
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
      const machineIndex = this.getMachineIndex(machine);
      return (
        <Table.Row
          key={machine}
        >
          <Table.Cell>{machines[machineIndex].ip_address}</Table.Cell>
          <Table.Cell><Link to={`/machine/${machine}`}>Vulnerabilities</Link></Table.Cell>
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
      <Table selectable compact basic='very' style={tableStyle} size='small'>
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
    const style = {
      padding: ' .2em .4em',
      textAlign: 'center',
      marginLeft: '1em',
      boxSizing: 'border-box',
      height: '17px',
      width: '18px',
      lineHeight: '1.2',
    };
    if (!this.state.scan) return null;
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
  match: PropTypes.object.isRequired, // eslint-disable-line react/forbid-prop-types
  scanList: PropTypes.arrayOf(PropTypes.shape({
    category: PropTypes.string.isRequired,
    id: PropTypes.number.isRequired,
    created_at: PropTypes.string.isRequired,
    updated_at: PropTypes.string.isRequired,
    machines: PropTypes.arrayOf(PropTypes.shape({

    })).isRequired,
  })).isRequired,
};

const mapStateToProps = state => ({
  scanList: state.audits.scanList,
});

export default connect(mapStateToProps)(Scan);
