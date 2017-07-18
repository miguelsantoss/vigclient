import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

import SignupPage from './components/Signup/SignupPage';
import LoginPage from './components/Login/LoginPage';
import NewEventPage from './components/events/NewEventPage';
import Layout from './components/Layout';
import PageNotFound from './pages/PageNotFound';

import AuditsWrapper from './components/containers/AuditsWrapper';
import MachinesWrapper from './components/containers/MachinesWrapper';
import ScanWrapper from './components/containers/ScanWrapper';
import VulnerabilityWrapper from './components/containers/VulnerabilityWrapper';
import HomeWrapper from './components/containers/HomeWrapper';

import requireAuth from './utils/requireAuth';

import * as jsonData from './jsonData';

export default (
  <BrowserRouter>
    <Switch>
      <Route path='/login'component={LoginPage} />
      <Route path='/signup'component={SignupPage} />
      <Layout client={jsonData.props.client} audits={jsonData.props.client.audits}>
        <Switch>
          <Route exact path='/' component={HomeWrapper} />
          <Route path='/new-event'component={requireAuth(NewEventPage)} />
          <Route path='/scan/:id' component={ScanWrapper} />
          <Route path='/audit/:id' component={AuditsWrapper} />
          <Route path='/machine/:id' component={MachinesWrapper} />
          <Route path='/vulnerability/:id' component={VulnerabilityWrapper} />
          <Route component={PageNotFound} status={404} />
        </Switch>
      </Layout>
    </Switch>
  </BrowserRouter>
);