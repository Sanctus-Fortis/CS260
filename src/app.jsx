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
                            <li class="nav">
                            <NavLink to=''>Home</NavLink>
                            </li>
                            <li class="nav">
                            <NavLink to='about'>About</NavLink>
                            </li>
                            <li class="nav">
                            <NavLink to='login'>Login</NavLink>
                            </li>
                            <li class="nav">
                            <NavLink to='register'>Register</NavLink>
                            </li>
                            <li class="nav">
                            <NavLink to='media'>Media Toolkit</NavLink>
                            </li>
                            <li class="nav">
                            <NavLink to='builder'>Build Tool</NavLink>
                            </li>
                            <li class="nav">
                            <NavLink to='leaderboard'>Leaderboards</NavLink>
                            </li>
                    </nav>
                    <p>Addison Rogers</p>
                </header>
        
                <main>App components go here</main>
        
                <footer className="bg-dark text-white-50">
                    <p>Contact us:</p>
                    <p><a href="mailto:sample@example.com">sample@example.com</a></p>
                </footer>
            </div>
        </BrowserRouter>
    );
  }