
import React, { Component } from 'react';

class ChatBar extends Component {

  constructor(props) {
    super(props);
    this.state = {
      username: this.props.currentUser,
      content: ''
    }
  }

  onUsername(event) {
    const usernameOld = this.state.username
    const username = event.target.value
    this.setState({ username })
  }

  onContent(event) {
    this.setState({ content: event.target.value })
  }

  onEnter(event) {
    if (event.key === 'Enter') {
      this.props.newMessage(this.state.username, this.state.content, "postMessage")
      this.setState({
        content: ''
      });
    }
  }

  render() {
    return (
      <footer className="chatbar">
        <input
          className="chatbar-username"
          placeholder={this.props.currentUser}
          value={this.state.username}
          onChange={this.onUsername.bind(this)}
        />
        <input
          className="chatbar-message"
          placeholder="Type a message and hit ENTER"
          value={this.state.content}
          onChange={this.onContent.bind(this)}
          onKeyDown={this.onEnter.bind(this)}
        />
      </footer>
    );
  }
}

export default ChatBar;
