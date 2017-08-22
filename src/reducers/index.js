import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';

import audits from './audits';
import scans from './scans';
import pages from './pages';
import machines from './machines';
import vulnerabilities from './vulnerabilities';
import webvulnerabilities from './webvulnerabilities';
import profile from './profile';
import viz from './viz';

import messages from './messages';
import auth from './auth';

const rootReducer = combineReducers({
  audits,
  scans,
  pages,
  machines,
  vulnerabilities,
  webvulnerabilities,
  profile,
  viz,
  router: routerReducer,
  messages,
  auth,
});

export default rootReducer;
