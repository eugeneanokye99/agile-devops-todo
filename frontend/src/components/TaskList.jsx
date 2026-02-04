import TaskItem from "./TaskItem";

function TaskList({ tasks, onToggleComplete, onDelete, onEdit, editingTaskId, onEditStart, onEditCancel }) {
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
          onDelete={onDelete}
          onEdit={onEdit}
          isEditing={editingTaskId === task.id}
          onEditStart={onEditStart}
          onEditCancel={onEditCancel}
        />
      ))}
    </ul>
  );
}

export default TaskList;
