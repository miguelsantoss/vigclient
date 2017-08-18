import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';

class Message extends React.Component {
  constructor(props) {
    super(props);
    this.onClick = this.onClick.bind(this);
  }

  onClick() {
    this.props.deleteMessage(this.props.message.id);
  }

  render() {
    const { type, text } = this.props.message;
    return (
      <div className={classnames('alert', {
        'alert-success': type === 'success',
        'alert-danger': type === 'error' })}
      >
        <button onClick={this.onClick} className="close"><span>&times;</span></button>
        {text}
      </div>
    );
  }
}

Message.propTypes = {
  message: PropTypes.object.isRequired,
  deleteMessage: PropTypes.func.isRequired,
};

export default Message;
