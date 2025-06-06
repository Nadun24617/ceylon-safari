import React, { createContext, useState, useEffect } from 'react';

export const AppContent = createContext();

export const AppProvider = ({ children }) => {
  const [userdata, setUserData] = useState(null);
  const [isLoggedIn, setIsLoggedin] = useState(false);

  useEffect(() => {
    // On app load, try to read user data from localStorage
    const savedUser = localStorage.getItem('user');
    if (savedUser) {
      setUserData(JSON.parse(savedUser));
      setIsLoggedin(true);
    }
  }, []);

  const backendUrl = 'http://localhost:5000'; // Update to your backend URL if needed

  return (
    <AppContent.Provider value={{ userdata, setUserData, isLoggedIn, setIsLoggedin, backendUrl }}>
      {children}
    </AppContent.Provider>
  );
};
