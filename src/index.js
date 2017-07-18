import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import jwtDecode from 'jwt-decode';
import { setCurrentUser } from './actions/authActions';

import Routes from './routes';
import rootReducer from './reducers/rootReducer';
import setAuthToken from './utils/setAuthToken';
import 'semantic-ui-css/semantic.min.css';

const store = createStore(
  rootReducer,
  compose(
    applyMiddleware(thunk),
    window.devToolsExtension ? window.devToolsExtension() : f => f
  )
);

if(localStorage.jwtToken) {
  setAuthToken(localStorage.jwtToken);
  store.dispatch(setCurrentUser(jwtDecode(localStorage.jwtToken)));
}

render((
  <Provider store={store}>
    {Routes}
  </Provider>
), document.getElementById('app'));