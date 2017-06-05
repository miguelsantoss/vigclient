import React, { Component } from 'react';
import Sidebar from './Sidebar';
import Appbar from './Appbar';
import { Grid } from 'semantic-ui-react';

export default class Layout extends Component {
    render () {
        return (
          <div>
            <Grid>
                <Grid.Row columns={1}>
                        <Grid.Column floated='right'>
                        <Appbar />
                    </Grid.Column>
                </Grid.Row>
                <Grid.Row columns={2}>
                    <Grid.Column>
                        <Sidebar />
                    </Grid.Column>
                    <Grid.Column>
                        {this.props.children}
                    </Grid.Column>
                </Grid.Row>
            </Grid>
          </div>
        );
    }
}
