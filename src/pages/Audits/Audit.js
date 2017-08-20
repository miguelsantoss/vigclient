import React, { Component } from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';
import moment from 'moment';

import { connect } from 'react-redux';
import { Link, withRouter } from 'react-router-dom';
import { Table, Segment, Header } from 'semantic-ui-react';
import { FETCH_AUDIT_BY_ID } from '../../actions/audits';

class Audit extends Component {
  componentWillMount() {
    const { id } = this.props.match.params;
    this.props.fetchAuditByID(id);
  }

  renderTable = () => {
    const { scans } = this.props.audit;
    if (scans.length !== 0) {
      return this.renderScans();
    }
    return this.renderPages();
  }

  renderDateHeader = () => {
    const { audit } = this.props;
    return (
      <Header
        as='h4'
        icon='calendar check'
        content={`${moment(audit.created_at).format('DD MMM YYYY')} - ${audit.closed_at === '' ?
          ' (Open)' : moment(audit.created_at).format('DD MMM YYYY')}`}
      />
    );
  }

  renderScanEntries = () => {
    const { scans } = this.props.audit;
    if (scans.length === 0) {
      return (<Header>There are no scans here yet</Header>);
    }
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

  renderPageEntries = () => {
    const { pages } = this.props.audit;
    if (pages.length === 0) {
      return (<Header>There are no pages here yet</Header>);
    }
    return _.map(pages, page => (
      <Table.Row key={page.id}>
        <Table.Cell><Link to={`/scan/${page.id}`}>{page.url}</Link></Table.Cell>
      </Table.Row>
    ));
  }

  renderPages = () => (
    <Table selectable compact basic='very' size='small'>
      <Table.Header>
        <Table.Row>
          <Table.HeaderCell>URL</Table.HeaderCell>
        </Table.Row>
      </Table.Header>
      <Table.Body>
        {this.renderPageEntries()}
      </Table.Body>
    </Table>
  )

  render() {
    const { audit } = this.props;
    if (!audit) {
      return null;
    }
    return (
      <Segment>
        {this.renderDateHeader(audit)}
        {this.renderTable()}
      </Segment>
    );
  }
}

Audit.propTypes = {
  fetchAuditByID: PropTypes.func.isRequired,
  audit: PropTypes.shape({
    id: PropTypes.number.isRequired,
    category: PropTypes.string.isRequired,
    serial_number: PropTypes.string.isRequired,
    created_at: PropTypes.string.isRequired,
    closed_at: PropTypes.string.isRequired,
    scans: PropTypes.arrayOf(PropTypes.shape({
      id: PropTypes.number.isRequired,
      category: PropTypes.string.isRequired,
      network: PropTypes.string.isRequired,
    })).isRequired,
    pages: PropTypes.arrayOf(PropTypes.shape({
      url: PropTypes.string.isRequired,
      id: PropTypes.number.isRequired,
    })).isRequired,
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
  audit: _.find(state.audits.list, { id: parseInt(ownProps.match.params.id, 10) }),
  audits: state.audits.list,
});

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Audit));
