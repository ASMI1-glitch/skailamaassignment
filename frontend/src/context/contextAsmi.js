import React, { createContext, useContext, useState, useEffect } from 'react';

const AsmiContext = createContext();

export const useAsmi = () => {
  const context = useContext(AsmiContext);
  if (!context) {
    throw new Error('useAsmi must be used within an AsmiProvider');
  }
  return context;
};

export const AsmiProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    // Load user from localStorage on initial load
    const storedUser = localStorage.getItem('asmi_user');
    return storedUser ? JSON.parse(storedUser) : null;
  });

  // Update localStorage whenever user state changes
  useEffect(() => {
    if (user) {
      localStorage.setItem('asmi_user', JSON.stringify(user));
    } else {
      localStorage.removeItem('asmi_user');
    }
  }, [user]);

  const value = { user, setUser };

  return (
    <AsmiContext.Provider value={value}>
      {children}
    </AsmiContext.Provider>
  );
};
