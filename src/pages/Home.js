import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Grid, Container, Segment } from 'semantic-ui-react';

import Piechart from '../components/Piechart.js';

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
    }
  }
  render() {
    return (
      <div>
        <Link to='/scan/10'>SCAN 10 LINK - only one with machines</Link>
        <Grid>
          <Grid.Row columns={2}>
            <Grid.Column>
              <Segment>
                <Container textAlign='center'>
                  <h1>All vulnerabilities:</h1>
                  <Piechart data={this.props.visData.allVulns}/>
                </Container>
              </Segment>
            </Grid.Column>
            <Grid.Column>
              <Segment>
                <Container textAlign='center'>
                  <h1>Latest vulnerabilities:</h1>
                  <Piechart data={this.props.visData.latestVulns}/>
                </Container>
              </Segment>
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </div>
    );
  }
}

export default Home;

