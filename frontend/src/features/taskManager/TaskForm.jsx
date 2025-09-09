import { useState } from 'react';

export default function TaskForm({ onAdd }) {
  const [form, setForm] = useState({ title: '', description: '' });

  const handleChange = e => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = e => {
    e.preventDefault();
    if (!form.title) return;
    onAdd(form);
    setForm({ title: '', description: '' });
  };

  return (
    <form onSubmit={handleSubmit} className="mb-4 flex gap-2">
      <input name="title" value={form.title} onChange={handleChange} placeholder="Task title" className="p-2 border rounded w-1/3" required />
      <input name="description" value={form.description} onChange={handleChange} placeholder="Description" className="p-2 border rounded w-1/2" />
      <button className="bg-blue-500 text-white px-4 py-2 rounded">Add</button>
    </form>
  );
}
