import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';
import { audits } from './audits';

const rootReducer = combineReducers({
  audits,
  router: routerReducer,
});

export default rootReducer;
