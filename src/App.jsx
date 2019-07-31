import React, { useState, useEffect } from 'react';
import MessageList from './MessageList.jsx';
import ChatBar from './ChatBar.jsx';

export default function App(){
    const [ currentUser, setCurrentUser ] = useState('Anonymous');
    const [ messages, setMessages ] = useState([]);
    const [ clientCount, setClientCount ] = useState(0);

    const addMessage = (event) => {
        if (event.key === 'Enter') {
            let newMessage = {
              type: 'postMessage',
              username: currentUser,
              content: event.target.value
            };

            this.socket.send(JSON.stringify(newMessage));
        }
    }

    const changeUsername = (event) => {
        if (event.key === 'Enter') {
            const oldName = currentUser;
            const newName = event.target.value;
            const newMessage = {
                type: 'postNotification',
                content: `${oldName} has changed their name to ${newName}`
            }

            setCurrentUser(newName);
            this.socket.send(JSON.stringify(newMessage));
        }
    }

    useEffect(() => {
        const socket = new WebSocket('ws://localhost:3001/');

        socket.onopen = () => {
            console.log('28, Connected to server!')
        };

        socket.onmessage = (event) => {
            let data = JSON.parse(event.data);

            switch(data.type) {
            case 'incomingNotification':
                break;
            case 'incomingMessage':
                setMessages(messages.concat(data));
                break;
            case 'incomingclientCount':
                setClientCount(data.quantity)
                break;
            default:
                console.error('unknown message type')
            }
        }
    })

    return <div className='wrapper'>
        <nav className="navbar">
          <h1 className="navbar-brand">Chatty</h1>
          <div className="client-count"> {clientCount} users online </div>
        </nav>

        <MessageList message={messages}/>

        <ChatBar
          changeUsername={(event) => changeUsername(event)}
          addMessage={(event) => addMessage(event)}
        />
    </div>
}
