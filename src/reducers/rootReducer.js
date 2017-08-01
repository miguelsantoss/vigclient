import { combineReducers } from 'redux';

import messages from './messages';
import auth from './auth';
import clientInfo from './clientInfo';

export default combineReducers({
  messages,
  auth,
  clientInfo,
});
