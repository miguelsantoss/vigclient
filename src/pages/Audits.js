import React from 'react';

const Audits = ({ match }) => (
  <div>
    <h1>This is audit {match.params.id}</h1>
  </div>
)

export default Audits;