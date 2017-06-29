import React from 'react';
import PropTypes from 'prop-types';
import { Provider } from 'react-redux';
import Router from '../../routes';

const Root = ({ store }) => (
  <Provider store={store}>
    {Router}
  </Provider>
);

Root.propTypes = {
  store: PropTypes.object.isRequired
};

export default Root;
