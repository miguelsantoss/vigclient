import React, { Component } from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';

import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { Table, Grid, Segment, Header, Label, Loader } from 'semantic-ui-react';

import { FETCH_PAGE_BY_ID } from '../../actions/pages';

class Page extends Component {
  state = {
    selectedRow: null,
  }
  componentWillMount = () => {
    this.props.fetchPageByID(this.props.match.params.id);
  }

  componentWillReceiveProps = (nextProps) => {
    const { page } = nextProps;
    if (page && !page.fetchLoading && (this.state && this.state.page.fetchLoading)) {
      this.setState({ page });
    } else if (page && (page.fetchLoading || page.fetchError)) {
      this.setState({ page });
    }
  }

  labelColor = (risk) => {
    const colors = ['blue', 'green', 'yellow', 'red', 'purple'];
    return colors[risk];
  }

  renderVulnerabilityList = () => {
    const tbStyle = {
    };
    return (
      <Table
        // toggle selectable only when scan is not loading
        selectable={!(!this.state.page || this.state.page.fetchLoading)}
        compact
        basic='very'
        size='small'
      >
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell />
            <Table.HeaderCell>Title</Table.HeaderCell>
          </Table.Row>
        </Table.Header>
        <Table.Body style={tbStyle}>
          {this.renderVulnerabilityEntries()}
        </Table.Body>
      </Table>
    );
  }

  renderVulnerabilityEntries = () => {
    if (!this.state.page || this.state.page.fetchLoading) {
      return (
        <Table.Row textAlign='center'>
          <Table.Cell colSpan='3'><Loader size='tiny' active inline='centered' /></Table.Cell>
        </Table.Row>
      );
    }

    const { webVulnerabilities } = this.state.page;
    if (webVulnerabilities.length === 0) {
      return (
        <Table.Row textAlign='center'>
          <Table.Cell colSpan='3'>No detected vulnerabilities on this page.</Table.Cell>
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
    return _.map(webVulnerabilities, vuln => (
      <Table.Row
        key={vuln.id}
      >
        <Table.Cell>
          <Label color={labelColor(vuln.risk_factor)} size='mini' style={style}>
            {vuln.risk_factor}
          </Label>
        </Table.Cell>
        <Table.Cell><Link to={`/webvulnerability/${vuln.id}`}><strong>{vuln.title}</strong></Link></Table.Cell>
      </Table.Row>
    ));
  }

  render() {
    return (
      <Grid>
        <Grid.Row>
          <Grid.Column>
            <Segment>
              <Header
                as='h4'
                icon='unordered list'
                content={`VULNERABILITY LIST (${this.state.page ? this.state.page.webVulnerabilities.length : ''})`}
              />
              {this.renderVulnerabilityList()}
            </Segment>
          </Grid.Column>
        </Grid.Row>
      </Grid>
    );
  }
}

Page.propTypes = {
  fetchPageByID: PropTypes.func.isRequired,
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string.isRequired,
    }).isRequired,
    url: PropTypes.string.isRequired,
  }).isRequired,
  page: PropTypes.shape({
    url: PropTypes.string.isRequired,
    id: PropTypes.number.isRequired,
    webVulnerabilities: PropTypes.arrayOf(
      PropTypes.shape({

      }).isRequired,
    ).isRequired,
  }),
};

Page.defaultProps = {
  page: null,
};

const mapDispatchToProps = dispatch => ({
  fetchPageByID: id => dispatch(FETCH_PAGE_BY_ID(id)),
});

const mapStateToProps = (state, ownProps) => ({
  page: _.find(state.pages.list, { id: parseInt(ownProps.match.params.id, 10) }),
});

export default connect(mapStateToProps, mapDispatchToProps)(Page);
