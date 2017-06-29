import { combineReducers } from 'redux';
import { audits } from './audits';

const rootReducer = combineReducers({
  audits,
});

export default rootReducer;
