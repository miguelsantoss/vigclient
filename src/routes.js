import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

import SignupPage from './components/Signup/SignupPage';
import LoginPage from './components/Login/LoginPage';
import NewEventPage from './components/events/NewEventPage';
import Layout from './components/Layout';
import PageNotFound from './pages/PageNotFound';

import Audits from './pages/Audits';
import AuditWrapper from './components/containers/AuditsWrapper';
import MachineWrapper from './components/containers/MachinesWrapper';
import ScanWrapper from './components/containers/ScanWrapper';
import VulnerabilityWrapper from './components/containers/VulnerabilityWrapper';
import HomeWrapper from './components/containers/HomeWrapper';
import Profile from './pages/Profile';

import requireAuth from './utils/requireAuth';

import * as jsonData from './jsonData';

const RouterWrapper = () => (
  <BrowserRouter>
    <Switch>
      <Route path='/login'component={LoginPage} />
      <Route path='/signup'component={SignupPage} />
      <Layout client={jsonData.props.client} audits={jsonData.props.client.audits}>
        <Switch>
          <Route exact path='/' component={HomeWrapper} />
          <Route exact path='/profile' component={Profile} />
          <Route path='/new-event'component={requireAuth(NewEventPage)} />
          <Route path='/scan/:id' component={ScanWrapper} />
          <Route path='/audits' component={Audits} />
          <Route path='/audit/:id' component={AuditWrapper} />
          <Route path='/machine/:id' component={MachineWrapper} />
          <Route path='/vulnerability/:id' component={VulnerabilityWrapper} />
          <Route component={PageNotFound} status={404} />
        </Switch>
      </Layout>
    </Switch>
  </BrowserRouter>
);

export default RouterWrapper;
