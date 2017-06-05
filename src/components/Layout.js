import React, { Component } from 'react';
import Sidebar from './Sidebar';
import Appbar from './Appbar';

const style = {};
const sidebarWidth = 250;

style.container = {
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
    overflowY: 'hidden',
};

style.main = {
    marginLeft: sidebarWidth,
    minWidth: parseInt(sidebarWidth, 10) + 300,
    maxWidth: parseInt(sidebarWidth, 10) + 900,
};

export default class Layout extends Component {
    render () {
        return (
          <div style={style.container}>
            <Sidebar style={style.menu} />
            <div style={style.main}>
              <Appbar />
              {this.props.children}
            </div>
          </div>
        );
    }
}
