// taskApi.js - Handles task management API requests
// This file contains functions for CRUD operations on tasks (create, read, update, delete).
// It communicates with the Django backend using fetch and includes JWT token for authentication.
//
// Key concepts:
// - getTasks: fetches all tasks for the user
// - createTask: adds a new task
// - updateTask: edits an existing task
// - deleteTask: removes a task
// - Uses 'id' field for task identification (Django convention)

// Task-related API functions
const API_URL = import.meta.env.VITE_API_URL;

// Fetches all tasks for the user
export async function getTasks(token) {
  const res = await fetch(`${API_URL}/api/tasks/`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return res.json();
}

// Adds a new task
export async function addTask(data, token) {
  const res = await fetch(`${API_URL}/api/tasks/`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(data),
  });
  return res.json();
}

// Edits an existing task
export async function updateTask(id, data, token) {
  const res = await fetch(`${API_URL}/api/tasks/${id}/`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(data),
  });
  return res.json();
}

// Removes a task
export async function deleteTask(id, token) {
  const res = await fetch(`${API_URL}/api/tasks/${id}/`, {
    method: 'DELETE',
    headers: { Authorization: `Bearer ${token}` },
  });
  // Django returns 204 No Content, so don't parse JSON
  if (res.status === 204) {
    return { message: 'Task deleted' };
  }
  try {
    return await res.json();
  } catch {
    return { message: 'Task deleted' };
  }
}
