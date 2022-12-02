import React, { useContext } from 'react';
// Components
import Login from './components/Login/Login';
import Home from './components/Home/Home';
import MainHeader from './components/MainHeader/MainHeader';
// Context components
import { AuthContext } from './store/auth-context';

export default function App() {
    const ctx = useContext(AuthContext);

    return (
        <>
            <MainHeader />
            <main>
                {!ctx.isLoggedIn && <Login />}
                {ctx.isLoggedIn && <Home />}
            </main>
        </>
    );
}
