import React, { use } from 'react'
import { SignedIn, SignedOut, useClerk, UserButton } from '@clerk/clerk-react'

function NavBar() {
    const { openSignIn } = useClerk()
    return (
        <>
            <nav>
                <div className="logo" onClick={()=> openSignIn()}>Login</div>
                <UserButton />
            </nav>
        </>
    )
}

export default NavBar