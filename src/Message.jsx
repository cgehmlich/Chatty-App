
import React, {Component} from 'react';
import App from './App.jsx';
const uuid = require('uuid');

class Message extends Component {
  render() {
    let clientColor = { color: this.props.clientColor}
    return (
      <div className="message">
        <span className="message-username" style={ clientColor }>{this.props.username}</span>
        <span className={this.props.class}>{this.props.content}</span>
      </div>
    );
  }
}

export default Message;
