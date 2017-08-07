import React, { Component } from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';

import { Link } from 'react-router-dom';
import { Table, Grid, Segment, Container, Header, Label } from 'semantic-ui-react';
import Piechart from '../../components/Piechart/index';

class Scan extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedRow: null,
    };
  }

  getMachineIndex = id => this.props.machines.map(m => m.id).indexOf(id)

  handleRowClick = (id, index) => {
    this.setState({ ...this.state, selectedRow: { id, index } });
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
    const { vulnerabilities, machines } = this.props.scan;
    if (!this.state.selectedRow) return null;
    const { index } = this.state.selectedRow;
    return _.map(vulnerabilities[index].relatedMachines, (machine) => {
      const machineIndex = this.getMachineIndex(machine);
      return (
        <Table.Row
          key={machine}
        >
          <Table.Cell>{machines[machineIndex].ip_address}</Table.Cell>
          <Table.Cell>Source</Table.Cell>
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
    const { vulnerabilities } = this.props.scan;
    return _.map(vulnerabilities, (vuln, index) => (
      <Table.Row
        key={vuln.id}
        active={this.state.selectedRow === vuln.id}
        onClick={() => this.handleRowClick(vuln.id, index)}
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
                { !disabledViz && <Piechart data={this.props.visData.allVulns} id='piechart-all-vulnerabilities' /> }
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
  scan: PropTypes.object.isRequired, // eslint-disable-line react/forbid-prop-types
  machines: PropTypes.array.isRequired, // eslint-disable-line react/forbid-prop-types
};

export default Scan;
