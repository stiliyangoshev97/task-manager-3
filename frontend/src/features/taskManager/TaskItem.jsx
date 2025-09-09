import { useState } from 'react';

// TaskItem.jsx - Displays a single task
// This component shows the details of a task (title, description, status).
// It provides buttons to edit or delete the task.
//
// Key concepts:
// - Receives task data and handler functions as props
// - Calls onUpdate and onDelete when user interacts with buttons
// - Used by Dashboard.jsx to render each task

export default function TaskItem({ task, onUpdate, onDelete }) {
  const [editing, setEditing] = useState(false); // State to track if the task is being edited
  const [form, setForm] = useState({ title: task.title, description: task.description, completed: task.completed }); // State to manage form inputs

  // Updates the form state when input fields change
  const handleChange = e => setForm({ ...form, [e.target.name]: e.target.type === 'checkbox' ? e.target.checked : e.target.value });

  // Handles form submission to update the task
  const handleSubmit = e => {
    e.preventDefault();
    onUpdate(task.id, form); // Calls the onUpdate function passed as a prop
    setEditing(false); // Exits editing mode
  };

  return (
    <div className={`bg-white p-4 rounded shadow flex flex-col ${form.completed ? 'opacity-60' : ''}`}>
      {editing ? (
        <form onSubmit={handleSubmit} className="space-y-2">
          {/* Input for task title */}
          <input name="title" value={form.title} onChange={handleChange} className="w-full p-2 border rounded" required />
          {/* Input for task description */}
          <input name="description" value={form.description} onChange={handleChange} className="w-full p-2 border rounded" />
          {/* Checkbox for task completion status */}
          <label className="flex items-center">
            <input name="completed" type="checkbox" checked={form.completed} onChange={handleChange} />
            <span className="ml-2">Completed</span>
          </label>
          <div className="flex gap-2">
            {/* Save button */}
            <button className="bg-green-500 text-white px-3 py-1 rounded" type="submit">Save</button>
            {/* Cancel button */}
            <button className="bg-gray-300 px-3 py-1 rounded" type="button" onClick={() => setEditing(false)}>Cancel</button>
          </div>
        </form>
      ) : (
        <div className="flex justify-between items-center">
          <div>
            {/* Display task title */}
            <div className="font-bold">{task.title}</div>
            {/* Display task description */}
            <div className="text-sm text-gray-600">{task.description}</div>
            {/* Display task creation date */}
            <div className="text-xs text-gray-400">{task.created_at ? new Date(task.created_at).toLocaleString() : ''}</div>
          </div>
          <div className="flex gap-2">
            {/* Edit button */}
            <button className="bg-blue-500 text-white px-3 py-1 rounded" onClick={() => setEditing(true)}>Edit</button>
            {/* Delete button */}
            <button className="bg-red-500 text-white px-3 py-1 rounded" onClick={() => onDelete(task.id)}>Delete</button>
          </div>
        </div>
      )}
    </div>
  );
}
