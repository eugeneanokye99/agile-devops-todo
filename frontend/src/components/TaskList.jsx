function TaskList({ tasks }) {
  if (tasks.length === 0) {
    return <p className="empty-state">No tasks yet</p>;
  }

  return (
    <ul className="task-list">
      {tasks.map((task) => (
        <li key={task.id} className="task-item">
          <span className={task.completed ? "completed" : ""}>
            {task.title}
          </span>
        </li>
      ))}
    </ul>
  );
}

export default TaskList;
