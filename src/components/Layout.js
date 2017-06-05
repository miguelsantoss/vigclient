import React, { Component } from 'react';
import Sidebar from './Sidebar';
import Appbar from './Appbar';
import { Container } from 'semantic-ui-react';

export default class Layout extends Component {
    render () {
        return (
          <div>
            <Appbar />
            <Sidebar/>
            <Container>
            {this.props.children}
            </Container>
          </div>
        );
    }
}
