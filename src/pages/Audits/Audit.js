import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link, withRouter } from 'react-router-dom';
import { Table, Segment, Header } from 'semantic-ui-react';
import moment from 'moment';
import _ from 'lodash';
import { FETCH_AUDIT_BY_ID } from '../../actions/audits';

class Audit extends Component {
  componentWillMount() {
    const { id } = this.props.match.params;
    this.props.fetchAuditByID(id);
  }

  renderScanEntries = () => {
    if (!this.props.audit) {
      return null;
    }
    const { scans } = this.props.audit;
    return _.map(scans, scan => (
      <Table.Row key={scan.id}>
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
    const { audit } = this.props;
    return (
      <Segment>
        <Header
          as='h4'
          icon='calendar check'
          content={`${moment(audit.created_at).format('DD MMM YYYY')} - ${audit.closed_at === '' ?
            ' (Open)' : moment(audit.created_at).format('DD MMM YYYY')}`}
        />
        {this.renderScans()}
        { audit.scans.length === 0 ? <Header>There are no scans here yet</Header> : null}
      </Segment>
    );
  }
}

Audit.propTypes = {
  fetchAuditByID: PropTypes.func.isRequired,
  audit: PropTypes.shape({
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
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string.isRequired,
    }).isRequired,
  }).isRequired,
};

const mapDispatchToProps = dispatch => ({
  fetchAuditByID: id => dispatch(FETCH_AUDIT_BY_ID(id)),
});

const mapStateToProps = (state, ownProps) => ({
  audit: _.find(state.audits.list, 'serial_number', ownProps.match.params.id),
});

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Audit));
