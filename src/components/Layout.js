import React, { Component } from 'react';
import Sidebar from './Sidebar';
import Appbar from './Appbar';
import { Grid } from 'semantic-ui-react';

const style = {};
const sidebarWidth = 220;

style.main = {
    marginLeft: sidebarWidth,
}

style.appbar = {
    borderRadius: 0,
}

style.grid = {
    //marginLeft: sidebarWidth + 'px',
    marginRight: '50px',
    paddingLeft: '50px'
};

style.menu = {
  position: 'fixed',
  top: 0,
  bottom: 0,
  left: 0,
  width: sidebarWidth,
  paddingBottom: '1em',
  // match menu background
  // prevents a white background when items are filtered out by search
  background: '#1B1C1D',
  overflowY: 'scroll',
}


export default class Layout extends Component {
    render () {
        return (
        <div>
            <Sidebar audits={this.props.audits} style={style.menu}/>
            <div style={style.main}>
                <Appbar style={style.appbar} client={this.props.client} />
                <Grid style={style.grid}>
                    <Grid.Row>
                        <Grid.Column>
                            {this.props.children}
                        </Grid.Column>
                    </Grid.Row>
                </Grid>
            </div>
        </div>
        );
    }
}
