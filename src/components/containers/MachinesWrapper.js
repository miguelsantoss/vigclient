import React from 'react';
import { Redirect } from 'react-router-dom';
import Machines from '../../pages/Machines';

import machinesJSON from '../../json/machines';
import portsJSON from '../../json/ports';
import vulnsJSON from '../../json/vulnerabilities';

const MachinesWrapper = ({match}) => {
  let machine = {};
  let ports = [];
  let vulnerabilities = [];

  const id = parseInt(match.params.id, 10);
  for(let i = 0; i < machinesJSON.length; i++) {
    if(machinesJSON[i].id === id) {
      machine = Object.assign({}, machinesJSON[i]);
    }
  }

  for(let i = 0; i < portsJSON.length; i++) {
    if(portsJSON[i].machine_id === id) {
      ports.push(portsJSON[i]);
    }
    if(vulnsJSON[i].machine_id === id) {
      vulnerabilities.push(vulnsJSON[i]);
    }
  }

  if(Object.keys(machine).length === 0) {
    // return (<Machines match={match} machine={machine} />);
    return (<Redirect to={{ pathname: '/not-found', state: { from: match.url } }}/>);
  }
  return (<Machines match={match} machine={machine} ports={ports} vulnerabilities={vulnerabilities}/>);
}

export default MachinesWrapper;