import React, { useRef, useState } from 'react';
import { SignedIn, SignedOut } from '@clerk/clerk-react'
import './ChatInput.css'

function ChatInput() {
    const [text, setText] = useState('');
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
                            <button className="OST-Btn">
                                <span>
                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24" color="currentColor" fill="none">
                                        <path d="M22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22C17.5228 22 22 17.5228 22 12Z" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path>
                                        <path d="M12 8V16M16 12H8" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path>
                                    </svg>
                                </span>
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
                            <button className="STS-Btn">
                                <span>
                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24" color="currentColor" fill="none">
                                        <path d="M17 7V11C17 13.7614 14.7614 16 12 16C9.23858 16 7 13.7614 7 11V7C7 4.23858 9.23858 2 12 2C14.7614 2 17 4.23858 17 7Z" stroke="currentColor" stroke-width="1.5"></path>
                                        <path d="M20 11C20 15.4183 16.4183 19 12 19M12 19C7.58172 19 4 15.4183 4 11M12 19V22M12 22H15M12 22H9" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"></path>
                                    </svg>
                                </span>
                            </button>
                            <button className="STS-Btn sendBtn" disabled={text.trim() === ''}>
                                <span>
                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="22" height="22" color="currentColor" fill="none">
                                        <path d="M12 4L12 20" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"></path>
                                        <path d="M16.9998 8.99996C16.9998 8.99996 13.3174 4.00001 11.9998 4C10.6822 3.99999 6.99982 9 6.99982 9" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"></path>
                                    </svg>
                                </span>
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