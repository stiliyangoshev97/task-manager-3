import { useState } from 'react';
import { register } from './authApi.js';
import { useAuth } from '../../context/AuthContext.jsx';
import { useNavigate } from 'react-router-dom';

// Register.jsx - User registration form for new accounts
// This component lets users sign up by entering a username, email, and password.
// It handles form state, validation, and displays error messages from the backend.
// On successful registration, it redirects to the login page.
//
// Key concepts:
// - useState for form fields and error handling
// - useNavigate for page redirection
// - Calls registerUser from authApi.js to send data to backend

export default function Register() {
  const [form, setForm] = useState({ username: '', email: '', password: '' }); // State for form fields
  const [error, setError] = useState(''); // State for error messages
  const { login } = useAuth(); // Access login function from AuthContext
  const navigate = useNavigate(); // Hook for navigation

  // Update form state when input fields change
  const handleChange = e => setForm({ ...form, [e.target.name]: e.target.value });

  // Handle form submission
  const handleSubmit = async e => {
    e.preventDefault(); // Prevent default form submission behavior
    setError(''); // Clear previous error messages
    const res = await register(form); // Call register function to send data to backend
    if (res.message === 'User registered successfully') {
      // Auto-login after register
      const loginRes = await fetch(`${import.meta.env.VITE_API_URL}/api/auth/login/`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username: form.username, password: form.password })
      });
      const loginData = await loginRes.json();
      if (loginData.access) {
        login({ username: form.username }, loginData.access); // Save login data in context
        navigate('/dashboard'); // Redirect to dashboard
      } else {
        setError(loginData.detail || loginData.message || 'Login failed after registration'); // Handle login error
      }
    } else {
      // Log full response for debugging
      console.log('Registration error response:', res);
      // Show backend error message if available
      if (typeof res.message === 'string') {
        setError(res.message);
      } else if (Array.isArray(res.username)) {
        setError(res.username[0]);
      } else if (Array.isArray(res.email)) {
        setError(res.email[0]);
      } else if (res.detail) {
        setError(res.detail);
      } else {
        setError('Registration failed');
      }
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <form className="bg-white p-8 rounded shadow w-80" onSubmit={handleSubmit}>
        <h2 className="text-2xl font-bold mb-4">Register</h2>
        <input name="username" type="text" placeholder="Username" value={form.username} onChange={handleChange} className="mb-2 w-full p-2 border rounded" required />
        <input name="email" type="email" placeholder="Email" value={form.email} onChange={handleChange} className="mb-2 w-full p-2 border rounded" required />
        <input name="password" type="password" placeholder="Password" value={form.password} onChange={handleChange} className="mb-4 w-full p-2 border rounded" required />
        {error && <div className="text-red-500 mb-2">{error}</div>}
        <button className="bg-blue-500 text-white w-full py-2 rounded hover:bg-blue-600">Register</button>
        <div className="mt-2 text-sm">Already have an account? <a href="/login" className="text-blue-500">Login</a></div>
      </form>
    </div>
  );
}
