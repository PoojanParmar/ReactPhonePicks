import React, { useState } from 'react';
import AccountForm from './AccountForm';

const AccountPage = () => {
  const [user, setUser] = useState(null); // Store user data

  // Save user data (new or updated)
  const saveAccountData = (userData) => {
    setUser(userData);
    alert('Account information saved successfully!');
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
