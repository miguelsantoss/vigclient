import React from 'react';
import PropTypes from 'prop-types';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';

import AuditsNetwork from '../../pages/Audits/AuditNetwork';
import AuditsWebPage from '../../pages/Audits/AuditWebPage';
import { FETCH_SCAN_BY_ID } from '../../actions/scans';

// In order to pass props into the Audits Component
const AuditsWrapper = (props) => {
  let audit = {};
  const { match, audits, fetchScanByID } = props;
  for (let i = 0; i < audits.length; i += 1) {
    if (audits[i].serial_number === match.params.id) {
      audit = audits[i];
      break;
    }
  }
  // If Audit doesn't exist, redirect to 404 error page
  if (Object.keys(audit).length === 0) {
    return (<Redirect to={{ pathname: '/404', state: { from: match.url } }} />);
  }
  if (audit.category === 'web') return (<AuditsWebPage match={match} auditInfo={audit} />);
  return (
    <AuditsNetwork
      match={match}
      auditInfo={audit}
      fetchScanByID={fetchScanByID}
    />
  );
};

AuditsWrapper.propTypes = {
  match: PropTypes.object.isRequired, // eslint-disable-line react/forbid-prop-types
  fetchScanByID: PropTypes.func.isRequired,
  audits: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      category: PropTypes.string.isRequired,
      created_at: PropTypes.string.isRequired,
      closed_at: PropTypes.string,
      serial_number: PropTypes.string.isRequired,
    }),
  ).isRequired,
};

const mapDispatchToProps = dispatch => ({
  fetchScanByID: id => dispatch(FETCH_SCAN_BY_ID(id)),
});

const mapStateToProps = state => ({
  audits: state.audits.auditList,
});

export default connect(mapStateToProps, mapDispatchToProps)(AuditsWrapper);
