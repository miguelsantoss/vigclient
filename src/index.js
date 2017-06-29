import React from 'react';
import ReactDOM from 'react-dom';
import thunk from 'redux-thunk';
import logger from 'redux-logger';
import { createStore, applyMiddleware, compose } from 'redux';

import 'semantic-ui-css/semantic.min.css';

import Root from './containers/Root';
import rootReducer from './reducers';

const configureStore = (initialState) => {
  const thunkApplied = applyMiddleware(thunk);
  const loggerRedux = applyMiddleware(logger);
  let middlewares = null;

  if (process.env.NODE_ENV === 'production') {
    middlewares = compose(thunkApplied);
  } else {
    // composeWithDevTools if needed
    middlewares = compose(thunkApplied, loggerRedux);
  }

  return createStore(rootReducer, initialState, middlewares);
};

// eslint-disable-next-line no-underscore-dangle, no-undef
const preloadedState = window.__PRELOADED_STATE__ || {};
// eslint-disable-next-line no-underscore-dangle, no-undef
delete window.__PRELOADED_STATE__;
const store = configureStore(preloadedState);

// if (process.env.NODE_ENV !== 'production') {
//   // eslint-disable-next-line no-unused-vars
//   let createClass = React.createClass;
//   Object.defineProperty(React, 'createClass', {
//     set: (nextCreateClass) => {
//       createClass = nextCreateClass;
//     },
//   });
//    // eslint-disable-next-line global-require
//   const { whyDidYouUpdate } = require('why-did-you-update');
//   whyDidYouUpdate(React);
// }


// eslint-disable-next-line no-undef
const mountNode = document.getElementById('root');
// eslint-disable-next-line react/no-render-return-value
const render = RootElement => ReactDOM.render(<RootElement store={store} />, mountNode);

render(Root);
