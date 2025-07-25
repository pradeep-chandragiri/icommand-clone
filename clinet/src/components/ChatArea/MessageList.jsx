import React from 'react'
import { useUser, SignedIn, SignedOut } from '@clerk/clerk-react'
import './MessageList.css'
import MessageItem from './MessageItem.jsx'

function MessageList({ messages }) {
    const { user } = useUser()
    return (
        <>
            {messages.length === 0 
                ?
                <>
                    <div className="greets">
                            { user 
                                ?
                                <>
                                    <h1>Welcome back, {user.firstName} {user.lastName}..!👋</h1>
                                    <p>How can i assist you today?</p>
                                </>
                                :
                                <>
                                    <h1>Hi, You're in iCommand.👋</h1>
                                    <p>How can i assist you today?</p>
                                </>
                            } 
                    </div>
                </>
                :
                <div className="MessageList">
                    <MessageItem messages={messages} />
                </div>
            }
        </>
    )
}

export default MessageList