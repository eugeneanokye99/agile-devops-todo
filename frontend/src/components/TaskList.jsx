import TaskItem from "./TaskItem";

function TaskList({ tasks, onToggleComplete }) {
  if (tasks.length === 0) {
    return <p className="empty-state">No tasks yet</p>;
  }

  return (
    <ul className="task-list">
      {tasks.map((task) => (
        <TaskItem
          key={task.id}
          task={task}
          onToggleComplete={onToggleComplete}
        />
      ))}
    </ul>
  );
}

export default TaskList;
