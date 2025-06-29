// context/contextAsmi.js
import React, { createContext, useState, useContext } from 'react';

// Create the context
const AsmiContext = createContext();

// Custom hook for consuming the context
export const useAsmi = () => {
  const context = useContext(AsmiContext);
  if (!context) {
    throw new Error('useAsmi must be used within an AsmiProvider');
  }
  return context;
};

// Context provider component
export const AsmiProvider = ({ children }) => {
  const [user, setUser] = useState(null); // You can replace `null` with logic to load user from localStorage or API

  const value = { user, setUser };

  return (
    <AsmiContext.Provider value={value}>
      {children}
    </AsmiContext.Provider>
  );
};
