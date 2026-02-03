function TaskItem({ task, onToggleComplete }) {
  function handleToggle() {
    onToggleComplete(task.id, !task.completed);
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
    </li>
  );
}

export default TaskItem;
