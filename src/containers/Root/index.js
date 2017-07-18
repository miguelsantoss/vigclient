import React from 'react';
import PropTypes from 'prop-types';
import { Provider } from 'react-redux';
import Router from '../../routes';

const Root = ({ store }) => (
  <Provider store={store}>
    <Router />
  </Provider>
);

Root.propTypes = {
  store: PropTypes.object.isRequired, // eslint-disable-line react/forbid-prop-types
};

export default Root;
