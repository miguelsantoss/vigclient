import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

import SignupPage from './components/Signup/SignupPage';
import LoginPage from './components/Login/LoginPage';
import NewEventPage from './components/events/NewEventPage';
import Layout from './components/Layout';
import PageNotFound from './pages/PageNotFound';

import Audits from './pages/Audits/Audits';
import AuditWrapper from './components/containers/AuditsWrapper';
import MachineWrapper from './components/containers/MachinesWrapper';
import ScanWrapper from './components/containers/ScanWrapper';
import VulnerabilityWrapper from './components/containers/VulnerabilityWrapper';
import HomeWrapper from './components/containers/HomeWrapper';
import Profile from './pages/Profile';

import requireAuth from './utils/requireAuth';

const RouterWrapper = () => (
  <BrowserRouter>
    <Switch>
      <Route path='/login'component={LoginPage} />
      <Route path='/signup'component={SignupPage} />
      <Layout>
        <Switch>
          <Route exact path='/' component={HomeWrapper} />
          <Route exact path='/profile' component={Profile} />
          <Route path='/new-event'component={requireAuth(NewEventPage)} />
          <Route path='/audits' component={Audits} />
          <Route path='/audit/:id' component={AuditWrapper} />
          <Route path='/scan/:id/vulnerabilities' component={ScanWrapper} />
          <Route path='/scan/:id' component={ScanWrapper} />
          <Route path='/machine/:id' component={MachineWrapper} />
          <Route path='/vulnerability/:id' component={VulnerabilityWrapper} />
          <Route component={PageNotFound} status={404} />
        </Switch>
      </Layout>
    </Switch>
  </BrowserRouter>
);

export default RouterWrapper;
