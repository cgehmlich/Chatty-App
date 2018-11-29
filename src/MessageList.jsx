
import React, {Component} from 'react';
import Message from './Message.jsx';

class MessageList extends Component {

    render(){
            const post = this.props.messages.map(post => {
              return <Message
                  username={ post.username }
                  content={ post.content }
                  key={ post.id}
                  type={ post.type} />
            });
      
            return (
              <section>
                { post }
              </section>
            );
        }
    }

export default MessageList;