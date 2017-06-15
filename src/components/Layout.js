import React, { Component } from 'react';
import Sidebar from './Sidebar';
import Appbar from './Appbar';
import { Grid, Breadcrumb } from 'semantic-ui-react';
import { Link } from 'react-router-dom';
import history from '../history';

const style = {};
const sidebarWidth = 200;

style.main = {
    marginLeft: sidebarWidth,
}

style.appbar = {
    borderRadius: 0,
}

style.grid = {
    //marginleft: siddebarWidth + 'px',
    marginLeft: 0,
    paddingRight: '15px',
    paddingLeft: '0px'
};

style.menu = {
  position: 'fixed',
  top: 0,
  bottom: 0,
  left: 0,
  width: sidebarWidth,
  paddingBottom: '1em',
  // match menu background
  // prevents a white background when items are filtered out by search
  background: '#1B1C1D',
  //overflowY: 'scroll',
}

class Layout extends Component {
    state = {
        history: {
            audit: '',
            scan: '',
            machine: '',
            vuln: '',
        },
    }

    componentWillReceiveProps() {
        // This is a hack -- pass history prop just to force update
        // this is not good
        const route = history.location.pathname.split('/');
        if(route[1] !== undefined) {
            if(route[1] === 'audit') {
                this.setState({
                    history: {
                        audit: route[2],
                        scan: '',
                        machine: '',
                        vuln: '',
                    }
                });
            }
            else if(route[1] === 'scan') {
                this.setState({
                    history: {
                        ...this.state.history,
                        scan: route[2],
                        machine: '',
                        vuln: '',
                    }
                })
            }
            else if(route[1] === 'machine') {
                this.setState({
                    history: {
                        ...this.state.history,
                        machine: route[2],
                        vuln: '',
                    }
                })
            }
            else if(route[1] === 'vulnerability') {
                this.setState({
                    history: {
                        ...this.state.history,
                        vuln: route[2],
                    }
                })
            }
            else if(route[1] === '') {
                this.setState({
                    history: {
                        audit: '',
                        scan: '',
                        machine: '',
                        vuln: '',
                    }
                })
            }
        }
    }

    renderBreadcrumbHistory = () => {
        // Improve this with new routes
        const { history } = this.state;
        return (
            <Breadcrumb>
                <Breadcrumb.Section><Link to='/'>Home</Link></Breadcrumb.Section>
                { history.audit && <Breadcrumb.Divider icon='right angle' /> }
                { history.audit && <Breadcrumb.Section><Link to={'/audit/'+history.audit}>Audit {history.audit}</Link></Breadcrumb.Section> }
                { history.scan && <Breadcrumb.Divider icon='right angle' /> }
                { history.scan && <Breadcrumb.Section><Link to={'/scan/'+history.scan}>Scan {history.scan}</Link></Breadcrumb.Section> }
                { history.machine && <Breadcrumb.Divider icon='right angle' /> }
                { history.machine && <Breadcrumb.Section><Link to={'/machine/'+history.machine}>Machine {history.machine}</Link></Breadcrumb.Section> }
                { history.vuln && <Breadcrumb.Divider icon='right angle' /> }
                { history.vuln && <Breadcrumb.Section><Link to={'/vulnerability/'+history.vuln}>Vulnerability {history.vuln}</Link></Breadcrumb.Section> }
            </Breadcrumb>
        );
    }
    render () {
        return (
        <div>
            <Sidebar audits={this.props.audits} style={style.menu}/>
            <div style={style.main}>
                <Appbar style={style.appbar} client={this.props.client} />
                <Grid style={style.grid}>
                    <Grid.Row>
                        <Grid.Column>
                            {this.renderBreadcrumbHistory()}
                        </Grid.Column>
                    </Grid.Row>
                    <Grid.Row>
                        <Grid.Column>
                            {this.props.children}
                        </Grid.Column>
                    </Grid.Row>
                </Grid>
            </div>
        </div>
        );
    }
}

export default Layout;
