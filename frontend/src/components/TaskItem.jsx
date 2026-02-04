function TaskItem({ task, onToggleComplete, onDelete }) {
  function handleToggle() {
    onToggleComplete(task.id, !task.completed);
  }

  function handleDelete() {
    onDelete(task.id);
  }

  return (
    <li className="task-item">
      <input
        type="checkbox"
        className="task-checkbox"
        checked={task.completed}
        onChange={handleToggle}
      />
      <span className={task.completed ? "task-title completed" : "task-title"}>
        {task.title}
      </span>
      <button className="delete-button" onClick={handleDelete}>
        Delete
      </button>
    </li>
  );
}

export default TaskItem;
