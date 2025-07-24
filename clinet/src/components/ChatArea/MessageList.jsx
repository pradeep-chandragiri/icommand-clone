import React from 'react'
import { useUser, SignedIn, SignedOut } from '@clerk/clerk-react'
import './MessageList.css'
import MessageItem from './MessageItem.jsx'

function MessageList({ messages }) {
    const { user } = useUser()
    return (
        <>
            <div className="MessageList">
                <MessageItem messages={messages} />
            </div>
        </>
    )
}

export default MessageList