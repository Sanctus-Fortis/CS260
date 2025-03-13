import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './app.css';
import { BrowserRouter, NavLink, Route, Routes, useNavigate } from 'react-router-dom';
import { Login } from './login/login';
import { About } from './about/about';
import { Builder } from './builder/builder';
import { Leaderboard } from './leaderboard/leaderboard';
import { Media } from './media/media';
import { Register } from './register/register';

export default function App() {
    const [username, setUsername] = useState('');
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    useEffect(() => {
        const user = JSON.parse(localStorage.getItem('user'));
        const token = localStorage.getItem('token');
        if (user && user.username) {
            setUsername(user.username);
        }
        if (token) {
            setIsLoggedIn(true);
        }
    }, []);

    const handleLogout = () => {
        localStorage.removeItem('token');
        setIsLoggedIn(false);
        window.location.replace('/login');
    };

    return (
        <BrowserRouter>
            <AppContent username={username} setUsername={setUsername} isLoggedIn={isLoggedIn} handleLogout={handleLogout} />
        </BrowserRouter>
    );
}

function AppContent({ username, setUsername, isLoggedIn, handleLogout }) {
    const navigate = useNavigate();

    return (
        <div className="body bg-dark text-light">
            <header>
                <nav>
                    <li className="nav">
                        <NavLink to='/'>About</NavLink>
                    </li>
                    <li className="nav">
                        <NavLink to='/media'>Media Toolkit</NavLink>
                    </li>
                    <li className="nav">
                        <NavLink to='/builder'>Build Tool</NavLink>
                    </li>
                    <li className="nav">
                        <NavLink to='/leaderboard'>Leaderboards</NavLink>
                    </li>
                    <li className="nav">
                        <a href='https://github.com/Sanctus-Fortis/CS260' target='_blank' rel='noopener noreferrer'>GitHub</a>
                    </li>
                    <li className="nav">
                        {isLoggedIn ? (
                            <button onClick={handleLogout}>Logout</button>
                        ) : (
                            <NavLink to='/login'>Login</NavLink>
                        )}
                    </li>
                </nav>
            </header>

            <Routes>
                <Route path='/' element={<About />} />
                <Route path='/about' element={<About />} />
                <Route path='/login' element={<Login />} />
                <Route path='/register' element={<Register />} />
                <Route path='/media' element={<Media />}/>
                <Route path='/builder' element={<Builder />}/>
                <Route path='/leaderboard' element={<Leaderboard />}/>
                <Route path='*' element={<NotFound />} />
            </Routes>
    
            <footer className="bg-dark text-white-50">
                <p>Contact us:</p>
                <p><a href="mailto:sample@example.com">sample@example.com</a></p>
            </footer>
        </div>
    );
}

function NotFound() {
    return <main className="container-fluid bg-secondary text-center">404: Return to sender. Address unknown.</main>;
}