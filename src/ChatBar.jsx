import React from 'react';

function ChatBar({ changeUsername, addMessage }) {
    return <footer className="chatbar">
        <input
            className="chatbar-username"
            type="text"
            placeholder="Your Name (Optional)"
            onChange={changeUsername}
        />
        <input
            type="text"
            className="chatbar-message"
            placeholder="Type a message and hit ENTER"
            onChange={addMessage}
         />
    </footer>
}

export default ChatBar;
