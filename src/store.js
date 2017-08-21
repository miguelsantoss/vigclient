import { createStore, applyMiddleware, compose } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunk from 'redux-thunk';
import logger from 'redux-logger';
import jwtDecode from 'jwt-decode';

import { setCurrentUser } from './actions/authActions';
import rootReducer from './reducers';
import setAuthToken from './utils/setAuthToken';

const configureStore = (initialState) => {
  const thunkApplied = applyMiddleware(thunk);
  const loggerRedux = applyMiddleware(logger);
  let middlewares = null;

  if (process.env.NODE_ENV === 'production') {
    middlewares = compose(thunkApplied);
  } else {
    middlewares = composeWithDevTools(thunkApplied);
  }

  return createStore(rootReducer, initialState, middlewares);
};

const loadState = () => {
  try {
    const serializableState = localStorage.getItem('vigilanteState'); // eslint-disable-line no-undef
    if (serializableState === null) {
      return undefined;
    }
    return JSON.parse(serializableState);
  } catch (err) {
    return undefined;
  }
};

const saveState = (state) => {
  try {
    const serializableState = JSON.stringify(state);
    localStorage.setItem('vigilanteState', serializableState); // eslint-disable-line no-undef
  } catch (err) {
    // err
  }
};

const preloadedState = loadState() || {};
const store = configureStore(preloadedState);

store.subscribe(() => {
  saveState(store.getState());
});

/* eslint-disable no-undef */
if (localStorage.jwtToken) {
  setAuthToken(localStorage.jwtToken);
  store.dispatch(setCurrentUser(jwtDecode(localStorage.jwtToken)));
}
/* eslint-enable no-undef */

export default store;
