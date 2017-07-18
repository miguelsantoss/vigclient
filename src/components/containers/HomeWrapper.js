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
  return (<Home visData={visData} />);
};

export default HomeWrapper;
