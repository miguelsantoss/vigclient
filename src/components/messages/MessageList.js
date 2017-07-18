import React from 'react';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import {deleteMessage} from '../../actions/messages'; 

import Messages from './Message';

class MessageList extends React.Component {
  render () {
    const messages = this.props.messages.map(message =>
      <Messages key={message.id} message={message} deleteMessage={this.props.deleteMessage} />
    );
    return (
      <div>{messages}</div>
    )
  }
}

MessageList.propTypes = {
  messages: PropTypes.array.isRequired,
  deleteMessage: PropTypes.func.isRequired
}

function mapStateToProps(state) {
  return{
    messages: state.messages
  }
}

export default connect(mapStateToProps, { deleteMessage })(MessageList);