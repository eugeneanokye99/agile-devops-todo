function TaskList({ tasks }) {
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
