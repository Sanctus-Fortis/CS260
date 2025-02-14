import React from 'react';
import './login.css';

export function Login() {
  return (
    <main>
            <div class="login-container">
                <h1>Login</h1>
                <form>
                    <div class="form-fields">
                        <input type="email" placeholder="Email" />
                        <input type="password" placeholder="Password" />
                        <button type="submit">Register</button>
                    </div>
                </form>
            </div>
        </main>
  );
}