import React, { Component } from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';

import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { Table, Segment, Header, Loader, Input, Icon } from 'semantic-ui-react';

import keyboardKey from '../../utils/keyboardKey';
import { FETCH_MACHINE_BY_ID } from '../../actions/machines';

class Machine extends Component {
  state = {
    query: '',
  }

  componentWillMount = () => {
    this.props.fetchMachineByID(this.props.match.params.id);
  }

  componentWillReceiveProps = (nextProps) => {
    const { machine } = nextProps;
    // eslint-disable-next-line max-len
    if (machine && !machine.fetchLoading && (this.state && this.state.machine.fetchLoading)) {
      this.setState({ ...this.state, machine });
    } else if (machine && (machine.fetchLoading || machine.fetchError)) {
      this.setState({ ...this.state, machine });
    }
  }

  handleSearchChange = (e) => {
    this.setState({ query: e.target.value }, () => {
      this.filterVulnerabilities();
    });
  }

  handleSearchKeyDown = (e) => {
    const code = keyboardKey.getCode(e);
    if (code === keyboardKey.Enter) {
      e.preventDefault();
      this.filterVulnerabilities();
    }
  }

  filterVulnerabilities = () => {
    const { query } = this.state;
    const { vulnerabilities } = this.props.machine;

    const re = new RegExp(_.escapeRegExp(query), 'i');
    const isMatch = result => re.test(result.title);

    this.setState({
      ...this.state,
      machine: {
        ...this.state.machine,
        vulnerabilities: _.filter(vulnerabilities, isMatch),
      },
    });
  }

  renderVulnerabilityEntries = () => {
    if (!this.state.machine) {
      return null;
    }
    if (this.state.machine.fetchLoading) {
      return (
        <Table.Row textAlign='center'>
          <Table.Cell colSpan='3'><Loader size='tiny' active inline='centered' /></Table.Cell>
        </Table.Row>
      );
    }
    const { vulnerabilities } = this.state.machine;
    if (!vulnerabilities || vulnerabilities.length === 0) {
      return (
        <Table.Row textAlign='center'>
          <Table.Cell colSpan='3'>No vulnerabilities detected.</Table.Cell>
        </Table.Row>
      );
    }
    return _.map(vulnerabilities, vuln => (
      <Table.Row key={vuln.id}>
        <Table.Cell>{vuln.vid}</Table.Cell>
        <Table.Cell><Link to={`/vulnerability/${vuln.id}`}>{vuln.title}</Link></Table.Cell>
        <Table.Cell>{vuln.risk_factor}</Table.Cell>
      </Table.Row>
    ));
  }

  renderVulnerabilityList = () => (
    <Table selectable compact size='small'>
      <Table.Header>
        <Table.Row>
          <Table.HeaderCell>
            <span>VID</span>
          </Table.HeaderCell>
          <Table.HeaderCell>
            <span>Title</span>
          </Table.HeaderCell>
          <Table.HeaderCell>
            <span>Risk</span>
          </Table.HeaderCell>
        </Table.Row>
      </Table.Header>
      <Table.Body>
        {this.renderVulnerabilityEntries()}
      </Table.Body>
    </Table>
  )

  render() {
    return (
      <Segment>
        <Header
          as='h4'
          icon='unordered list'
          content='VULNERABILITIES'
        />
        <Input
          icon={<Icon name="search" />}
          placeholder="Filter Vulnerabilities"
          value={this.state.query}
          onChange={this.handleSearchChange}
          onKeyDown={this.handleSearchKeyDown}
        />
        {this.renderVulnerabilityList()}
      </Segment>
    );
  }
}

Machine.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string.isRequired,
    }).isRequired,
  }).isRequired,
  fetchMachineByID: PropTypes.func.isRequired,
  machine: PropTypes.shape({
    id: PropTypes.number.isRequired,
    ip_address: PropTypes.string.isRequired,
    hostname: PropTypes.string.isRequired,
    dns_name: PropTypes.string.isRequired,
    operating_system: PropTypes.string.isRequired,
    vulnerabilities: PropTypes.arrayOf(
      PropTypes.shape({

      }).isRequired,
    ).isRequired,
    fetchLoading: PropTypes.bool.isRequired,
    fetchError: PropTypes.bool.isRequired,
  }).isRequired,
};

const mapDispatchToProps = dispatch => ({
  fetchMachineByID: id => dispatch(FETCH_MACHINE_BY_ID(id)),
});

const mapStateToProps = (state, ownProps) => ({
  machine: _.find(state.machines.list, { id: parseInt(ownProps.match.params.id, 10) }) || {
    id: parseInt(ownProps.match.params.id, 10),
    ip_address: '',
    hostname: '',
    dns_name: '',
    operating_system: '',
    vulnerabilities: [],
    fetchLoading: true,
    fetchError: false,
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(Machine);
