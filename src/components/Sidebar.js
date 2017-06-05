import _ from 'lodash/fp';
import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { findDOMNode } from 'react-dom';
import { NavLink } from 'react-router-dom';
import { withRouter } from 'react-router';

import { Menu, Icon, Input } from 'semantic-ui-react';

const getRoute = (_meta) => `/${_meta.type}s/${_.kebabCase(_meta.name)}`;

const MenuItem = ({ meta, children, ...rest }) => (
  <NavLink to={getRoute(meta)} {...rest}>
    {children || meta.name}
  </NavLink>
);

MenuItem.propTypes = {
    activeClassName: PropTypes.string,
    children: PropTypes.node,
    className: PropTypes.string,
    meta: PropTypes.object.isRequired,
    onClick: PropTypes.func.isRequired,
};

MenuItem.defaultProps = {
    activeClassName: 'active',
    className: 'item',
};

const selectedItemLabel = <span style={{ color: '#35bdb2', float: 'right' }}>Press Enter</span>;

class Sidebar extends Component {
    static propTypes = {
        match: PropTypes.object.isRequired,
        location: PropTypes.object.isRequired,
        history: PropTypes.object.isRequired,
        style: PropTypes.object,
    }
    state = { query: '' }
    render () {
        const { style } = this.props;
        const { query } = this.state;
        return (
          <Menu vertical fixed='left' inverted style={{ ...style }}>
            <Menu.Item as={NavLink} to='/' activeClassName='active'>Vigilante</Menu.Item>
            <Menu.Item>
              <Input
                className='transparent inverted icon'
                icon='search'
                placeholder='Start typing...'
                value={query}
                onChange={this.handleSearchChange}
                onKeyDown={this.handleSearchKeyDown}
              />
            </Menu.Item>
            <Menu.Item>
              <Menu.Header>Auditorias</Menu.Header>
              <Menu.Menu>
                <Menu.Item as={NavLink} to='/audits/2' activeClassName='active'>Auditoria 2</Menu.Item>
                <Menu.Item as={NavLink} to='/audits/1' activeClassName='active'>Auditoria 1</Menu.Item>
              </Menu.Menu>
            </Menu.Item>
          </Menu>
        );
    }
  }

export default withRouter(Sidebar);
