import React from 'react';
import Scan from '../../pages/Scan';

import machinesJSON from '../../json/machines';
import * as jsonData from '../../jsonData';

const ScanWrapper = ({match}) => {
  let scan = {};
  let machines = [];

  const { audits } = jsonData.props.client;
  for(let i = 0; i < audits.length; i++) {
    if(audits[i].page) {
      
    }
    else if(audits[i].scan) {
      for(let j = 0; j < audits[i].scan.length; j++) {
        if(audits[i].scan[j].id === match.params.id) {
          scan = Object.assign({}, audits[i].scan[j]);
        }
      }
    }
  }

  for(let i = 0; i < machinesJSON.length; i++) {
    if(machinesJSON[i].scan_id === parseInt(match.params.id, 10)) {
      machines.push(machinesJSON[i]);
    }
  }
  // FIXME HANDLE REDIRECT LIKE THE REST
  // NOT DONE YET BECAUSE SCANS 1/2 DONT HAVE MACHINES
  // AND SCAN 10 DOESNT HAVE INFO
  return (<Scan match={match} scan={scan} machines={machines}/>);
}

export default ScanWrapper;