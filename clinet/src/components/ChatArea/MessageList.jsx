import React from 'react'
import { useUser } from '@clerk/clerk-react'
import './MessageList.css'

function MessageList() {
    const { user } = useUser()
    return (
        <>
            <div className="MessageList">
                {   user ?
                    <>
                        <h1>👋 Welcome back, {user?.firstName} {user?.lastName}!</h1>
                        <p>🧠 Just start typing your question or command whenever you're ready.</p>
                    </>
                    :
                    <>
                        <h1>👋 Welcome to iCommand</h1>
                        <p>Ask questions, get help with tasks, or chat naturally — anytime.</p>
                    </>
                }
            </div>
        </>
    )
}

export default MessageList