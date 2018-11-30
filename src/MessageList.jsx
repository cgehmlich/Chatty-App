
import React, {Component} from 'react';
import Message from './Message.jsx';
import App from './App.jsx';
const uuid = require('uuid');

class MessageList extends Component {

    render(){
            const message = this.props.messages.map(message => {
              return <Message
                  username={ message.username }
                  content={ message.content }
                  key={ message.id}
                  type={ message.type} 
                  class={message.class}
                  clientColor={ message.clientColor} />
            });
      
            return (
              <section>
                { message }
              </section>
            );
        }
    }

export default MessageList;