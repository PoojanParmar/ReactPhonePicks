import React, { useState } from 'react';  // <-- Import useState here
import './LoginModal.css';

const LoginModal = ({ onClose, setUser }) => {
    const [email, setEmail] = useState('');  // Using useState for email
    const [password, setPassword] = useState('');  // Using useState for password
    const [error, setError] = useState('');  // Using useState for error message

    const handleSubmit = (e) => {
        e.preventDefault();

        const validEmail = 'poojan@gmail.com';
        const validPassword = 'password123';

        if (email === validEmail && password === validPassword) {
            console.log('Logging in with:', { email, password });
            setUser({ email });  // Update the user state in App
            onClose(); 
        } else {
            setError('Invalid email or password. Please try again.');
        }
    };

    return (
        <div className="modal-overlay">
            <div className="modal-content">
                <h2 className="modal-title">Login</h2>
                <form onSubmit={handleSubmit} className="login-form">
                    <div className="form-group">
                        <label htmlFor="email">Email</label>
                        <input
                            type="email"
                            id="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder="Enter your email"
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="password">Password</label>
                        <input
                            type="password"
                            id="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            placeholder="Enter your password"
                            required
                        />
                    </div>
                    {error && <p className="error-message">{error}</p>}
                    <button type="submit" className="submit-button">Login</button>
                </form>
                <button className="close-button" onClick={onClose}>Close</button>
            </div>
        </div>
    );
};

export default LoginModal;
