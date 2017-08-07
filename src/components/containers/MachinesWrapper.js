import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import Machines from '../../pages/Machines';

import machinesJSON from '../../json/machines.json';
import portsJSON from '../../json/ports.json';
import vulnsJSON from '../../json/vulnerabilities.json';

const MachinesWrapper = (props) => {
  const { match } = props;
  console.log(props);
  let machine = {};
  const ports = [];
  const vulnerabilities = [];

  const id = parseInt(match.params.id, 10);
  for (let i = 0; i < machinesJSON.length; i += 1) {
    if (machinesJSON[i].id === id) {
      machine = Object.assign({}, machinesJSON[i]);
    }
  }

  for (let i = 0; i < portsJSON.length; i += 1) {
    if (portsJSON[i].machine_id === id) {
      ports.push(portsJSON[i]);
    }
    if (vulnsJSON[i].machine_id === id) {
      vulnerabilities.push(vulnsJSON[i]);
    }
  }

  if (Object.keys(machine).length === 0) {
    // return (<Machines match={match} machine={machine} />);
    return (<Redirect to={{ pathname: '/not-found', state: { from: match.url } }} />);
  }
  return (
    <Machines match={match} machine={machine} ports={ports} vulnerabilities={vulnerabilities} />
  );
};

MachinesWrapper.propTypes = {
  match: PropTypes.object.isRequired, // eslint-disable-line react/forbid-prop-types
};

const mapStateToProps = state => ({
  state,
});

export default connect(mapStateToProps)(MachinesWrapper);
