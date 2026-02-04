import { useState } from "react";

function TaskItem({ task, onToggleComplete, onDelete, onEdit, isEditing, onEditStart, onEditCancel }) {
  const [editTitle, setEditTitle] = useState(task.title);
  const [error, setError] = useState("");

  function handleToggle() {
    onToggleComplete(task.id, !task.completed);
  }

  function handleDelete() {
    onDelete(task.id);
  }

  function handleDoubleClick() {
    if (!isEditing) {
      setEditTitle(task.title);
      setError("");
      onEditStart(task.id);
    }
  }

  function handleSave() {
    const trimmedTitle = editTitle.trim();
    if (!trimmedTitle) {
      setError("Title cannot be empty");
      return;
    }
    
    setError("");
    onEdit(task.id, trimmedTitle);
  }

  function handleCancel() {
    setEditTitle(task.title);
    setError("");
    onEditCancel();
  }

  function handleKeyDown(e) {
    if (e.key === "Enter") {
      handleSave();
    } else if (e.key === "Escape") {
      handleCancel();
    }
  }

  function handleChange(e) {
    setEditTitle(e.target.value);
    if (error) {
      setError("");
    }
  }

  if (isEditing) {
    return (
      <li className="task-item editing">
        <div className="edit-wrapper">
          <input
            type="text"
            className={`edit-input ${error ? "input-error" : ""}`}
            value={editTitle}
            onChange={handleChange}
            onKeyDown={handleKeyDown}
            autoFocus
          />
          {error && <span className="error-message">{error}</span>}
        </div>
        <div className="edit-actions">
          <button className="save-button" onClick={handleSave}>
            Save
          </button>
          <button className="cancel-button" onClick={handleCancel}>
            Cancel
          </button>
        </div>
      </li>
    );
  }

  return (
    <li className="task-item">
      <input
        type="checkbox"
        className="task-checkbox"
        checked={task.completed}
        onChange={handleToggle}
      />
      <span 
        className={task.completed ? "task-title completed" : "task-title"}
        onDoubleClick={handleDoubleClick}
      >
        {task.title}
      </span>
      <button className="delete-button" onClick={handleDelete}>
        Delete
      </button>
    </li>
  );
}

export default TaskItem;
