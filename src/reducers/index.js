import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';

import audits from './audits';
import scans from './scans';
import vulnerabilities from './vulnerabilities';
import profile from './profile';
import viz from './viz';

import messages from './messages';
import auth from './auth';

const rootReducer = combineReducers({
  audits,
  scans,
  vulnerabilities,
  profile,
  viz,
  router: routerReducer,
  messages,
  auth,
});

export default rootReducer;
