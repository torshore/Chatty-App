import React, {Component} from 'react';
import App from './App.jsx';

class ChatBar extends Component {

  render() {
    return (
      <footer className="chatbar">
      <input
        className="chatbar-username"
        type="text"
        placeholder="Your Name (Optional)"
        onKeyDown={this.props.changeUsername}
      />
      <input
        type="text"
        className="chatbar-message"
        placeholder="Type a message and hit ENTER"
        onKeyDown={this.props.addMessage}
      />
      </footer>
    );
  }

};

export default ChatBar;