import { useState } from "react";

function TaskForm({ onTaskAdded }) {
  const [title, setTitle] = useState("");
  const [error, setError] = useState("");

  function handleSubmit(e) {
    e.preventDefault();
    
    const trimmedTitle = title.trim();
    if (!trimmedTitle) {
      setError("Task title cannot be empty");
      return;
    }
    
    setError("");
    onTaskAdded(trimmedTitle);
    setTitle("");
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
      </div>
      <button type="submit" className="task-button">
        Add Task
      </button>
    </form>
  );
}

export default TaskForm;
