import React, { createContext, useContext, useState, useEffect } from 'react';

// AuthContext.jsx - Authentication context
// Provides user state and auth functions
// This file provides global authentication state for the app
// It uses React context to share user info and login/logout functions across all components

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);

  useEffect(() => {
    // On mount, load user and token from localStorage (if available)
    const token = localStorage.getItem('token');
    const userData = localStorage.getItem('user');
    if (token && userData) {
      setUser(JSON.parse(userData));
    }
  }, []);

  const login = (user, token) => {
    // Log in a user: save token and user info to localStorage and state
    localStorage.setItem('token', token);
    localStorage.setItem('user', JSON.stringify(user));
    setUser(user);
  };

  const logout = () => {
    // Log out a user: remove token and user info from localStorage and state
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {/* Provide user, login, and logout functions to all children components */}
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  // Custom hook to use authentication context in any component
  return useContext(AuthContext);
}
