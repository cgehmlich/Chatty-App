import React, {Component} from 'react';
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
    this.connection.onmessage = (event) => {
      const message = JSON.parse(event.data);
      const messages = this.state.messages.concat(message);
      this.setState({
        messages: messages})
    }
    }
  }

  newMessage(username, content, type) {
    let usernameOld = this.state.currentUser.name;
    if (usernameOld !== username){
      var check = {
        type : 'postNotification',
        content : `${usernameOld} changed their name to ${username}`
      }
    usernameOld = username
    this.connection.send(JSON.stringify(check))
  }
      const message = {
        username,
        content,
        type
      };
      this.connection.send(JSON.stringify(message));

  }

  render() {
    return (
      <div>
        <MessageList messages={this.state.messages}/>
        <ChatBar currentUser={this.state.currentUser}/>
      </div>
    );
  }
}
export default App;
