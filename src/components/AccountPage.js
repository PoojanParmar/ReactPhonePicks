import React, { useState } from 'react';
import AccountForm from './AccountForm';

const AccountPage = () => {
  const [user, setUser] = useState(null); // Store user data

  // Save user data (new or updated)
  const saveAccountData = (userData) => {
    // Validation for user data
    if (!userData.name || !userData.email || !userData.address) {
      alert('Please fill in all fields.');
      return;
    }

    const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
    if (!emailRegex.test(userData.email)) {
      alert('Please enter a valid email address.');
      return;
    }

    setUser(userData);
    alert('Account information saved successfully!');
    
    // Consider persisting user data (e.g., local storage or API call)
    // localStorage.setItem('user', JSON.stringify(userData));
  };

  return (
    <div>
      <h1>Your Account</h1>
      <AccountForm onSave={saveAccountData} existingUserData={user} />
      {user && (
        <div>
          <h3>Account Info:</h3>
          <p>Name: {user.name}</p>
          <p>Email: {user.email}</p>
          <p>Address: {user.address}</p>
        </div>
      )}
    </div>
  );
};

export default AccountPage;
