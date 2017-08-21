import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import _ from 'lodash';
import { Segment, Table, Icon, Header, Loader } from 'semantic-ui-react';

import { FETCH_AUDITS } from '../../actions/audits';

class Audits extends Component {
  constructor(props) {
    super(props);
    this.state = {
      audits: props.audits,
      sort: {
        key: 'created_at',
        ascending: false,
      },
    };
  }

  componentWillMount = () => {
    this.props.fetchAudits();
  }

  componentWillReceiveProps(nextProps) {
    this.setState({ ...this.state, audits: nextProps.audits });
  }

  sortAudits = (key, ascending) => {
    const auditList = _.cloneDeep(this.state.audits);

    if (auditList !== 0) {
      switch (key) {
        case 'category':
          auditList.sort((a, b) => {
            if (a.category < b.category) return ascending ? -1 : 1;
            if (a.category > b.category) return ascending ? 1 : -1;
            return 0;
          });
          break;
        case 'created_at':
          auditList.sort((a, b) => {
            const aDate = new Date(a.created_at);
            const bDate = new Date(b.created_at);
            if (aDate < bDate) return ascending ? -1 : 1;
            if (aDate > bDate) return ascending ? 1 : -1;
            return 0;
          });
          break;
        case 'closed_at':
          auditList.sort((a, b) => {
            const aDate = a.closed_at ? new Date(a.closed_at) : Date.now();
            const bDate = b.closed_at ? new Date(b.closed_at) : Date.now();
            if (aDate < bDate) return ascending ? -1 : 1;
            if (aDate > bDate) return ascending ? 1 : -1;
            return 0;
          });
          break;
        default:
          break;
      }
      this.setState({ ...this.state, audits: auditList, sort: { key, ascending } });
    }
  }
  handleSort = (key) => {
    const { sort } = this.state;
    if (!sort || sort.key !== key) this.sortAudits(key, true);
    else if (sort.key === key) this.sortAudits(key, !sort.ascending);
  }

  iconName = (tableKey) => {
    const { key, ascending } = this.state.sort;
    if (key === tableKey) {
      if (ascending) return 'triangle up';
    }
    return 'triangle down';
  }

  renderAudits = () => {
    if (this.props.fetchLoading) {
      return (
        <Table.Row textAlign='center'>
          <Table.Cell colSpan='3'><Loader size='tiny' active inline='centered' /></Table.Cell>
        </Table.Row>
      );
    }
    return _.map(this.state.audits, audit => (
      <Table.Row key={audit.serial_number}>
        <Table.Cell>{audit.category}</Table.Cell>
        <Table.Cell><Link to={`/audit/${audit.id}`}>{audit.created_at}</Link></Table.Cell>
        <Table.Cell>{audit.closed_at ? audit.closed_at : 'Audit open'}</Table.Cell>
      </Table.Row>
    ));
  }

  render() {
    return (
      <Segment>
        <Header as='h4' icon='unordered list' content='AUDIT LIST' />
        <Table selectable compact basic='very' size='small'>
          <Table.Header>
            <Table.Row>
              <Table.HeaderCell>
                <span>Type </span>
                <Icon
                  name={this.iconName('category')}
                  size='small'
                  link
                  onClick={() => this.handleSort('category')}
                />
              </Table.HeaderCell>
              <Table.HeaderCell>
                <span>Date Iniciated</span>
                <Icon
                  name={this.iconName('created_at')}
                  size='small'
                  link
                  onClick={() => this.handleSort('created_at')}
                />
              </Table.HeaderCell>
              <Table.HeaderCell>
                <span>Date Closed</span>
                <Icon
                  name={this.iconName('closed_at')}
                  size='small'
                  link
                  onClick={() => this.handleSort('closed_at')}
                />
              </Table.HeaderCell>
            </Table.Row>
          </Table.Header>
          <Table.Body>
            {this.renderAudits()}
          </Table.Body>
        </Table>
      </Segment>
    );
  }
}

Audits.propTypes = {
  fetchAudits: PropTypes.func.isRequired,
  fetchLoading: PropTypes.bool.isRequired,
  fetchError: PropTypes.bool.isRequired,
  audits: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      category: PropTypes.string.isRequired,
      created_at: PropTypes.string.isRequired,
      closed_at: PropTypes.string,
      serial_number: PropTypes.string.isRequired,
    }),
  ).isRequired,
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
};

const mapDispatchToProps = dispatch => ({
  fetchAudits: () => dispatch(FETCH_AUDITS()),
});

const mapStateToProps = state => ({
  audits: state.audits.list,
  fetchLoading: state.audits.fetchLoading,
  fetchError: state.audits.fetchError,
});

export default connect(mapStateToProps, mapDispatchToProps)(Audits);
