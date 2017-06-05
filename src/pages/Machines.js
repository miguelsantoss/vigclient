import React from 'react';

const Machines = ({ match }) => (
  <div>
    <h1>This is Machine {match.params.id}</h1>
  </div>
)

export default Machines;
