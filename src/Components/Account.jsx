import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getToken } from '../Helper/Tokens';
import { jwtDecode } from 'jwt-decode';
import { useAuthContext } from './contextAuth';

const Account = () => {
  const [userInfo, setUserInfo] = useState({ fullName: '', email: '' });
  const navigate = useNavigate();

  useEffect(() => {
    const token = getToken('access');
    if (token) {
      const decoded = jwtDecode(token);
      setUserInfo({
        fullName: decoded.sub,
        email: decoded.email,
      });
    } else {
      navigate('/login');
    }
  }, [navigate]);

  const { handleLogout } = useAuthContext();

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 px-4 sm:px-6">
      <div className="bg-white p-6 sm:p-12 md:p-20 shadow-xl rounded-xl w-full max-w-2xl">
        <h1 className="text-2xl sm:text-3xl font-bold text-blue-800 mb-6 text-center sm:text-left">Account Settings</h1>

        <div className="flex flex-col sm:flex-row sm:items-center mb-4">
          <h2 className="text-base sm:text-lg font-medium text-blue-600 sm:px-2">Name:</h2>
          <p className="text-gray-900 font-bold">{userInfo.fullName}</p>
        </div>

        <div className="flex flex-col sm:flex-row sm:items-center mb-4">
          <h2 className="text-base sm:text-lg font-medium text-blue-600 sm:px-2">Email:</h2>
          <p className="text-gray-900 font-semibold">{userInfo.email}</p>
        </div>

        <button
          onClick={handleLogout}
          className="mt-6 w-full bg-red-500 hover:bg-red-600 text-white font-medium py-2 px-4 rounded-lg transition"
        >
          Logout
        </button>
      </div>
    </div>
  );
};

export default Account;
