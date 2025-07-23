import React from 'react'
import ChatInput from './ChatInput.jsx'
import MessageList from './MessageList.jsx'
import './ChatArea.css'

function ChatArea() {
    return (
        <>
            <div id="ChatArea">
                <MessageList />
                <ChatInput />
            </div>
        </>
    )
}

export default ChatArea