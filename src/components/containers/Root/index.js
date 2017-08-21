import React from 'react';
import PropTypes from 'prop-types';
import { Provider } from 'react-redux';

import Routes from '../../../routes';
import './styles.css';

const Root = ({ store }) => (
  <Provider store={store} >
    <Routes />
  </Provider>
);

Root.propTypes = {
  store: PropTypes.object.isRequired, // eslint-disable-line react/forbid-prop-types
};

export default Root;
