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


export default function App() {
    return (
        <BrowserRouter>
            <div className="body bg-dark text-light">
                <header>
                    <nav>
                            <li className="nav">
                            <NavLink to=''>About</NavLink>
                            </li>
                            <li className="nav">
                            <NavLink to='login'>Login</NavLink>
                            </li>
                            <li className="nav">
                            <NavLink to='register'>Register</NavLink>
                            </li>
                            <li className="nav">
                            <NavLink to='media'>Media Toolkit</NavLink>
                            </li>
                            <li className="nav">
                            <NavLink to='builder'>Build Tool</NavLink>
                            </li>
                            <li className="nav">
                            <NavLink to='leaderboard'>Leaderboards</NavLink>
                            </li>
                    </nav>
                    <p>Addison Rogers</p>
                </header>

                <Routes>
                    <Route path='/' element={<About />} />
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
        </BrowserRouter>
    );
  }

  function NotFound() {
    return <main className="container-fluid bg-secondary text-center">404: Return to sender. Address unknown.</main>;
  }