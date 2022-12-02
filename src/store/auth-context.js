import React, { useState, useEffect } from 'react';

export const AuthContext = React.createContext({
    isLoggedIn: false,
    onLogin: (email, password) => {},
    onLogout: () => {},
});

// Dummy account
const dummydatabase = { 'dummy@account.xyz': '1234567890' };

export default function AuthContextProvider(props) {
    // Log state
    const [isLoggedIn, setIsLoggedIn] = useState(false),
        [database] = useState(dummydatabase);

    // Local storage checker
    useEffect(() => {
        const userIsLogged = localStorage.getItem('isLoggedIn');
        setIsLoggedIn(userIsLogged === '1' ? true : false);
    }, []);

    // Log handler
    const loginHandler = (email, password) => {
            // Check that password and email match
            if (database[email] === password) {
                // Set a login storage persistent value
                localStorage.setItem('isLoggedIn', '1');
                setIsLoggedIn(true);
            } else {
                window.alert('Wrong password');
            }
        },
        logoutHandler = () => {
            // Clears storage for logout
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
            {props.children}
        </AuthContext.Provider>
    );
}
