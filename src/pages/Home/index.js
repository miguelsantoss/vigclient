import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Grid, Container, Segment, Header } from 'semantic-ui-react';

import Piechart from '../../components/Piechart/index';
import Linechart from '../../components/Linechart';

import { FETCH_AUDITS } from '../../actions/audits';
import { FETCH_PROFILE_INFO } from '../../actions/profile';
import { FETCH_VIZ_DATA } from '../../actions/viz';

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  componentWillMount() {
    this.props.fetchAudits();
    this.props.fetchProfileInfo();
    this.props.fetchVizData();
  }

  render() {
    const pieDataAvailable = this.props.vizData.pieAllVulns.length !== 0
      && this.props.vizData.pieLatestVulns.length !== 0;
    return (
      <div>
        <Grid>
          <Grid.Row columns={2}>
            <Grid.Column>
              <Segment>
                <Header>All vulnerabilities</Header>
                <Container textAlign='center'>
                  { pieDataAvailable && <Piechart data={this.props.vizData.pieAllVulns} id='piechart-all-vulnerabilities' /> }
                </Container>
              </Segment>
            </Grid.Column>
            <Grid.Column>
              <Segment>
                <Header>Latest vulnerabilities</Header>
                <Container textAlign='center'>
                  { pieDataAvailable && <Piechart data={this.props.vizData.pieLatestVulns} id='piechart-all-vulnerabilities' /> }
                </Container>
              </Segment>
            </Grid.Column>
          </Grid.Row>
          <Grid.Row columns={2}>
            <Grid.Column>
              <Segment>
                <Header>All vulnerabilities</Header>
                <Container textAlign='center'>
                  <Linechart data={this.props.vizData.allVulns} id='linechart-all-vulnerabilities' />
                </Container>
              </Segment>
            </Grid.Column>
            <Grid.Column>
              <Segment>
                <Header>Latest vulnerabilities</Header>
                <Container textAlign='center'>
                  <Linechart data={this.props.vizData.latestVulns} id='linechart-recent-vulnerabilities' />
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
  vizData: PropTypes.object.isRequired, // eslint-disable-line react/forbid-prop-types
  fetchAudits: PropTypes.func.isRequired,
  fetchProfileInfo: PropTypes.func.isRequired,
  fetchVizData: PropTypes.func.isRequired,
};

const mapDispatchToProps = dispatch => ({
  fetchAudits: () => dispatch(FETCH_AUDITS()),
  fetchProfileInfo: () => dispatch(FETCH_PROFILE_INFO()),
  fetchVizData: () => dispatch(FETCH_VIZ_DATA()),
});

const mapStateToProps = state => ({
  audits: state.audits.list,
  profile: state.profile,
});

export default connect(mapStateToProps, mapDispatchToProps)(Home);