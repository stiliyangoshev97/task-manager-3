// Task-related API functions
const API_URL = import.meta.env.VITE_API_URL;

export async function getTasks(token) {
  const res = await fetch(`${API_URL}/api/tasks/`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return res.json();
}

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
