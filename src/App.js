import React, { Component } from 'react';
import Header_ from './components/Header';
import Main from './components/Main';
import { Sidebar, Segment, Button, Menu, Image, Icon, Header } from 'semantic-ui-react'

class App extends Component {
  render() {
    return (
      <div>
        <Sidebar.Pushable as={Segment}>
            <Sidebar as={Menu} animation='push' width='thin' visible={true} icon='labeled' vertical inverted>
              <Menu.Item name='home'>
                <Icon name='home' />
                Home
              </Menu.Item>
              <Menu.Item name='gamepad'>
                <Icon name='gamepad' />
                Games
              </Menu.Item>
              <Menu.Item name='camera'>
                <Icon name='camera' />
                Channels
              </Menu.Item>
            </Sidebar>
            <Sidebar.Pusher>
              <Segment basic>
                <Header_ />
                <Header as='h3'>Application Content</Header>
                <Main />
              </Segment>
            </Sidebar.Pusher>
          </Sidebar.Pushable>
      </div>
    );
  }
}

export default App;
