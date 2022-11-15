import React, { useState, useEffect } from 'react';

import Login from './components/Login/Login';
import Home from './components/Home/Home';
import MainHeader from './components/MainHeader/MainHeader';

// Dummy account
const dummydatabase = { 'dummy@account.xyz': '1234567890' };

export default function App() {
    const [isLoggedIn, setIsLoggedIn] = useState(false),
        [database] = useState(dummydatabase);

    useEffect(() => {
        const userIsLogged = localStorage.getItem('isLoggedIn');
        setIsLoggedIn(userIsLogged === '1' ? true : false);
    }, []);

    const loginHandler = (email, password) => {
        // Check that password and email match
        if (database[email] === password) {
            // Set a login storage persistent value
            localStorage.setItem('isLoggedIn', '1');
            setIsLoggedIn(true);
        }
    };

    const logoutHandler = () => {
        // Clears storage for logout persistency
        localStorage.removeItem('isLoggedIn');
        setIsLoggedIn(false);
    };

    return (
        <>
            <MainHeader isAuthenticated={isLoggedIn} onLogout={logoutHandler} />
            <main>
                {!isLoggedIn && (
                    <Login database={database} onLogin={loginHandler} />
                )}
                {isLoggedIn && <Home onLogout={logoutHandler} />}
            </main>
        </>
    );
}
