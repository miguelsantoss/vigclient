import React from 'react';
import PropTypes from 'prop-types';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';

import Scan from '../../pages/Scan';

const ScanWrapper = (props) => {
  const { match } = props;
  let scan = {};

  props.scanList.forEach((scanItem) => {
    if (scanItem.id === parseInt(match.params.id, 10)) scan = scanItem;
  });

  if (Object.keys(scan).length === 0) {
    return (<Redirect to={{ pathname: '/404', state: { from: match.url } }} />);
  }

  const { machines } = scan;
  const visData = {};
  return (<Scan match={match} scan={scan} machines={machines} visData={visData} />);
};

ScanWrapper.propTypes = {
  match: PropTypes.object.isRequired, // eslint-disable-line react/forbid-prop-types
  scanList: PropTypes.arrayOf(PropTypes.shape({
    category: PropTypes.string.isRequired,
    id: PropTypes.number.isRequired,
    created_at: PropTypes.string.isRequired,
    updated_at: PropTypes.string.isRequired,
    machines: PropTypes.arrayOf(PropTypes.shape({

    })).isRequired,
  })).isRequired,
};

const mapStateToProps = state => ({
  scanList: state.audits.scanList,
});

export default connect(mapStateToProps)(ScanWrapper);
