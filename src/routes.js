import React from 'react';
import { Route, Switch } from 'react-router-dom';
import { ConnectedRouter } from 'react-router-redux';
import history from './history';

// Components to Render Routes
import Layout from './components/Layout';
import Login from './pages/Login';
import PageNotFound from './pages/PageNotFound';

import AuditsWrapper from './components/containers/AuditsWrapper';
import MachinesWrapper from './components/containers/MachinesWrapper';
import ScanWrapper from './components/containers/ScanWrapper';
import VulnerabilityWrapper from './components/containers/VulnerabilityWrapper';
import HomeWrapper from './components/containers/HomeWrapper';

// Hard Coded Data to test
import * as jsonData from './jsonData';

const RouterWrapper = () => (
  <ConnectedRouter history={history}>
    <Switch>
      <Route path='/login' component={Login} />
      <Layout
        history={history.location}
        client={jsonData.props.client}
        audits={jsonData.props.client.audits}
      >
        <Switch>
          <Route exact path='/' component={HomeWrapper} />
          <Route path='/scan/:id' component={ScanWrapper} />
          <Route path='/audit/:id' component={AuditsWrapper} />
          <Route path='/machine/:id' component={MachinesWrapper} />
          <Route path='/vulnerability/:id' component={VulnerabilityWrapper} />
          <Route component={PageNotFound} status={404} />
        </Switch>
      </Layout>
    </Switch>
  </ConnectedRouter>
);

export default RouterWrapper;
