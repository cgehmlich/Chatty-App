import React, { Component } from 'react';
import Message from './Message.jsx';
import ChatBar from './ChatBar.jsx';
import MessageList from './MessageList.jsx';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentUser: 'anonymous',
      messages: []
    }
  }

  componentDidMount() {
    this.connection = new WebSocket('ws://localhost:3001');
    this.connection.onopen = function (event) {
      console.log('Connected to server');
    }
    this.connection.onmessage = (event) => {
      const message = JSON.parse(event.data);
      const messages = this.state.messages.concat(message);
      this.setState({
        messages: messages
      })
    }
  }

  newMessage(username, content, type) {
    let usernameOld = this.state.currentUser;
    if (usernameOld !== username) {
      var nameCheck = {
        type: 'postNotification',
        content: `${usernameOld} changed their name to ${username}`
      }
      usernameOld = username
      this.connection.send(JSON.stringify(nameCheck))
    }
    const message = {
      username,
      content,
      type
    };
    this.setState({currentUser: username})
    this.connection.send(JSON.stringify(message));
  }

  render() {
    return (
      <div>
        <ChatBar currentUser={this.state.currentUser} newMessage={this.newMessage.bind(this)} />
        <MessageList messages={this.state.messages} />
      </div>
    );
  }
}
export default App;
