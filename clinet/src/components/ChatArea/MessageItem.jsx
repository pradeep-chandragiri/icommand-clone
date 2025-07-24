import React from 'react'
import { useUser } from '@clerk/clerk-react'
import './MessageItem.css'

function MessageItem({messages }) {
    const {user} = useUser()
     if (!user) return null;
    return (
        <>
            <div className="messageItem">
                {messages.map((msg) => (
                    <>
                        {msg.role === "user" ? 
                            <div key={msg.id} className="messageWrapper">
                                <div className="txtWrap">
                                    <p style={{ whiteSpace: "pre-wrap" }}>{msg.content}</p>
                                </div>
                                <div className="userWrap">
                                    <div className="userCover">
                                        <img src={user.imageUrl} alt="" />
                                    </div>
                                </div>
                            </div>
                        : 
                            <div key={msg.id} className="messageWrapper bot">
                                <div className="txtWrap">
                                    <p style={{ whiteSpace: "pre-wrap" }}>{msg.content}</p>
                                </div>
                            </div>
                        }
                    </>
                ))}
                
            </div>
        </>
    )
}

export default MessageItem