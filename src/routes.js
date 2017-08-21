import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

import LoginPage from './components/Login/LoginPage';
import Layout from './components/Layout';
import PageNotFound from './pages/PageNotFound';

import Audits from './pages/Audits/Audits';
import Audit from './pages/Audits/Audit';
import Page from './pages/Page';
import Scan from './pages/Scan';
import ScanVulnerabilities from './pages/Scan/scanVulnerabilities';
import Vulnerability from './pages/Vulnerability';
import WebVulnerability from './pages/Vulnerability/webvulnerability';
import Home from './pages/Home';
import Profile from './pages/Profile';

import requireAuth from './utils/requireAuth';

const Routes = () => (
  <BrowserRouter>
    <Switch>
      <Route path='/login' component={LoginPage} />
      <Layout>
        <Switch>
          <Route exact path='/' component={requireAuth(Home)} />
          <Route path='/profile' component={requireAuth(Profile)} />
          <Route path='/audits' component={requireAuth(Audits)} />
          <Route path='/audit/:id' component={requireAuth(Audit)} />
          <Route path='/scan/:id/vulnerabilities' component={requireAuth(ScanVulnerabilities)} />
          <Route path='/scan/:id' component={requireAuth(Scan)} />
          <Route path='/page/:id' component={requireAuth(Page)} />
          <Route path='/vulnerability/:id' component={requireAuth(Vulnerability)} />
          <Route path='/webvulnerability/:id' component={requireAuth(WebVulnerability)} />
          <Route component={PageNotFound} status={404} />
        </Switch>
      </Layout>
    </Switch>
  </BrowserRouter>
);

// <Route path='/machine/:id' component={requireAuth(MachineWrapper)} />
export default Routes;
