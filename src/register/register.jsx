import React from 'react';
import './register.css';

export function Register() {
  return (
    <main>
        <div class="register-container">
            <h1>Register</h1>
            <form>
                <div class="form-fields">
                    <input type="text" placeholder="Username" />
                    <input type="email" placeholder="Email" />
                    <input type="password" placeholder="Password" />
                    <button type="submit">Register</button>
                </div>
            </form>
        </div>
    </main>
  );
}