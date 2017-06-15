import React from 'react';
import Home from '../../pages/Home';

import vulnsJSON from '../../json/vulnerabilities';


const HomeWrapper = ({match}) => {
  let visData = {};
  let vulns = [];
  for(let i = 0; i < vulnsJSON.length; i++) {
    const { risk_factor } = vulnsJSON[i];
    vulns[risk_factor-1] = vulns[risk_factor-1] ? ++vulns[risk_factor-1] : 1;
  }
  visData.allVulns = vulns;
  visData.latestVulns = vulns;
  return (<Home visData={visData}/>);
}

export default HomeWrapper;