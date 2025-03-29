import React, { createContext, useState } from 'react';
import { deleteToken } from '../Helper/Tokens';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState(null);

  const handleLogin = (userData) => { 
    setIsAuthenticated(true);
    setUser(userData);

  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    setUser(null);
    deleteToken('access'); 
    deleteToken('refresh'); 
    window.location.reload();
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, user, handleLogin, handleLogout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuthContext = () => {
  return React.useContext(AuthContext);
};