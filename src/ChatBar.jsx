
import React, {Component} from 'react';

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
    this.setState({username})
  }

  onContent(event) {
    this.setState({content: event.target.value})
  }

  enter(event) {

  }

  render() {
    return (
      <footer className="chatbar">
        <input
          className="chatbar-username"
          placeholder="Your Name (Optional)"
          value={this.state.username}
        />
        <input
          className="chatbar-message"
          placeholder="Type a message and hit ENTER"
          value={this.state.content}
        />
      </footer>
    );
  }
}

export default ChatBar;