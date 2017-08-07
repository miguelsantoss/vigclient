import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware, compose } from 'redux';
import { persistStore, autoRehydrate } from 'redux-persist';
import thunk from 'redux-thunk';
import jwtDecode from 'jwt-decode';
import 'semantic-ui-css/semantic.min.css';

import './index.css';
import { setCurrentUser } from './actions/authActions';
import Routes from './routes';
import rootReducer from './reducers';
import setAuthToken from './utils/setAuthToken';

const store = createStore(
  rootReducer,
  compose(
    applyMiddleware(thunk),
    window.devToolsExtension ? window.devToolsExtension() : f => f,
  ),
  autoRehydrate(),
);

if (localStorage.jwtToken) {
  setAuthToken(localStorage.jwtToken);
  store.dispatch(setCurrentUser(jwtDecode(localStorage.jwtToken)));
}

persistStore(store, { blacklist: ['routing'] });

render((
  <Provider store={store}>
    <Routes />
  </Provider>
), document.getElementById('app'));
