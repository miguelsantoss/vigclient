import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import Home from '../../pages/Home';

const HomeWrapper = props => (<Home vizData={props.vizData} />);

HomeWrapper.propTypes = {
  vizData: PropTypes.shape({
    pieAllVulns: PropTypes.arrayOf(PropTypes.shape({
      risk_factor: PropTypes.number.isRequired,
      totalVulns: PropTypes.number.isRequired,
    })).isRequired,
    pieLatestVulns: PropTypes.arrayOf(PropTypes.shape({
      risk_factor: PropTypes.number.isRequired,
      totalVulns: PropTypes.number.isRequired,
    })).isRequired,
  }).isRequired,
};

const mapDispatchToProps = dispatch => ({
});

const mapStateToProps = state => ({
  vizData: {
    pieAllVulns: state.viz.pieCharts.all,
    pieLatestVulns: state.viz.pieCharts.latest,
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(HomeWrapper);
