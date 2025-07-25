import React, { useState, useEffect } from 'react'
import { SignedIn, SignedOut, useClerk, UserButton, useUser } from '@clerk/clerk-react'
import './NavBar.css'

function NavBar() {
    const { openSignIn } = useClerk()
    const { user } = useUser()
    const [show, setShow] = useState(false);

    const handleToggle = () => {
        setShow((prev) => !prev);
    };
    return (
        <>
            <nav>
                <div className={ user ? 'headerWrapper active' : 'headerWrapper' }>
                    <div className="navThroughWrapper">
                        <button>
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="23" height="23" color="currentColor" fill="none">
                                <path d="M15 9V15H9V9H15Z" stroke="currentColor" stroke-width="1.5" stroke-linejoin="round"></path>
                                <path d="M15 15H18C19.6569 15 21 16.3431 21 18C21 19.6569 19.6569 21 18 21C16.3431 21 15 19.6569 15 18V15Z" stroke="currentColor" stroke-width="1.5" stroke-linejoin="round"></path>
                                <path d="M9 15.002H6C4.34315 15.002 3 16.3451 3 18.002C3 19.6588 4.34315 21.002 6 21.002C7.65685 21.002 9 19.6588 9 18.002V15.002Z" stroke="currentColor" stroke-width="1.5" stroke-linejoin="round"></path>
                                <path d="M15 9L15 6C15 4.34315 16.3431 3 18 3C19.6569 3 21 4.34315 21 6C21 7.65685 19.6569 9 18 9H15Z" stroke="currentColor" stroke-width="1.5" stroke-linejoin="round"></path>
                                <path d="M9 9V6C9 4.34315 7.65685 3 6 3C4.34315 3 3 4.34315 3 6C3 7.65685 4.34315 9 6 9H9Z" stroke="currentColor" stroke-width="1.5" stroke-linejoin="round"></path>
                            </svg>
                        </button>
                    </div>
                    { user ?
                        <div className="signedInLinks">
                            <button className="SIL">
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24" color="currentColor" fill="none">
                                    <circle cx="12" cy="12" r="10" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></circle>
                                    <path d="M6.5 20.5L7.90613 15.227C8.19164 14.1564 8.33439 13.621 8.73856 13.3105C9.14274 13 9.69677 13 10.8048 13H13.1952C14.3032 13 14.8573 13 15.2614 13.3105C15.6656 13.621 15.8084 14.1564 16.0939 15.227L17.5 20.5" stroke="currentColor" stroke-width="1.5" stroke-linejoin="round"></path>
                                    <path d="M9.5 13L11.0769 9.36095C11.4701 8.45365 11.6667 8 12 8C12.3333 8 12.5299 8.45365 12.9231 9.36095L14.5 13" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path>
                                </svg>
                                <span>New chat</span>
                            </button>
                            <button className="SIL">
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24" color="currentColor" fill="none">
                                    <path d="M5.04798 8.60657L2.53784 8.45376C4.33712 3.70477 9.503 0.999914 14.5396 2.34474C19.904 3.77711 23.0904 9.26107 21.6565 14.5935C20.2227 19.926 14.7116 23.0876 9.3472 21.6553C5.36419 20.5917 2.58192 17.2946 2 13.4844" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path>
                                    <path d="M12 8V12L14 14" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path>
                                </svg>
                                <span>History</span>
                            </button>
                            <button className="SIL" onClick={handleToggle}>
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="23" height="23" color="currentColor" fill="none">
                                    <path d="M11.9959 12H12.0049" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path>
                                    <path d="M15.9998 12H16.0088" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path>
                                    <path d="M7.99981 12H8.00879" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path>
                                    <path d="M22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22C17.5228 22 22 17.5228 22 12Z" stroke="currentColor" stroke-width="1.5"></path>
                                </svg>
                            </button>
                            <div className="userProfile">
                                <UserButton />
                            </div>
                            {show && (
                                <div className="moreMenu">
                                    <li>
                                        <span>New chat</span>
                                        <span className='Ic'>
                                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="22" height="22" color="currentColor" fill="none">
                                                <circle cx="12" cy="12" r="10" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></circle>
                                                <path d="M6.5 20.5L7.90613 15.227C8.19164 14.1564 8.33439 13.621 8.73856 13.3105C9.14274 13 9.69677 13 10.8048 13H13.1952C14.3032 13 14.8573 13 15.2614 13.3105C15.6656 13.621 15.8084 14.1564 16.0939 15.227L17.5 20.5" stroke="currentColor" stroke-width="1.5" stroke-linejoin="round"></path>
                                                <path d="M9.5 13L11.0769 9.36095C11.4701 8.45365 11.6667 8 12 8C12.3333 8 12.5299 8.45365 12.9231 9.36095L14.5 13" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path>
                                            </svg>
                                        </span>
                                    </li>
                                    <li>
                                        <span>History</span>
                                        <span className='Ic'>
                                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="22" height="22" color="currentColor" fill="none">
                                                <path d="M5.04798 8.60657L2.53784 8.45376C4.33712 3.70477 9.503 0.999914 14.5396 2.34474C19.904 3.77711 23.0904 9.26107 21.6565 14.5935C20.2227 19.926 14.7116 23.0876 9.3472 21.6553C5.36419 20.5917 2.58192 17.2946 2 13.4844" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path>
                                                <path d="M12 8V12L14 14" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path>
                                            </svg>
                                        </span>
                                    </li>
                                    <li>
                                        <span>Profile</span>
                                        <span className='Ic'>
                                        <UserButton />
                                        </span>
                                    </li>
                                    <li onClick={handleToggle}>
                                        <span>Cancel</span>
                                    </li>
                                </div>
                            )}
                        </div>
                        :
                        <div className="logBtns">
                            <button className="log" onClick={()=> openSignIn()}>Log in</button>
                            <button className="log">Get app</button>
                        </div>
                    }
                </div>
            </nav>
        </>
    )
}

export default NavBar