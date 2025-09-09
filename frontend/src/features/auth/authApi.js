// authApi.js - Handles authentication API requests
// This file contains functions for user registration, login, and token management.
// It communicates with the Django backend using fetch and manages JWT tokens in localStorage.
//
// Key concepts:
// - registerUser: sends registration data to backend
// - loginUser: sends login data and receives JWT token
// - getToken: retrieves JWT token from localStorage
// - Handles backend error messages for user feedback

// Auth-related API functions
const API_URL = import.meta.env.VITE_API_URL;

export async function register(data) {
  const res = await fetch(`${API_URL}/api/auth/register/`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });
  return res.json();
}

export async function login(data) {
  const res = await fetch(`${API_URL}/api/auth/login/`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });
  return res.json(); // returns { access, refresh }
}
