import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

import LoginPage from './components/Login/LoginPage';
import Layout from './components/Layout';
import PageNotFound from './pages/PageNotFound';

import Audits from './pages/Audits/Audits';
import AuditWrapper from './components/containers/AuditsWrapper';
import Scan from './pages/Scan';
import ScanVulnerabilities from './pages/Scan/scanVulnerabilities';
import Vulnerability from './pages/Vulnerability';
import HomeWrapper from './components/containers/HomeWrapper';
import Profile from './pages/Profile';

import requireAuth from './utils/requireAuth';

const RouterWrapper = () => (
  <BrowserRouter>
    <Switch>
      <Route path='/login'component={LoginPage} />
      <Layout>
        <Switch>
          <Route exact path='/' component={requireAuth(HomeWrapper)} />
          <Route path='/profile' component={requireAuth(Profile)} />
          <Route path='/audits' component={requireAuth(Audits)} />
          <Route path='/audit/:id' component={requireAuth(AuditWrapper)} />
          <Route path='/scan/:id/vulnerabilities' component={requireAuth(ScanVulnerabilities)} />
          <Route path='/scan/:id' component={requireAuth(Scan)} />
          <Route path='/vulnerability/:id' component={requireAuth(Vulnerability)} />
          <Route component={PageNotFound} status={404} />
        </Switch>
      </Layout>
    </Switch>
  </BrowserRouter>
);

          // <Route path='/machine/:id' component={requireAuth(MachineWrapper)} />
export default RouterWrapper;
