import React, { useState, useEffect } from 'react';
import { getUser } from '../api';

const Profile = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const data = await getUser();
        setUser(data);
      } catch (error) {
        console.error('Failed to fetch user:', error);
      }
    };

    fetchUser();
  }, []);

  if (!user) {
    return <div className="flex items-center justify-center mt-5">Loading...</div>;
  }

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Profile</h1>
      <div className="bg-white shadow-md rounded-lg p-6">
        <p className="text-lg font-medium">Name: {user.name}</p>
        <p className="text-lg font-medium">Email: {user.email}</p>
      </div>
    </div>
  );
};

export default Profile;
