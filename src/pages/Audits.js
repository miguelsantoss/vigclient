import React from 'react';
import { Icon, Table } from 'semantic-ui-react';

const Audits = ({ match, props }) => {
  return (
    <Table celled>
      <Table.Header>
        <Table.Row>
          <Table.HeaderCell>Name</Table.HeaderCell>
          <Table.HeaderCell>Status</Table.HeaderCell>
          <Table.HeaderCell>Notes</Table.HeaderCell>
        </Table.Row>
      </Table.Header>
      <Table.Body>
        <Table.Row positive>
          <Table.Cell>Delta {match.params.id}</Table.Cell>
          <Table.Cell>
            <Icon name='checkmark' />
            Completed
            </Table.Cell>
          <Table.Cell>No Threats</Table.Cell>
        </Table.Row>
        <Table.Row negative>
          <Table.Cell>EDP</Table.Cell>
          <Table.Cell>
          <Icon name='warning sign' />
            Check Vulnerability
          </Table.Cell>
          <Table.Cell negative>
          <Icon name='warning sign' />
            SQL INJECTION
          </Table.Cell>
        </Table.Row>
        <Table.Row warning>
          <Table.Cell>BPI</Table.Cell>
          <Table.Cell>
            <Icon name='attention' />
            Check Warning
            </Table.Cell>
          <Table.Cell>
            <Icon name='attention' />
            Port 443 OPEN
          </Table.Cell>
        </Table.Row>
      </Table.Body>
    </Table>
);
}

export default Audits;
