import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { NavLink } from 'react-router-dom';
import { Menu } from 'semantic-ui-react';

class AppBar extends Component {
  state = {}
  handleItemClick = (e, { name }) => this.setState({ activeItem: name })

  render() {
    const { activeItem } = this.state;
    return (
      <Menu inverted style={this.props.style}>
        <Menu.Item name='user' >
          {this.props.client.name}
        </Menu.Item>
        <Menu.Item position='right' name='user' active={activeItem === 'browse'} onClick={this.handleItemClick} as={NavLink} to='/login'>
          Log Out
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
