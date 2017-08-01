import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Grid, Container, Segment, Header } from 'semantic-ui-react';

import Piechart from '../components/Piechart/index';
import Linechart from '../components/Linechart';

import { FETCH_AUDITS } from '../actions/audits';
import { FETCH_PROFILE_INFO } from '../actions/profile';

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  componentWillMount() {
    this.props.fetchAudits();
    this.props.fetchProfileInfo();
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
  fetchAudits: PropTypes.func.isRequired,
  fetchProfileInfo: PropTypes.func.isRequired,
};

const mapDispatchToProps = dispatch => ({
  fetchAudits: () => dispatch(FETCH_AUDITS()),
  fetchProfileInfo: () => dispatch(FETCH_PROFILE_INFO()),
});

const mapStateToProps = state => ({
  audits: state.audits.list,
  profile: state.profile,
});

export default connect(mapStateToProps, mapDispatchToProps)(Home);
