import { useState } from 'react';
import { login as loginApi } from './authApi.js';
import { useAuth } from '../../context/AuthContext.jsx';
import { useNavigate } from 'react-router-dom';

// Login.jsx - User login form
// This component allows users to log in with their credentials (username/email and password).
// It manages form state, error messages, and handles authentication.
// On successful login, it stores the JWT token and redirects to the dashboard.
//
// Key concepts:
// - useState for form fields and error handling
// - useContext to access AuthContext for authentication
// - useNavigate for page redirection
// - Calls loginUser from authApi.js to send login data to backend

export default function Login() {
  const [form, setForm] = useState({ username: '', password: '' }); // State to manage form inputs
  const [error, setError] = useState(''); // State to manage error messages
  const { login } = useAuth(); // Access login function from AuthContext
  const navigate = useNavigate(); // Hook to navigate to different routes

  // Update form state when input fields change
  const handleChange = e => setForm({ ...form, [e.target.name]: e.target.value });

  // Handle form submission
  const handleSubmit = async e => {
    e.preventDefault(); // Prevent default form submission behavior
    setError(''); // Clear any previous error messages
    const res = await loginApi(form); // Call API to authenticate user
    if (res.access) {
      login({ username: form.username }, res.access); // Store username and access token
      navigate('/dashboard'); // Redirect to dashboard on successful login
    } else {
      setError(res.detail || res.message || 'Login failed'); // Display error message
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <form className="bg-white p-8 rounded shadow w-80" onSubmit={handleSubmit}>
        <h2 className="text-2xl font-bold mb-4">Login</h2>
        <input name="username" type="text" placeholder="Username" value={form.username} onChange={handleChange} className="mb-2 w-full p-2 border rounded" required />
        <input name="password" type="password" placeholder="Password" value={form.password} onChange={handleChange} className="mb-4 w-full p-2 border rounded" required />
        {error && <div className="text-red-500 mb-2">{error}</div>}
        <button className="bg-blue-500 text-white w-full py-2 rounded hover:bg-blue-600">Login</button>
        <div className="mt-2 text-sm">Don't have an account? <a href="/register" className="text-blue-500">Register</a></div>
      </form>
    </div>
  );
}
