import React, {Component} from 'react';
import REACTDOM from 'react-dom';
import MessageList from './MessageList.jsx';
import ChatBar from './ChatBar.jsx';

export default class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
             currentUser: "Anonymous",
             messages: [],
        }
    }

    addMessage = event => {
        if (event.key === "Enter") {

            let newMessage = {
              type: "postMessage",
              username: this.state.currentUser,
              content: event.target.value
            };
            this.socket.send(JSON.stringify(newMessage));
        };
    }

  changeUsername = (event) => {
    if (event.key === "Enter") {
      const oldName = this.state.currentUser;
      const newName = event.target.value;
      this.setState({currentUser: newName});
      const newMessage = {
        type: 'postNotification',
        content: `${oldName} has changed their name to ${newName}`
      }
    console.log(newMessage);
    this.socket.send(JSON.stringify(newMessage));
  }
  }

  componentDidMount() {
    this.socket = new WebSocket("ws://localhost:3001/");

    this.socket.onopen = (event) => {
      console.log("28, Connected to server!")
    };

    this.socket.onmessage = (event) => {
      let data = JSON.parse(event.data);
      console.log(52, data);
      console.log("Message from socket server: ", data)
        switch(data.type) {
          case "incomingNotification":
          case "incomingMessage":
            let oldMsgs = this.state.messages;
            let msgList = oldMsgs.concat(data);
            this.setState({messages: msgList});
            break;
            case "incomingclientCount":
            this.setState({clientCount: data.quantity})
            console.log(data.quantity)
            break;
          default:
            console.error("unknown message type")
        }
      }
    }

  render() {
    return (
      <div className='wrapper'>
        <nav className="navbar">
          <h1 className="navbar-brand">Chatty</h1>
          <div className="client-count"> {this.state.clientCount} users online </div>
        </nav>
        <MessageList message={this.state.messages}/>
        <ChatBar
          changeUsername={this.changeUsername}
          addMessage={this.addMessage}
        />
      </div>
    );
  }
}
