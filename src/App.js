import React, { useState, useEffect } from 'react';
// Components
import Login from './components/Login/Login';
import Home from './components/Home/Home';
import MainHeader from './components/MainHeader/MainHeader';
// Contexts
import AuthContext from './store/auth-context';
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
        } else {
            window.alert('Wrong password');
        }
    };

    const logoutHandler = () => {
        // Clears storage for logout persistency
        localStorage.removeItem('isLoggedIn');
        setIsLoggedIn(false);
    };

    return (
        <AuthContext.Provider
            value={{
                isLoggedIn: isLoggedIn,
                onLogin: loginHandler,
                onLogout: logoutHandler,
            }}
        >
            <MainHeader />
            <main>
                {!isLoggedIn && <Login database={database} />}
                {isLoggedIn && <Home />}
            </main>
        </AuthContext.Provider>
    );
}
