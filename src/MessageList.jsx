
import React, {Component} from 'react';
import Message from './Message.jsx';

class MessageList extends Component {

    render(){
            const post = this.props.messages.map(post => {
              return <Message
                  username={ post.username }
                  content={ post.content }/>
            });
      
            return (
              <section>
                { post }
              </section>
            );
        }
    }