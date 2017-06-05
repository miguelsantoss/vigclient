import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Layout from './components/Layout';
import Audits from './pages/Audits';
import Machines from './pages/Machines';
import Home from './pages/Home';
import Login from './pages/Login';
import PageNotFound from './pages/PageNotFound';

const Router = () => (
  <BrowserRouter>
      <Layout>
        <Switch>
          <Route exact path='/' component={Home} />
          <Route path='/login' component={Login} />
          <Route path='/audits/:id' component={Audits} />
          <Route path='/machines/:id' component={Machines} />
          <Route exact path='/*' component={PageNotFound} />
        </Switch>
      </Layout>
  </BrowserRouter>
);

export default Router;
