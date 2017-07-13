import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { Grid, Container, Segment } from 'semantic-ui-react';

import Piechart from '../components/Piechart';
import Linechart from '../components/Linechart';

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }
  render() {
    return (
      <div>
        <Grid>
          <Link to='/scan/10'>SCAN 10 LINK - only one with machines</Link>
          <Grid.Row columns={2}>
            <Grid.Column>
              <Segment>
                <Container textAlign='center'>
                  <h1>All vulnerabilities:</h1>
                  <Piechart data={this.props.visData.allVulns} id='piechart-all-vulnerabilities' />
                </Container>
              </Segment>
            </Grid.Column>
            <Grid.Column>
              <Segment>
                <Container textAlign='center'>
                  <h1>Latest vulnerabilities:</h1>
                </Container>
              </Segment>
            </Grid.Column>
          </Grid.Row>
          <Grid.Row columns={2}>
            <Grid.Column>
              <Segment>
                <Container textAlign='center'>
                  <h1>All vulnerabilities:</h1>
                  <Linechart data={this.props.visData.allVulns} id='linechart-all-vulnerabilities' />
                </Container>
              </Segment>
            </Grid.Column>
            <Grid.Column>
              <Segment>
                <Container textAlign='center'>
                  <h1>Latest vulnerabilities:</h1>
                  <Linechart data={this.props.visData.latestVulns} id='linechart-recent-vulnerabilities' />
                </Container>
              </Segment>
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </div>
    );
  }
}

Home.propTypes = {
  visData: PropTypes.object.isRequired, // eslint-disable-line react/forbid-prop-types
};

export default Home;

