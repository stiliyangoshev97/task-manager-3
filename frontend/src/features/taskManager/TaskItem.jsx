import { useState } from 'react';

export default function TaskItem({ task, onUpdate, onDelete }) {
  const [editing, setEditing] = useState(false);
  const [form, setForm] = useState({ title: task.title, description: task.description, completed: task.completed });

  const handleChange = e => setForm({ ...form, [e.target.name]: e.target.type === 'checkbox' ? e.target.checked : e.target.value });

  const handleSubmit = e => {
    e.preventDefault();
    onUpdate(task.id, form);
    setEditing(false);
  };

  return (
    <div className={`bg-white p-4 rounded shadow flex flex-col ${form.completed ? 'opacity-60' : ''}`}>
      {editing ? (
        <form onSubmit={handleSubmit} className="space-y-2">
          <input name="title" value={form.title} onChange={handleChange} className="w-full p-2 border rounded" required />
          <input name="description" value={form.description} onChange={handleChange} className="w-full p-2 border rounded" />
          <label className="flex items-center">
            <input name="completed" type="checkbox" checked={form.completed} onChange={handleChange} />
            <span className="ml-2">Completed</span>
          </label>
          <div className="flex gap-2">
            <button className="bg-green-500 text-white px-3 py-1 rounded" type="submit">Save</button>
            <button className="bg-gray-300 px-3 py-1 rounded" type="button" onClick={() => setEditing(false)}>Cancel</button>
          </div>
        </form>
      ) : (
        <div className="flex justify-between items-center">
          <div>
            <div className="font-bold">{task.title}</div>
            <div className="text-sm text-gray-600">{task.description}</div>
            <div className="text-xs text-gray-400">{task.created_at ? new Date(task.created_at).toLocaleString() : ''}</div>
          </div>
          <div className="flex gap-2">
            <button className="bg-blue-500 text-white px-3 py-1 rounded" onClick={() => setEditing(true)}>Edit</button>
            <button className="bg-red-500 text-white px-3 py-1 rounded" onClick={() => onDelete(task.id)}>Delete</button>
          </div>
        </div>
      )}
    </div>
  );
}
