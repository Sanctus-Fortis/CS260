import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export function Logout() {
    const navigate = useNavigate();

    useEffect(() => {
        localStorage.removeItem('token'); // Remove authentication token
        navigate('/login'); // Redirect to login page
    }, [navigate]);

    return <p>Logging out...</p>;
}
