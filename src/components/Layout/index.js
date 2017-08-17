import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import cx from 'classnames';
import { Grid, Breadcrumb, Segment } from 'semantic-ui-react';

import Sidebar from '../Sidebar';
import Appbar from '../Appbar';
import MessageList from '../messages/MessageList';
import browserHistory from '../../history';
import s from './index.scss';
import { RESET_STATE_STORE } from '../../actions/common';

const style = {};
const sidebarWidth = 200;

style.main = {
  marginLeft: sidebarWidth,
  marginTop: 49,
};

style.appbar = {
  // background: '#1d2b69',
  background: '#2d5f8b',
};

style.grid = {
  // marginleft: siddebarWidth + 'px',
  marginLeft: 0,
  paddingRight: '15px',
  paddingLeft: '0px',
  background: '#ecf0f5',
};

style.menu = {
  position: 'fixed',
  top: 49,
  width: sidebarWidth,
  paddingBottom: '1em',
  // background: '#394694',
  background: '#4276a4',
};

class Layout extends Component {
  state = {
    history: {
      audit: '',
      scan: '',
      machine: '',
      vuln: '',
    },
  };

  componentWillReceiveProps() {
    // This is a hack -- pass history prop just to force update
    // this is not good
    const route = browserHistory.location.pathname.split('/');
    if (route[1] !== undefined) {
      switch (route[1]) {
        case 'audit':
          this.setState({
            history: {
              audit: route[2],
              scan: '',
              machine: '',
              vuln: '',
            },
          });
          break;
        case 'scan':
          this.setState({
            history: {
              ...this.state.history,
              scan: route[2],
              machine: '',
              vuln: '',
            },
          });
          break;
        case 'machine':
          this.setState({
            history: {
              ...this.state.history,
              machine: route[2],
              vuln: '',
            },
          });
          break;
        case 'vulnerability':
          this.setState({
            history: {
              ...this.state.history,
              vuln: route[2],
            },
          });
          break;
        default:
          this.setState({
            history: {
              audit: '',
              scan: '',
              machine: '',
              vuln: '',
            },
          });
      }
    }
  }

  renderBreadcrumbHistory() {
    // Improve this with new routes
    const { history } = this.state;
    return (
      <Segment>
        <Breadcrumb>
          <Breadcrumb.Section><Link to='/'>Home</Link></Breadcrumb.Section>
          { history.audit && <Breadcrumb.Divider icon='right angle' /> }
          { history.audit && <Breadcrumb.Section><Link to={`/audit/${history.audit}`}>Audit {history.audit}</Link></Breadcrumb.Section> }
          { history.scan && <Breadcrumb.Divider icon='right angle' /> }
          { history.scan && <Breadcrumb.Section><Link to={`/scan/${history.scan}`}>Scan {history.scan}</Link></Breadcrumb.Section> }
          { history.machine && <Breadcrumb.Divider icon='right angle' /> }
          { history.machine && <Breadcrumb.Section><Link to={`/machine/${history.machine}`}>Machine {history.machine}</Link></Breadcrumb.Section> }
          { history.vuln && <Breadcrumb.Divider icon='right angle' /> }
          { history.vuln && <Breadcrumb.Section><Link to={`/vulnerability/${history.vuln}`}>Vulnerability {history.vuln}</Link></Breadcrumb.Section> }
        </Breadcrumb>
      </Segment>
    );
  }
  render() {
    return (
      <div>
        <Appbar
          style={style.appbar}
          client={this.props.client}
          history={this.props.history}
          reset={this.props.reset}
        />
        <Sidebar audits={this.props.audits} style={style.menu} />
        <div style={style.main}>
          {this.renderBreadcrumbHistory()}
          <Grid style={style.grid}>
            <Grid.Row>
              <Grid.Column />
            </Grid.Row>
            <Grid.Row>
              <Grid.Column>
                <MessageList />
                {this.props.children}
              </Grid.Column>
            </Grid.Row>
          </Grid>
        </div>
      </div>
    );
  }
}

Layout.propTypes = {
  audits: PropTypes.array.isRequired, // eslint-disable-line react/forbid-prop-types
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.element),
    PropTypes.element,
  ]).isRequired,
  client: PropTypes.shape({
    acronym: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
  }).isRequired,
};

const mapDispatchToProps = dispatch => ({
  reset: () => dispatch(RESET_STATE_STORE()),
});

const mapStateToProps = state => ({
  audits: state.audits.auditList,
  client: state.profile.info,
});

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Layout));
