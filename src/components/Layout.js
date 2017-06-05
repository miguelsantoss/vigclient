import React, { Component } from 'react';
import Sidebar from './Sidebar';
import Appbar from './Appbar';
import { Grid } from 'semantic-ui-react';

const style = {
    marginLeft: '150px',
    marginRight: '50px',
    paddingLeft: '50px'
};
export default class Layout extends Component {
    render () {
        return (
        <div>
            <Appbar />
            <Sidebar />
            <Grid style={style}>
                <Grid.Row>
                    <Grid.Column>
                        {this.props.children}
                    </Grid.Column>
                </Grid.Row>
            </Grid>
        </div>
        );
    }
}
