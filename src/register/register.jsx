import React, { useState } from 'react';
import './register.css';

export function Register() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();
    const user = { username, password };
    localStorage.setItem('user', JSON.stringify(user));
    navigate('/builder');
    window.location.reload()
  };

  return (
    <main>
      <div className="register-container">
        <h1>Register</h1>
        <form onSubmit={handleSubmit}>
          <div className="form-fields">
            <input
              type="text"
              placeholder="Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <button type="submit">Register</button>
          </div>
        </form>
      </div>
    </main>
  );
}