import React, { Component } from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';
import { Segment, Grid, Image } from 'semantic-ui-react';

import './profile.css';

const contacts = [
  {
    name: 'contact1',
    jobTitle: 'contact1_jobTitle',
    mobilePhone: 'contact1_phone',
    telephone: 'contact1_telephone',
    function: '',
    departament: '',
    email: 'contact1_email',
  },
  {
    name: 'contact2',
    jobTitle: 'contact2_jobTitle',
    mobilePhone: 'contact2_phone',
    telephone: 'contact2_telephone',
    function: '',
    departament: '',
    email: 'contact2_email',
  },
];

class Profile extends Component {
  renderContacts = () =>
    _.map(contacts, c => (
      <Segment key={c.name} style={{ background: '#ecf0f5' }}>
        <table className='contact'>
          <tbody>
            <tr>
              <td>
                Name: <strong>{c.name}</strong>
              </td>
              <td>
                Mobile Phone: <strong>{c.mobilePhone}</strong>
              </td>
            </tr>
            <tr>
              <td>
                Job Title: <strong>{c.jobTitle}</strong>
              </td>
              <td>
                Telephone: <strong>{c.telephone}</strong>
              </td>
            </tr>
            <tr>
              <td>
                Function: <strong>{c.function}</strong>
              </td>
              <td>
                Email: <strong>{c.email}</strong>
              </td>
            </tr>
            <tr>
              <td>
                Departament: <strong>{c.departament}</strong>
              </td>
            </tr>
          </tbody>
        </table>
      </Segment>
    ))

  render() {
    return (
      <Segment raised>
        <Segment style={{ background: '#ecf0f5' }}>
          <Grid>
            <Grid.Row>
              <Grid.Column width={2}>
                <Image src='/placeholder.png' />
              </Grid.Column>
              <Grid.Column>
                <table className='profileInfo'>
                  <tbody>
                    <tr>
                      <td>Name: </td>
                      <td>comp_name</td>
                    </tr>
                    <tr>
                      <td>Website: </td>
                      <td>comp_website</td>
                    </tr>
                    <tr>
                      <td>Telephone: </td>
                      <td>comp_phone</td>
                    </tr>
                  </tbody>
                </table>
              </Grid.Column>
            </Grid.Row>
          </Grid>
        </Segment>
        <Segment style={{ background: '#ecf0f5' }}>
          <table className='profileInfo'>
            <tbody>
              <tr>
                <td>Address: </td>
                <td>comp_address</td>
                <td>District: </td>
                <td>comp_district</td>
              </tr>
              <tr>
                <td>Location: </td>
                <td>comp_location</td>
                <td>Country: </td>
                <td>comp_coutry</td>
              </tr>
            </tbody>
          </table>
        </Segment>
        <span>Contacts:</span>
        {this.renderContacts()}
      </Segment>
    );
  }
}

Profile.propTypes = {
};

export default Profile;

