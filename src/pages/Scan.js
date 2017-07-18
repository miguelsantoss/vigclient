import React, { Component } from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';

import { Link } from 'react-router-dom';
import { Table, Grid, Segment, Icon, Container, Header } from 'semantic-ui-react';
import Piechart from '../components/Piechart/index';

class Scan extends Component {
  renderMachineList() {
    return (
      <div>
        <h4>
          <Icon inline size="small" name="laptop" />
          MACHINE LIST
        </h4>
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

  renderMachineEntry() {
    const { machines } = this.props;
    return _.map(machines, machine => (
      <Table.Row key={machine.id}>
        <Table.Cell><Link to={`/machine/${machine.id}`}>{machine.id}</Link></Table.Cell>
        <Table.Cell>{machine.hostname}</Table.Cell>
        <Table.Cell>{machine.ip_address}</Table.Cell>
        <Table.Cell>{machine.os_family}</Table.Cell>
        <Table.Cell>{machine.operating_system}</Table.Cell>
      </Table.Row>
    ));
  }

  render() {
    return (
      <Grid>
        <Grid.Row>
          <Grid.Column width={10}>
            <Segment>
              {this.renderMachineList()}
            </Segment>
          </Grid.Column>
          <Grid.Column width={6}>
            <Segment>
              <h1>This is Scan {this.props.match.params.id}</h1>
              <h3>category: {this.props.scan.category}</h3>
              <h3>network: {this.props.scan.network}</h3>
            </Segment>
            <Segment>
              <Container>
                <Header>Vulnerabilities</Header>
                <Piechart data={this.props.visData.allVulns} id='piechart-all-vulnerabilities' />
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
