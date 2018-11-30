
import React, {Component} from 'react';
const uuid = require('uuid');

class Message extends Component {
  render() {
    let clientColor = { color: this.props.color}
    return (
      <div className="message">
        <span className="message-username" style={ clientColor }>{this.props.username}</span>
        <span className="message-content">{this.props.content}</span>
      </div>
    );
  }
}

export default Message;
