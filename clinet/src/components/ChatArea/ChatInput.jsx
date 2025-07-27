import React, { useRef, useState, useEffect } from 'react';
import { SignedIn, SignedOut, useAuth } from '@clerk/clerk-react'
import axios from "axios";
import { useSpeechRecognizer } from '../../utils/useSpeechRecognizer.js';
import './ChatInput.css';

function ChatInput({ messages, setMessages }) {
    const API_BASE = import.meta.env.VITE_API_URL;
    const { getToken } = useAuth();
    const [text, setText] = useState('');
    const [chatId, setChatId] = useState();
    const [loading, setLoading] = useState(false);

    const textareaRef = useRef(null);
    const handleInput = (e) => {
        const textarea = textareaRef.current;
        if (textarea) {
            const maxHeight = 200; // Set your max height here
            textarea.style.height = 'auto';
            const newHeight = Math.min(textarea.scrollHeight, maxHeight);
            textarea.style.height = `${newHeight}px`;
            textarea.style.overflowY = textarea.scrollHeight > maxHeight ? 'auto' : 'hidden';
        }
    };

    // 👇 Fetch history on mount if chatId exists
    useEffect(() => {
        const fetchHistory = async () => {
            if (!chatId) return;
            const token = await getToken();
            const res = await axios.get(`${API_BASE}/api/chat/${chatId}`, {
                headers: { Authorization: `Bearer ${token}` },
            });
            setMessages(res.data.chat?.messages || []);
        };
        fetchHistory();
    }, [chatId]);

    const handleSubmit = async () => {
        if (!text.trim()) return;
        setLoading(true);
        const token = await getToken();
        const userMessage = { role: "user", content: text };
        const updatedMessages = [...messages, userMessage];
        setMessages(updatedMessages);
        setText("");

        try {
            // Send to OpenRouter or any LLM API
            const res = await axios.post(
                "https://openrouter.ai/api/v1/chat/completions",
                {
                    model: "deepseek/deepseek-r1:free",
                    messages: updatedMessages,
                },
                {
                headers: {
                    Authorization: `Bearer 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`,
                    "Content-Type": "application/json",
                },
                }
            );

            const aiReply = res.data.choices[0].message;
            const finalMessages = [...updatedMessages, aiReply];
            setMessages(finalMessages);

            if (chatId) {
                // 👇 Update existing chat
                await axios.patch(
                `${API_BASE}/api/chat/update/${chatId}`,
                { messages: [userMessage, aiReply] },
                { headers: { Authorization: `Bearer ${token}` } }
                );
            } else {
                // 👇 First message: create new chat
                const saveRes = await axios.post(
                `${API_BASE}/api/chat/save`,
                { messages: [userMessage, aiReply] },
                { headers: { Authorization: `Bearer ${token}` } }
                );
                const newChatId = saveRes.data.chat._id;
                setChatId(newChatId);
                localStorage.setItem("chatId", newChatId);
            }
        } catch (err) {
            console.error(err);
            setMessages((prev) => [
                ...prev,
                { role: "assistant", content: "Something went wrong." },
            ]);
        } finally {
            setLoading(false);
        }
    };

    //Show/Hide Switch
    const [show, setShow] = useState(false);
    const handleToggle = () => {
        setShow((prev) => !prev);
    };

    //useSpeechRecognizer
    const [listening, setListening] = useState(false);
    const { startListening, stopListening } = useSpeechRecognizer();
    const handleSpeech = () => {
        if (listening) {
            stopListening();
            setListening(false);
        } else {
            setText("");
            setListening(true);

            startListening({
                onText: (t) => setText(t),
                onEnd: () => setListening(false)
            });
        }
    };

    return (
        <>
            <div className="ChatInput">
                <div>
                <div id="PrompBox">
                    <div className="promptContainer">
                        <SignedOut>
                            <textarea name="promptBox"
                                autoComplete='off'
                                autoCorrect='off'
                                autoCapitalize='on'
                                spellCheck='false'
                                style={{pointerEvents: 'none'}}
                                placeholder='Ask Anything'
                            ></textarea>
                        </SignedOut>
                        <SignedIn>
                            <textarea name="promptBox"
                                autoComplete='off'
                                autoCorrect='off'
                                autoFocus='on'
                                autoCapitalize='on'
                                spellCheck='false'
                                placeholder='Ask Anything'
                                ref={textareaRef}
                                onInput={handleInput}
                                rows={1}
                                value={text}
                                onChange={(e) => setText(e.target.value)}
                            ></textarea>
                        </SignedIn>
                    </div>
                    <div className="promptOptions">
                        <div className="icommandOTS">
                            <button className="OST-Btn" onClick={handleToggle}>
                                <span>
                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24" color="currentColor" fill="none">
                                        <path d="M22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22C17.5228 22 22 17.5228 22 12Z" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path>
                                        <path d="M12 8V16M16 12H8" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path>
                                    </svg>
                                </span>
                                {show && (
                                    <div className="moreOptions">
                                        <li>
                                            <span>Add photo</span>
                                            <span className='addIco'>
                                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="18" height="18" color="currentColor" fill="none">
                                                    <path d="M6 17.9745C6.1287 19.2829 6.41956 20.1636 7.07691 20.8209C8.25596 22 10.1536 22 13.9489 22C17.7442 22 19.6419 22 20.8209 20.8209C22 19.6419 22 17.7442 22 13.9489C22 10.1536 22 8.25596 20.8209 7.07691C20.1636 6.41956 19.2829 6.1287 17.9745 6" stroke="currentColor" stroke-width="1.5"></path>
                                                    <path d="M2 10C2 6.22876 2 4.34315 3.17157 3.17157C4.34315 2 6.22876 2 10 2C13.7712 2 15.6569 2 16.8284 3.17157C18 4.34315 18 6.22876 18 10C18 13.7712 18 15.6569 16.8284 16.8284C15.6569 18 13.7712 18 10 18C6.22876 18 4.34315 18 3.17157 16.8284C2 15.6569 2 13.7712 2 10Z" stroke="currentColor" stroke-width="1.5"></path>
                                                    <path d="M2 11.1185C2.61902 11.0398 3.24484 11.001 3.87171 11.0023C6.52365 10.9533 9.11064 11.6763 11.1711 13.0424C13.082 14.3094 14.4247 16.053 15 18" stroke="currentColor" stroke-width="1.5" stroke-linejoin="round"></path>
                                                    <path d="M12.9998 7H13.0088" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path>
                                                </svg>
                                            </span>
                                        </li>
                                        <li>
                                            <span>Attach document</span>
                                            <span className='addIco'>
                                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="18" height="18" color="currentColor" fill="none">
                                                    <path d="M19.5 12.0001V13.5001C19.5 17.6422 16.1421 21.0001 12 21.0001C7.85786 21.0001 4.5 17.6422 4.5 13.5001V8C4.5 5.23858 6.73858 3 9.5 3C12.2614 3 14.5 5.23858 14.5 8V13.5C14.5 14.8807 13.3807 16 12 16C10.6193 16 9.5 14.8807 9.5 13.5V9.5" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path>
                                                </svg>
                                            </span>
                                        </li>
                                        <li>
                                            <span>Connected apps</span>
                                            <span className='addIco'>
                                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="18" height="18" color="currentColor" fill="none">
                                                    <path d="M2.5 12C2.5 7.52166 2.5 5.28249 3.89124 3.89124C5.28249 2.5 7.52166 2.5 12 2.5C16.4783 2.5 18.7175 2.5 20.1088 3.89124C21.5 5.28249 21.5 7.52166 21.5 12C21.5 16.4783 21.5 18.7175 20.1088 20.1088C18.7175 21.5 16.4783 21.5 12 21.5C7.52166 21.5 5.28249 21.5 3.89124 20.1088C2.5 18.7175 2.5 16.4783 2.5 12Z" stroke="currentColor" stroke-width="1.5" stroke-linejoin="round"></path>
                                                    <path d="M11 7.5H17M8 7.5C8 7.77614 7.77614 8 7.5 8C7.22386 8 7 7.77614 7 7.5C7 7.22386 7.22386 7 7.5 7C7.77614 7 8 7.22386 8 7.5Z" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path>
                                                    <path d="M11 12H17M8 12C8 12.2761 7.77614 12.5 7.5 12.5C7.22386 12.5 7 12.2761 7 12C7 11.7239 7.22386 11.5 7.5 11.5C7.77614 11.5 8 11.7239 8 12Z" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path>
                                                    <path d="M11 16.5H17M8 16.5C8 16.7761 7.77614 17 7.5 17C7.22386 17 7 16.7761 7 16.5C7 16.2239 7.22386 16 7.5 16C7.77614 16 8 16.2239 8 16.5Z" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path>
                                                </svg>
                                            </span>
                                        </li>
                                        <li>
                                            <span>Cancel</span>
                                        </li>
                                    </div>
                                )}
                            </button>
                            <button className='OST-Btn'>
                                <span>
                                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" class="injected-svg" data-src="https://cdn.hugeicons.com/icons/siri-stroke-standard.svg" xmlns:xlink="http://www.w3.org/1999/xlink" role="img" color="currentColor">
                                        <circle cx="12" cy="12" r="10" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></circle>
                                        <path d="M3 7.59199C9 9.31999 10.5 5 19 5" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path>
                                        <path d="M2 12C11 12 14 5 19 5" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path>
                                        <path d="M18 19.88C12.7189 21.1446 6.44444 12 2 12" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path>
                                        <path d="M4 18C10.5 18 15.6857 10 22 10" stroke="currentColor" stroke-width="1.5" stroke-linejoin="round"></path>
                                    </svg>
                                </span>
                            </button>
                        </div>
                        <div className="icommandSTS">
                            
                            <button className="STS-Btn" onClick={handleSpeech} style={loading ? { pointerEvents: 'none' } : {}}>
                                <span>
                                    {listening 
                                    ?
                                        <div className="recorderStatus">
                                            <div className="recording"></div>
                                        </div>
                                    : 
                                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24" color="currentColor" fill="none">
                                            <path d="M17 7V11C17 13.7614 14.7614 16 12 16C9.23858 16 7 13.7614 7 11V7C7 4.23858 9.23858 2 12 2C14.7614 2 17 4.23858 17 7Z" stroke="currentColor" stroke-width="1.5"></path>
                                            <path d="M20 11C20 15.4183 16.4183 19 12 19M12 19C7.58172 19 4 15.4183 4 11M12 19V22M12 22H15M12 22H9" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"></path>
                                        </svg>
                                    }
                                </span>
                            </button>
                            <button className="STS-Btn sendBtn" onClick={handleSubmit} disabled={loading}>
                                {loading ? 
                                    <span className='generating'></span>
                                    :
                                    <span>
                                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="22" height="22" color="#fff" fill="none">
                                            <path d="M12 4L12 20" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"></path>
                                            <path d="M16.9998 8.99996C16.9998 8.99996 13.3174 4.00001 11.9998 4C10.6822 3.99999 6.99982 9 6.99982 9" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"></path>
                                        </svg>
                                    </span>
                                }
                            </button>
                        </div>
                    </div>
                </div>
                <div className="propmt">
                    <p className='meta'>iCommand can make mistakes. Check important info. See <a href="#">Cookie Preferences</a>.</p>
                </div>
            </div>
            </div>
        </>
    )
}

export default ChatInput