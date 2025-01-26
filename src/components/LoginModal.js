import React from 'react';

const LoginModal = ({ onClose }) => {
    return (
        <div className="login-modal">
            <h2>Login</h2>
            <button onClick={onClose}>Close</button>
            {/* Add login form elements here */}
        </div>
    );
};

export default LoginModal;
