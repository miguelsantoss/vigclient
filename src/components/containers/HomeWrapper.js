import React from 'react';
import Home from '../../pages/Home';

import vulnsJSON from '../../json/vulnerabilities.json';


const HomeWrapper = () => {
  const visData = {};
  const vulns = [];
  for (let i = 0; i < vulnsJSON.length; i += 1) {
    const riskFactor = vulnsJSON[i].risk_factor;
    // eslint-disable-next-line no-plusplus
    vulns[riskFactor - 1] = vulns[riskFactor - 1] ? ++vulns[riskFactor - 1] : 1;
  }
  visData.allVulns = vulns;
  visData.latestVulns = vulns;
  return (<Home visData={visData} />);
};

export default HomeWrapper;
