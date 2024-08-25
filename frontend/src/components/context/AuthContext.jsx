

import React, { createContext, useState, useContext, useEffect } from 'react';

// Define the AuthContext with user details
const AuthContext = createContext({
  isAuthenticated: false,
  user: null,
  login: (user) => {},
  logout: () => {},
});

// Create a provider component
export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState(null); // Store user details

  // Check local storage on app load
  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem('user'));
    if (storedUser) {
      setIsAuthenticated(true);
      setUser(storedUser);
    }
  }, []);

  // Update login to set user details and store in local storage
  const login = (userDetails) => {
    setIsAuthenticated(true);
    console.log("context k andar se ", userDetails)
    setUser(userDetails);
    localStorage.setItem('user', JSON.stringify(userDetails)); // Save to local storage
  };

  // Update logout to clear user details and remove from local storage
  const logout = () => {
    setIsAuthenticated(false);
    setUser(null);
    localStorage.removeItem('user'); // Remove from local storage
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

// Custom hook for using auth context
export const useAuth = () => useContext(AuthContext);









