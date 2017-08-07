import { createStore, applyMiddleware, compose } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import { persistStore, autoRehydrate } from 'redux-persist';
import thunk from 'redux-thunk';
import logger from 'redux-logger';
import jwtDecode from 'jwt-decode';

import { setCurrentUser } from './actions/authActions';
import rootReducer from './reducers';
import setAuthToken from './utils/setAuthToken';

const configureStore = () => {
  const thunkApplied = applyMiddleware(thunk);
  const loggerRedux = applyMiddleware(logger);
  let middlewares = null;

  if (process.env.NODE_ENV === 'production') {
    middlewares = compose(thunkApplied);
  } else {
    middlewares = composeWithDevTools(thunkApplied, loggerRedux);
  }

  return createStore(rootReducer, middlewares, autoRehydrate());
};

const store = configureStore();
persistStore(store, { blacklist: ['routing'] });

/* eslint-disable no-undef */
if (localStorage.jwtToken) {
  setAuthToken(localStorage.jwtToken);
  store.dispatch(setCurrentUser(jwtDecode(localStorage.jwtToken)));
}
/* eslint-enable no-undef */

export default store;
