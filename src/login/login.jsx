import React, { useState, useEffect } from 'react';
import { useNavigate, NavLink } from 'react-router-dom';
import './login.css';

export function Login() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [insult, setInsult] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            const response = await fetch('/api/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ username, password })
            });
            const data = await response.json();
            if (response.ok) {
                localStorage.setItem('token', data.token);
                localStorage.setItem('user', JSON.stringify({ username }));
                navigate('/');
                window.location.reload();
            } else {
                setError(data.message);
            }
        } catch (err) {
            setError('beepbeepboopboop');
        }
    };


    // THIRD PARTY API
    const insultUser = async () => {
        try {
            const response = await fetch('https://uselessfacts.jsph.pl/api/v2/facts/random?language=en', {
                method: 'GET',
            });
            const data = await response.json();
            console.log('API Response:', data);
            if (response.ok) {
                setInsult(data.text);
            } else {
                setError(data.message);
            }
        } catch (err) {
            setError('beepbeepboopboop');
        }
    };

    useEffect(() => {
        insultUser();
    }, []);

    return (
        <main>
            <div className="login-container">
                <h1>Login</h1>
                <h1 className="smalltext">{insult}</h1>
                {error && <p className="error">{error}</p>}
                <form onSubmit={handleSubmit}>
                    <div className="form-fields">
                        <input
                            type="text"
                            placeholder="Username"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            required
                        />
                        <input
                            type="password"
                            placeholder="Password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                        <button type="submit">Login</button>
                    </div>
                </form>
                <NavLink className={"standardLink"} to='/register'>Register</NavLink>
            </div>
        </main>
    );
}