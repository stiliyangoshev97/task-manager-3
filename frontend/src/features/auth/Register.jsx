import { useState } from 'react';
import { register } from './authApi.js';
import { useAuth } from '../../context/AuthContext.jsx';
import { useNavigate } from 'react-router-dom';

export default function Register() {
  const [form, setForm] = useState({ username: '', email: '', password: '' });
  const [error, setError] = useState('');
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleChange = e => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async e => {
    e.preventDefault();
    setError('');
    const res = await register(form);
    if (res.message === 'User registered successfully') {
      // Auto-login after register
      const loginRes = await fetch(`${import.meta.env.VITE_API_URL}/api/auth/login/`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username: form.username, password: form.password })
      });
      const loginData = await loginRes.json();
      if (loginData.access) {
        login({ username: form.username }, loginData.access);
        navigate('/dashboard');
      } else {
        setError(loginData.detail || loginData.message || 'Login failed after registration');
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
