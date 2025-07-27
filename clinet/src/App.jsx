import React, { useEffect, useState } from 'react'
import PageLayout from './PageLayout/PageLayout'
import Preloader from './PageLayout/Preloader'
import  { useUser } from '@clerk/clerk-react'

function App() {

    const { user, isLoaded } = useUser();
    const [isAppReady, setIsAppReady] = useState(false);

    useEffect(() => {
        const initializeApp = async () => {
            if (!isLoaded) return; // wait for Clerk
            // Additional setup logic can go here if needed
            setIsAppReady(true);
        };

        initializeApp();
    }, [isLoaded]);

    if (!isAppReady) return <Preloader />;
    return (
        <>
            <PageLayout />
        </>
    )
}

export default App