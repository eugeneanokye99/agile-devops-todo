import { useState } from "react";

function TaskForm({ onTaskAdded }) {
  const [title, setTitle] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  async function handleSubmit(e) {
    e.preventDefault();
    
    const trimmedTitle = title.trim();
    if (!trimmedTitle) {
      setError("Task title cannot be empty");
      return;
    }
    
    setError("");

    try {
      await onTaskAdded(trimmedTitle);
      setTitle("");
      setSuccess("Task added successfully");
      setTimeout(() => setSuccess(""), 3000);
    } catch (err) {
      setError("Failed to add task");
    }
  }

  function handleChange(e) {
    setTitle(e.target.value);
    if (error) {
      setError("");
    }
  }

  return (
    <form className="task-form" onSubmit={handleSubmit}>
      <div className="input-wrapper">
        <input
          type="text"
          className={`task-input ${error ? "input-error" : ""}`}
          placeholder="Enter a new task..."
          value={title}
          onChange={handleChange}
        />
        {error && <span className="error-message">{error}</span>}
        {success && <span className="success-message">{success}</span>}
      </div>
      <button type="submit" className="task-button">
        Add Task
      </button>
    </form>
  );
}

export default TaskForm;
