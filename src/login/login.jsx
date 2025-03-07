import React, { useState } from 'react';
import { useNavigate, NavLink } from 'react-router-dom';
import './login.css';

export function Login() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch('http://localhost:5000/api/login', {
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

    return (
        <main>
            <div className="login-container">
                <h1>Login</h1>
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