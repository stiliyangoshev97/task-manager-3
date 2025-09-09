import { useEffect, useState } from 'react';
import { getTasks, addTask, updateTask, deleteTask } from './taskApi.js';
import { useAuth } from '../../context/AuthContext.jsx';
import TaskItem from './TaskItem.jsx';
import TaskForm from './TaskForm.jsx';

// Dashboard.jsx - Main dashboard for tasks
// Displays and manages user tasks
export default function Dashboard() {
  const { user, logout } = useAuth();
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const fetchTasks = async () => {
    setLoading(true);
    setError('');
    const token = localStorage.getItem('token');
    const res = await getTasks(token);
    if (Array.isArray(res)) {
      setTasks(res);
    } else {
      setError(res.message || 'Failed to fetch tasks');
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  const handleAdd = async (data) => {
    const token = localStorage.getItem('token');
    const res = await addTask(data, token);
    if (res.id) {
      setTasks([res, ...tasks]);
    } else {
      setError(res.message || 'Failed to add task');
    }
  };

  const handleUpdate = async (id, data) => {
    const token = localStorage.getItem('token');
    const res = await updateTask(id, data, token);
    if (res.id) {
      setTasks(tasks.map(t => t.id === id ? res : t));
    } else {
      setError(res.message || 'Failed to update task');
    }
  };

  const handleDelete = async (id) => {
    const token = localStorage.getItem('token');
    const res = await deleteTask(id, token);
    if (res.message === 'Task deleted') {
      setTasks(tasks.filter(t => t.id !== id));
    } else {
      setError(res.message || 'Failed to delete task');
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
