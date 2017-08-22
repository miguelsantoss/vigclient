import React, { Component } from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';
import { Link, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import cx from 'classnames';
import { Grid, Breadcrumb, Segment } from 'semantic-ui-react';

import Sidebar from '../Sidebar';
import Appbar from '../Appbar';
import MessageList from '../messages/MessageList';
import s from './index.scss';

import { FETCH_AUDITS } from '../../actions/audits';
import { FETCH_PROFILE_INFO } from '../../actions/profile';
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
  constructor(props) {
    super(props);
    this.state = {
      history: null,
      lastRoute: props.location.pathname,
    };
  }

  componentWillMount = () => {
    this.props.fetchAudits();
    this.props.fetchProfileInfo();
  }

  componentWillReceiveProps = (nextProps) => {
    this.setState({
      ...this.state,
      history: this.handleNewRoute(nextProps.location.pathname, nextProps),
    });
  }

  handleNewRoute = (pathname, props) => {
    const route = pathname.split('/');
    if (props && route[1] && route[1] !== '') {
      const { audits } = props;
      const { scans } = props;
      const { pages } = props;
      const { machines } = props;
      const { vulnerabilities } = props;
      const { webvulnerabilities } = props;
      let audit;
      let scan;
      let page;
      let machine;
      let vulnerability;
      let webvulnerability;
      switch (route[1]) {
        case 'profile':
          return (
            <div>
              <Breadcrumb.Section>
                <Link to='/'>Home</Link>
              </Breadcrumb.Section>
              <Breadcrumb.Divider icon='right angle' />
              <Breadcrumb.Section>
                <span>Profile</span>
              </Breadcrumb.Section>
            </div>
          );
        case 'audits':
          return (
            <div>
              <Breadcrumb.Section>
                <Link to='/'>Home</Link>
                <span> | {props.client.name}</span>
              </Breadcrumb.Section>
              <Breadcrumb.Divider icon='right angle' />
              <Breadcrumb.Section>
                <Link to='/audits/'>Audits</Link>
              </Breadcrumb.Section>
            </div>
          );
        case 'audit':
          for (let i = 0; i < audits.length; i += 1) {
            if (audits[i].id === parseInt(route[2], 10)) {
              audit = audits[i];
            }
          }
          if (!audit) return null;
          return (
            <div>
              <Breadcrumb.Section>
                <Link to='/'>Home</Link>
                <span> | {props.client.name}</span>
              </Breadcrumb.Section>
              <Breadcrumb.Divider icon='right angle' />
              <Breadcrumb.Section>
                <Link to='/audits/'>Audits</Link>
                <span> | {audit.created_at}</span>
              </Breadcrumb.Section>
              <Breadcrumb.Divider icon='right angle' />
              <Breadcrumb.Section>
                <Link to={`/audit/${route[2]}`}>{ audit.category === 'web' ? 'Pages' : 'Scans'}</Link>
              </Breadcrumb.Section>
            </div>
          );
        case 'scan':
          for (let i = 0; i < scans.length; i += 1) {
            if (scans[i].id === parseInt(route[2], 10)) {
              scan = scans[i];
            }
          }

          if (!scan) {
            return null;
          }
          return (
            <div>
              <Breadcrumb.Section>
                <Link to='/'>Home</Link>
                <span> | {props.client.name}</span>
              </Breadcrumb.Section>
              <Breadcrumb.Divider icon='right angle' />
              <Breadcrumb.Section>
                <Link to='/audits/'>Audits</Link>
                <span> | {scan.audit_date}</span>
              </Breadcrumb.Section>
              <Breadcrumb.Divider icon='right angle' />
              <Breadcrumb.Section>
                <Link to={`/audit/${scan.audit_id}`}>Scans</Link>
                <span> | {scan.network}</span>
              </Breadcrumb.Section>
              {
                route[3] && route[3] === 'vulnerabilities' && <Breadcrumb.Divider icon='right angle' />
              }
              {
                route[3] && route[3] === 'vulnerabilities' && (
                  <Breadcrumb.Section>
                    <strong>All Vulnerabilities</strong>
                  </Breadcrumb.Section>
                )
              }
            </div>
          );
        case 'page':
          for (let i = 0; i < pages.length; i += 1) {
            if (pages[i].id === parseInt(route[2], 10)) {
              page = pages[i];
            }
          }

          if (!page) {
            return null;
          }
          return (
            <div>
              <Breadcrumb.Section>
                <Link to='/'>Home</Link>
                <span> | {props.client.name}</span>
              </Breadcrumb.Section>
              <Breadcrumb.Divider icon='right angle' />
              <Breadcrumb.Section>
                <Link to='/audits/'>Audits</Link>
                <span> | {page.audit_date}</span>
              </Breadcrumb.Section>
              <Breadcrumb.Divider icon='right angle' />
              <Breadcrumb.Section>
                <Link to={`/audit/${page.audit_id}`}>Scans</Link>
                <span> | {page.url}</span>
              </Breadcrumb.Section>
              <Breadcrumb.Divider icon='right angle' />
              <Breadcrumb.Section>
                <strong>All Vulnerabilities</strong>
              </Breadcrumb.Section>
            </div>
          );

        case 'machine':
          for (let i = 0; i < machines.length; i += 1) {
            if (machines[i].id === parseInt(route[2], 10)) {
              machine = machines[i];
            }
          }
          if (!machine) {
            return null;
          }
          return (
            <div>
              <Breadcrumb.Section>
                <Link to='/'>Home</Link>
                <span> | {props.client.name}</span>
              </Breadcrumb.Section>
              <Breadcrumb.Divider icon='right angle' />
              <Breadcrumb.Section>
                <Link to='/audits/'>Audits</Link>
                <span> | {machine.audit_date}</span>
              </Breadcrumb.Section>
              <Breadcrumb.Divider icon='right angle' />
              <Breadcrumb.Section>
                <Link to={`/audit/${machine.audit_id}`}>Scans</Link>
                <span> | {machine.scan_network}</span>
              </Breadcrumb.Section>
              <Breadcrumb.Divider icon='right angle' />
              <Breadcrumb.Section>
                <Link to={`/scan/${machine.scan_id}`}>Machines</Link>
                <span> | {machine.ip_address}</span>
              </Breadcrumb.Section>
              <Breadcrumb.Divider icon='right angle' />
              <Breadcrumb.Section>
                <strong>Vulnerabilities</strong>
              </Breadcrumb.Section>
            </div>
          );
        case 'webvulnerability':
          for (let i = 0; i < webvulnerabilities.length; i += 1) {
            if (webvulnerabilities[i].id === parseInt(route[2], 10)) {
              webvulnerability = webvulnerabilities[i];
            }
          }
          if (!webvulnerability) {
            return null;
          }
          return (
            <div>
              <Breadcrumb.Section>
                <Link to='/'>Home</Link>
                <span> | {props.client.name}</span>
              </Breadcrumb.Section>
              <Breadcrumb.Divider icon='right angle' />
              <Breadcrumb.Section>
                <Link to='/audits/'>Audits</Link>
                <span> | {webvulnerability.audit_date}</span>
              </Breadcrumb.Section>
              <Breadcrumb.Divider icon='right angle' />
              <Breadcrumb.Section>
                <Link to={`/audit/${webvulnerability.audit_id}`}>Pages</Link>
                <span> | {webvulnerability.page_url}</span>
              </Breadcrumb.Section>
              <Breadcrumb.Divider icon='right angle' />
              <Breadcrumb.Section>
                <Link to={`/page/${webvulnerability.page_id}`}>Web Vulnerabilities</Link>
                <span> | id:{webvulnerability.id}</span>
              </Breadcrumb.Section>
              <Breadcrumb.Divider icon='right angle' />
              <Breadcrumb.Section>
                <strong>Details</strong>
              </Breadcrumb.Section>
            </div>
          );
        case 'vulnerability':
          for (let i = 0; i < vulnerabilities.length; i += 1) {
            if (vulnerabilities[i].id === parseInt(route[2], 10)) {
              vulnerability = vulnerabilities[i];
            }
          }
          if (!vulnerability) {
            return null;
          }
          return (
            <div>
              <Breadcrumb.Section>
                <Link to='/'>Home</Link>
                <span> | {props.client.name}</span>
              </Breadcrumb.Section>
              <Breadcrumb.Divider icon='right angle' />
              <Breadcrumb.Section>
                <Link to='/audits/'>Audits</Link>
                <span> | {vulnerability.audit_date}</span>
              </Breadcrumb.Section>
              <Breadcrumb.Divider icon='right angle' />
              <Breadcrumb.Section>
                <Link to={`/audit/${vulnerability.audit_id}`}>Scans</Link>
                <span> | {vulnerability.scan_network}</span>
              </Breadcrumb.Section>
              <Breadcrumb.Divider icon='right angle' />
              <Breadcrumb.Section>
                <Link to={`/scan/${vulnerability.scan_id}`}>Machines</Link>
                <span> | {vulnerability.machine_ip}</span>
              </Breadcrumb.Section>
              <Breadcrumb.Divider icon='right angle' />
              <Breadcrumb.Section>
                <Link to={`/machine/${vulnerability.machine_id}`}>Vulnerabilities</Link>
                <span> | vid:{vulnerability.vid}</span>
              </Breadcrumb.Section>
              <Breadcrumb.Divider icon='right angle' />
              <Breadcrumb.Section>
                <strong>Details</strong>
              </Breadcrumb.Section>
            </div>
          );
        default:
          return (
            <div>
              <Breadcrumb.Section>
                <Link to='/'>Home</Link>
              </Breadcrumb.Section>
            </div>
          );
      }
    }
    return (
      <div>
        <Breadcrumb.Section>
          <Link to='/'>Home</Link>
        </Breadcrumb.Section>
      </div>
    );
  }

  renderBreadcrumbHistory = () => {
    const { history } = this.state;
    return (
      <Segment size='tiny' style={{ marginBottom: 0 }}>
        <Breadcrumb size='tiny'>
          {history}
        </Breadcrumb>
      </Segment>
    );
  }
  render = () => {
    const { fetchLoading, fetchError } = this.props;
    return (
      <div>
        <Appbar
          style={style.appbar}
          client={this.props.client}
          history={this.props.history}
          reset={this.props.reset}
        />
        <Sidebar audits={this.props.audits} style={style.menu} status={{ fetchLoading, fetchError }} />
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
  fetchAudits: PropTypes.func.isRequired,
  audits: PropTypes.array.isRequired, // eslint-disable-line react/forbid-prop-types
  fetchLoading: PropTypes.bool.isRequired,
  fetchError: PropTypes.bool.isRequired,
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.element),
    PropTypes.element,
  ]).isRequired,
  client: PropTypes.shape({
    acronym: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
  }).isRequired,
  location: PropTypes.shape({
    pathname: PropTypes.string.isRequired,
  }).isRequired,
};

const mapDispatchToProps = dispatch => ({
  fetchAudits: () => dispatch(FETCH_AUDITS()),
  fetchProfileInfo: () => dispatch(FETCH_PROFILE_INFO()),
  reset: () => dispatch(RESET_STATE_STORE()),
});

const mapStateToProps = state => ({
  audits: state.audits.list,
  fetchLoading: state.audits.fetchLoading,
  fetchError: state.audits.fetchError,
  client: state.profile.info,
  scans: state.scans.list,
  pages: state.pages.list,
  machines: state.machines.list,
  vulnerabilities: state.vulnerabilities.list,
  webvulnerabilities: state.webvulnerabilities.list,
});

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Layout));
