import React, { useEffect, useState } from 'react'
import axios from "axios";
import { useAuth } from "@clerk/clerk-react";
import './History.css'

function History({handleHistory, clerkToken}) {
    //Getting Chat History
    const { getToken } = useAuth();
    const [chats, setChats] = useState([]);
    useEffect(() => {
        const fetchHistory = async () => {
        const token = await getToken();

        const res = await axios.get("http://localhost:4000/api/chat/history", {
            headers: {
            Authorization: `Bearer ${token}`,
            },
        });

        setChats(res.data.chats);
        };

        fetchHistory();
    }, []);

    return (
        <>
            <div id="history">
                <div className="historyRes">
                    <p>History</p>
                    <p onClick={handleHistory}>Cancel</p>
                </div>
                <div className="historyList">
                    {chats.map((chat, index) => {
                        const firstUserMsg = chat.messages.find((m) => m.role === "user");
                        return (
                            <div key={chat._id}
                                className="historyItem"
                                onClick={() => toggleChat(chat._id)}>
                                <p>{firstUserMsg?.content?.slice(0, 100) || "No message"}</p>
                            </div>
                        );
                    })}
                </div>
            </div>
        </>
    )
}

export default History