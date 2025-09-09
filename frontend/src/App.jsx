import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Register from './features/auth/Register.jsx';
import Login from './features/auth/Login.jsx';
import Dashboard from './features/taskManager/Dashboard.jsx';
import { useAuth } from './context/AuthContext.jsx';

// App.jsx - Main app component
// Sets up routes and layout
const App = () => {
  const { user } = useAuth();
  return (
    <Routes>
      <Route path="/" element={user ? <Navigate to="/dashboard" /> : <Navigate to="/login" />} />
      <Route path="/register" element={<Register />} />
      <Route path="/login" element={<Login />} />
      <Route path="/dashboard" element={user ? <Dashboard /> : <Navigate to="/login" />} />
    </Routes>
  );
};

export default App;