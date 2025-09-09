import { useEffect, useState } from 'react';
import { getTasks, addTask, updateTask, deleteTask } from './taskApi.js';
import { useAuth } from '../../context/AuthContext.jsx';
import TaskItem from './TaskItem.jsx';
import TaskForm from './TaskForm.jsx';

// Dashboard.jsx - Main page for managing tasks
// This component displays the user's tasks and provides options to add, edit, or delete tasks.
// It fetches tasks from the backend using the JWT token for authentication.
//
// Key concepts:
// - useState for managing tasks and loading/error states
// - useEffect to fetch tasks when the component loads
// - Uses TaskItem and TaskForm components for task display and editing
// - Calls getTasks, createTask, updateTask, deleteTask from taskApi.js

// Dashboard.jsx - Main dashboard for tasks
// Displays and manages user tasks
export default function Dashboard() {
  const { user, logout } = useAuth();
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  // Fetches tasks from the backend when the component loads
  const fetchTasks = async () => {
    setLoading(true);
    setError('');
    const token = localStorage.getItem('token'); // Retrieve JWT token from local storage
    const res = await getTasks(token); // Fetch tasks using the token
    if (Array.isArray(res)) {
      setTasks(res); // Update tasks state if the response is an array
    } else {
      setError(res.message || 'Failed to fetch tasks'); // Set error message if fetching fails
    }
    setLoading(false);
  };

  // useEffect hook to fetch tasks when the component is mounted
  useEffect(() => {
    fetchTasks();
  }, []);

  // Handles adding a new task
  const handleAdd = async (data) => {
    const token = localStorage.getItem('token'); // Retrieve JWT token from local storage
    const res = await addTask(data, token); // Add a new task using the token
    if (res.id) {
      setTasks([res, ...tasks]); // Add the new task to the tasks state
    } else {
      setError(res.message || 'Failed to add task'); // Set error message if adding fails
    }
  };

  // Handles updating an existing task
  const handleUpdate = async (id, data) => {
    const token = localStorage.getItem('token'); // Retrieve JWT token from local storage
    const res = await updateTask(id, data, token); // Update the task using the token
    if (res.id) {
      setTasks(tasks.map(t => t.id === id ? res : t)); // Update the task in the tasks state
    } else {
      setError(res.message || 'Failed to update task'); // Set error message if updating fails
    }
  };

  // Handles deleting a task
  const handleDelete = async (id) => {
    const token = localStorage.getItem('token'); // Retrieve JWT token from local storage
    const res = await deleteTask(id, token); // Delete the task using the token
    if (res.message === 'Task deleted') {
      setTasks(tasks.filter(t => t.id !== id)); // Remove the task from the tasks state
    } else {
      setError(res.message || 'Failed to delete task'); // Set error message if deleting fails
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-4">
      <div className="max-w-xl mx-auto">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-bold">Hello, {user?.username}</h2>
          <button onClick={logout} className="bg-red-500 text-white px-4 py-2 rounded">Logout</button>
        </div>
        <TaskForm onAdd={handleAdd} />
        {error && <div className="text-red-500 mb-2">{error}</div>}
        {loading ? (
          <div>Loading...</div>
        ) : (
          <div className="space-y-2 mt-4">
            {tasks.length === 0 ? (
              <div>No tasks yet.</div>
            ) : (
              tasks.map(task => (
                <TaskItem key={task.id} task={task} onUpdate={handleUpdate} onDelete={handleDelete} />
              ))
            )}
          </div>
        )}
      </div>
    </div>
  );
}
