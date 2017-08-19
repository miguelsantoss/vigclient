import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link, withRouter } from 'react-router-dom';
import { Table, Segment, Header } from 'semantic-ui-react';
import moment from 'moment';
import _ from 'lodash';

class Audit extends Component {
  componentWillMount() {
    this.props.auditInfo.scans.forEach(scan => this.props.fetchScanByID(scan.id));
  }

  handleRowClick = id => this.props.history.push(`/scan/${id}`);

  renderScanEntries = () => {
    const { scans } = this.props.auditInfo;
    return _.map(scans, scan => (
      <Table.Row key={scan.id} onClick={() => this.handleRowClick(scan.id)}>
        <Table.Cell><Link to={`/scan/${scan.id}`}>{scan.network}</Link></Table.Cell>
        <Table.Cell>{scan.category}</Table.Cell>
      </Table.Row>
    ));
  }
  renderScans = () => (
    <Table selectable compact basic='very' size='small'>
      <Table.Header>
        <Table.Row>
          <Table.HeaderCell>Network</Table.HeaderCell>
          <Table.HeaderCell>Category</Table.HeaderCell>
        </Table.Row>
      </Table.Header>
      <Table.Body>
        {this.renderScanEntries()}
      </Table.Body>
    </Table>
  )

  render() {
    const { auditInfo } = this.props;
    return (
      <Segment>
        <Header
          as='h4'
          icon='calendar check'
          content={`${moment(auditInfo.created_at).format('DD MMM YYYY')} - ${auditInfo.closed_at === '' ?
            ' (Open)' : moment(auditInfo.created_at).format('DD MMM YYYY')}`}
        />
        {this.renderScans()}
        { auditInfo.scans.length === 0 ? <Header>There are no scans here yet</Header> : null}
      </Segment>
    );
  }
}

Audit.propTypes = {
  fetchScanByID: PropTypes.func.isRequired,
  auditInfo: PropTypes.shape({
    scan: PropTypes.array,
    id: PropTypes.number.isRequired,
    category: PropTypes.string.isRequired,
    serial_number: PropTypes.string.isRequired,
    created_at: PropTypes.string.isRequired,
    closed_at: PropTypes.string.isRequired,
    scans: PropTypes.arrayOf(PropTypes.shape({
      id: PropTypes.number.isRequired,
      category: PropTypes.string.isRequired,
      network: PropTypes.string.isRequired,
    })),
  }).isRequired,
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
};

const mapStateToProps = state => ({
  audits: state.audits.auditList,
});

export default connect(mapStateToProps)(withRouter(Audit));
