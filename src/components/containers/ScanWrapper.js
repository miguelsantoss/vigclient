import React from 'react';
import PropTypes from 'prop-types';
import Scan from '../../pages/Scan';

import machinesJSON from '../../json/machines.json';
import vulnsJSON from '../../json/vulnerabilities.json';
import * as jsonData from '../../jsonData';

const ScanWrapper = ({ match }) => {
  let scan = {};
  const machines = [];

  const { audits } = jsonData.props.client;
  for (let i = 0; i < audits.length; i += 1) {
    // if (audits[i].page) {
    // }
    if (audits[i].scan) {
      for (let j = 0; j < audits[i].scan.length; j += 1) {
        if (audits[i].scan[j].id === match.params.id) {
          scan = Object.assign({}, audits[i].scan[j]);
        }
      }
    }
  }

  for (let i = 0; i < machinesJSON.length; i += 1) {
    if (machinesJSON[i].scan_id === parseInt(match.params.id, 10)) {
      machines.push(machinesJSON[i]);
    }
  }

  const visData = {};
  const vulns = [];
  for (let i = 0; i < vulnsJSON.length; i += 1) {
    const riskFactor = vulnsJSON[i].risk_factor;
    // eslint-disable-next-line no-plusplus
    vulns[riskFactor - 1] = vulns[riskFactor - 1] ? ++vulns[riskFactor - 1] : 1;
  }
  const vulnerabilityData = [];
  for (let i = 0; i < vulns.length; i += 1) {
    const vulnTypeData = {
      riskFactor: i + 1,
      numberVulnerabilities: vulns[i],
    };
    vulnerabilityData.push(vulnTypeData);
  }
  visData.allVulns = vulnerabilityData;
  visData.latestVulns = vulnerabilityData;

  // FIXME HANDLE REDIRECT LIKE THE REST
  // NOT DONE YET BECAUSE SCANS 1/2 DONT HAVE MACHINES
  // AND SCAN 10 DOESNT HAVE INFO
  return (<Scan match={match} scan={scan} machines={machines} visData={visData} />);
};


ScanWrapper.propTypes = {
  match: PropTypes.object.isRequired, // eslint-disable-line react/forbid-prop-types
};

export default ScanWrapper;
