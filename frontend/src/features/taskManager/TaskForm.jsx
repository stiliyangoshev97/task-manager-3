import { useState } from 'react';

// TaskForm.jsx - Form for adding or editing a task
// This component lets users create a new task or update an existing one.
// It manages form state and handles submission.
//
// Key concepts:
// - useState for form fields (title, description, status)
// - Handles both add and edit modes based on props
// - Calls onSubmit to send data to parent (Dashboard.jsx)

export default function TaskForm({ onAdd }) {
  // useState hook to manage form state with initial values for title and description
  const [form, setForm] = useState({ title: '', description: '' });

  // Updates the form state when input fields change
  const handleChange = e => setForm({ ...form, [e.target.name]: e.target.value });

  // Handles form submission
  const handleSubmit = e => {
    e.preventDefault(); // Prevents default form submission behavior
    if (!form.title) return; // Ensures the title field is not empty
    onAdd(form); // Calls the onAdd function passed as a prop with the form data
    setForm({ title: '', description: '' }); // Resets the form fields
  };

  return (
    <form onSubmit={handleSubmit} className="mb-4 flex gap-2">
      {/* Input field for task title */}
      <input name="title" value={form.title} onChange={handleChange} placeholder="Task title" className="p-2 border rounded w-1/3" required />
      {/* Input field for task description */}
      <input name="description" value={form.description} onChange={handleChange} placeholder="Description" className="p-2 border rounded w-1/2" />
      {/* Submit button */}
      <button className="bg-blue-500 text-white px-4 py-2 rounded">Add</button>
    </form>
  );
}
