import { useState, useEffect } from "react";
import TaskList from "./components/TaskList";
import TaskForm from "./components/TaskForm";
import TaskFilter from "./components/TaskFilter";
import ErrorMessage from "./components/ErrorMessage";
import { getTasks, createTask, updateTask, deleteTask } from "./services/api";
import { useError } from "./hooks/useError";
import "./App.css";

function App() {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState(() => {
    return sessionStorage.getItem('taskFilter') || 'all';
  });
  const [editingTaskId, setEditingTaskId] = useState(null);
  const { error, handleError, clearError } = useError();

  useEffect(() => {
    fetchTasks();
  }, []);

  useEffect(() => {
    sessionStorage.setItem('taskFilter', filter);
  }, [filter]);

  async function fetchTasks() {
    try {
      setLoading(true);
      const data = await getTasks();
      setTasks(data);
      clearError();
    } catch (err) {
      handleError(err, "Failed to load tasks");
    } finally {
      setLoading(false);
    }
  }

  async function handleTaskAdded(title) {
    try {
      const newTask = await createTask(title);
      setTasks([...tasks, newTask]);
      clearError();
      return newTask;
    } catch (err) {
      handleError(err, "Failed to add task");
      throw err;
    }
  }

  async function handleToggleComplete(taskId, completed) {
    try {
      const updatedTask = await updateTask(taskId, { completed });
      setTasks(tasks.map((task) =>
        task.id === taskId ? updatedTask : task
      ));
      clearError();
    } catch (err) {
      handleError(err, "Failed to update task");
    }
  }

  async function handleDelete(taskId) {
    try {
      await deleteTask(taskId);
      setTasks(tasks.filter((task) => task.id !== taskId));
      clearError();
    } catch (err) {
      handleError(err, "Failed to delete task");
    }
  }

  async function handleEdit(taskId, newTitle) {
    try {
      const updatedTask = await updateTask(taskId, { title: newTitle });
      setTasks(tasks.map((task) =>
        task.id === taskId ? updatedTask : task
      ));
      setEditingTaskId(null);
      clearError();
    } catch (err) {
      handleError(err, "Failed to update task");
    }
  }

  function handleEditStart(taskId) {
    setEditingTaskId(taskId);
  }

  function handleEditCancel() {
    setEditingTaskId(null);
  }

  function getFilteredTasks() {
    switch (filter) {
      case 'active':
        return tasks.filter(task => !task.completed);
      case 'completed':
        return tasks.filter(task => task.completed);
      default:
        return tasks;
    }
  }

  function getTaskCounts() {
    return {
      all: tasks.length,
      active: tasks.filter(task => !task.completed).length,
      completed: tasks.filter(task => task.completed).length
    };
  }

  if (loading) {
    return <div className="container">Loading...</div>;
  }

  const filteredTasks = getFilteredTasks();
  const taskCounts = getTaskCounts();

  return (
    <div className="container">
      <h1>SimpleTodo</h1>
      <ErrorMessage message={error} onDismiss={clearError} />
      <TaskForm onTaskAdded={handleTaskAdded} />
      <TaskFilter 
        currentFilter={filter}
        onFilterChange={setFilter}
        taskCounts={taskCounts}
      />
      <TaskList 
        tasks={filteredTasks} 
        onToggleComplete={handleToggleComplete}
        onDelete={handleDelete}
        onEdit={handleEdit}
        editingTaskId={editingTaskId}
        onEditStart={handleEditStart}
        onEditCancel={handleEditCancel}
      />
    </div>
  );
}

export default App;
