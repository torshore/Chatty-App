import React, {Component} from 'react';
//
import Message from './Message.jsx';

class MessageList extends Component {
  render() {
     let checkNotice = null;

    if (this.props.message.type = "postNotification"){
      checkNotice = (
        <div className="message system">
          <span> {this.props.message.content}</span>
        </div>
      )
    }
      return (
        <div>
          {checkNotice}
           <div id="message-list">
             {this.props.message.map( (msg, id) => {
              return (
                <Message key={id} username={msg.username} content={msg.content} />)
             })}
           </div>
        </div>
    )
  }
}


export default MessageList;



