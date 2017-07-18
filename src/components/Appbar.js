import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { NavLink } from 'react-router-dom';
import { Menu, Icon } from 'semantic-ui-react';

class AppBar extends Component {
  state = {}
  handleItemClick = (e, { name }) => this.setState({ activeItem: name })

  render() {
    const { activeItem } = this.state;
    return (
      <Menu fixed='top' inverted borderless style={this.props.style}>
        <Menu.Item>
          <Menu.Header as={NavLink} to='/'>
            <span style={{ fontSize: 18 }}>
              DRC
              <span style={{ color: 'red' }}>
                VIGILANTE
              </span>
            </span>
          </Menu.Header>
        </Menu.Item>
        <Menu.Item name='user' active>
          {this.props.client.name}
        </Menu.Item>
        <Menu.Item position='right' name='user' active={activeItem === 'browse'} onClick={this.handleItemClick} as={NavLink} to='/login'>
          <span>Log Out</span>
        </Menu.Item>
      </Menu>
    );
  }
}

AppBar.propTypes = {
  client: PropTypes.object.isRequired, // eslint-disable-line react/forbid-prop-types
  style: PropTypes.object.isRequired, // eslint-disable-line react/forbid-prop-types
};

export default AppBar;
