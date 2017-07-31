import React, { Component } from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { Segment, Table, Icon } from 'semantic-ui-react';

const audits = [
  {
    category: 'external network',
    created_at: '2016-06-28T08:42:17.000Z',
    closed_at: null,
    serial: 'xyz-123',
  },
  {
    category: 'internal network',
    created_at: '2016-06-28T08:42:17.000Z',
    closed_at: null,
    serial: 'xyz-124',
  },
  {
    category: 'web',
    created_at: '2016-06-28T08:42:17.000Z',
    closed_at: null,
    serial: 'xyz-125',
  },
];

class Audits extends Component {
  renderAudits = () =>
    _.map(audits, audit => (
      <Table.Row key={audit.serial}>
        <Table.Cell>{audit.created_at}</Table.Cell>
        <Table.Cell>{audit.closed_at}</Table.Cell>
        <Table.Cell>{audit.category}</Table.Cell>
        <Table.Cell>{audit.serial}</Table.Cell>
      </Table.Row>
    ))

  render = () => (
    <Segment>
      <Table compact='very' singleLine celled striped selectable>
        <Table.Header>
          <Table.Row style={{ background: 'red' }}>
            <Table.HeaderCell>
              Date Iniciated
              <Icon name='triangle down' size='mini' />
            </Table.HeaderCell>
            <Table.HeaderCell>
              Date Closed
              <Icon name='triangle down' size='mini' />
            </Table.HeaderCell>
            <Table.HeaderCell>
              Type
              <Icon name='triangle down' size='mini' />
            </Table.HeaderCell>
            <Table.HeaderCell>
              Serial Number
              <Icon name='triangle down' size='mini' />
            </Table.HeaderCell>
          </Table.Row>
        </Table.Header>
        <Table.Body>
          {this.renderAudits()}
        </Table.Body>
      </Table>
    </Segment>
  );
}

Audits.propTypes = {
};

export default Audits;
