import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './app.css';
import { BrowserRouter, NavLink, Route, Routes } from 'react-router-dom';

import { Login } from './login/login';
import { About } from './about/about';
import { Builder } from './builder/builder';
import { Leaderboard } from './leaderboard/leaderboard';
import { Media } from './media/media';
import { Register } from './register/register';
import { Logout } from './logout/logout';

export default function App() {
    const [username, setUsername] = React.useState('');
    const [isLoggedIn, setIsLoggedIn] = React.useState(false);

    React.useEffect(() => {
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
        navigate('/front/login');
    };

    return (
        <BrowserRouter>
            <AppContent username={username} setUsername={setUsername} isLoggedIn={isLoggedIn} handleLogout={handleLogout} />
        </BrowserRouter>
    );
}

function AppContent({isLoggedIn, handleLogout }) {

    return (
        <div className="body bg-dark text-light">
            <header>
                <nav>
                    <li className="nav">
                        <NavLink to='/front/'>About</NavLink>
                    </li>
                    <li className="nav">
                        <NavLink to='/front/media'>Media Toolkit</NavLink>
                    </li>
                    <li className="nav">
                        <NavLink to='/front/builder'>Build Tool</NavLink>
                    </li>
                    <li className="nav">
                        <NavLink to='/front/leaderboard'>Leaderboards</NavLink>
                    </li>
                    <li className="nav">
                        <a href='https://github.com/Sanctus-Fortis/CS260' target='_blank' rel='noopener noreferrer'>GitHub</a>
                    </li>
                    <li className="nav">
                        {isLoggedIn ? (
                            <NavLink to='/front/logout'>Logout</NavLink> 
                        ) : (
                            <NavLink to='/front/login'>Login</NavLink>
                        )}
                    </li>
                </nav>
            </header>

            <Routes>
                <Route path='/front/' element={<About />} />
                <Route path='/front/about' element={<About />} />
                <Route path='/front/login' element={<Login />} />
                <Route path='/front/register' element={<Register />} />
                <Route path='/front/media' element={<Media />}/>
                <Route path='/front/builder' element={<Builder />}/>
                <Route path='/front/leaderboard' element={<Leaderboard />}/>
                <Route path='*' element={<NotFound />} />
                <Route path='/front/logout' element={<Logout />} />
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