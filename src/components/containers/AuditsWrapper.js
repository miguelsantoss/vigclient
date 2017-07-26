import React from 'react';
import PropTypes from 'prop-types';
import { Redirect } from 'react-router-dom';
import Audits from '../../pages/Audit';
import * as jsonData from '../../jsonData';

// In order to pass props into the Audits Component
const AuditsWrapper = ({ match }) => {
  // Pass the audit's info
  let audit = {};
  const { audits } = jsonData.props.client;
  for (let i = 0; i < audits.length; i += 1) {
    if (audits[i].id === match.params.id) {
      // ES6 Deep Copy object
      audit = Object.assign({}, audits[i]);
    }
  }
  // If Audit doesn't exist, redirect to 404 error page
  if (Object.keys(audit).length === 0) {
    // return (<Audits match={match} {...audit} />);
    return (<Redirect to={{ pathname: '/404', state: { from: match.url } }} />);
  }
  return (<Audits match={match} {...audit} />);
};

AuditsWrapper.propTypes = {
  match: PropTypes.object.isRequired, // eslint-disable-line react/forbid-prop-types
};

export default AuditsWrapper;
