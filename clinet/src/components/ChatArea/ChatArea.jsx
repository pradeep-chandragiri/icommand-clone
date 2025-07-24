import React, { useState } from 'react'
import ChatInput from './ChatInput.jsx'
import MessageList from './MessageList.jsx'
import './ChatArea.css'

function ChatArea() {
    const [messages, setMessages] = useState([]);
    return (
        <>
            <div id="ChatArea">
                <MessageList messages={messages} />
                <ChatInput messages={messages} setMessages={setMessages} />
            </div>
        </>
    )
}

export default ChatArea