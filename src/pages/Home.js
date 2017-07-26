import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Grid, Container, Segment, Header } from 'semantic-ui-react';

import Piechart from '../components/Piechart/index';
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
          <Grid.Row columns={2}>
            <Grid.Column>
              <Segment>
                <Header>All vulnerabilities</Header>
                <Container textAlign='center'>
                  <Piechart data={this.props.visData.allVulns} id='piechart-all-vulnerabilities' />
                </Container>
              </Segment>
            </Grid.Column>
            <Grid.Column>
              <Segment>
                <Header>Latest vulnerabilities</Header>
                <Container textAlign='center'>
                  <Piechart data={this.props.visData.allVulns} id='piechart-all-vulnerabilities' />
                </Container>
              </Segment>
            </Grid.Column>
          </Grid.Row>
          <Grid.Row columns={2}>
            <Grid.Column>
              <Segment>
                <Header>All vulnerabilities</Header>
                <Container textAlign='center'>
                  <Linechart data={this.props.visData.allVulns} id='linechart-all-vulnerabilities' />
                </Container>
              </Segment>
            </Grid.Column>
            <Grid.Column>
              <Segment>
                <Header>Latest vulnerabilities</Header>
                <Container textAlign='center'>
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

