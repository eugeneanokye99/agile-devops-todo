import { useState, useEffect } from "react";
import TaskList from "./components/TaskList";
import TaskForm from "./components/TaskForm";
import ErrorMessage from "./components/ErrorMessage";
import { getTasks, createTask, updateTask } from "./services/api";
import { useError } from "./hooks/useError";
import "./App.css";

function App() {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const { error, handleError, clearError } = useError();

  useEffect(() => {
    fetchTasks();
  }, []);

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
      const updatedTask = await updateTask(taskId, completed);
      setTasks(tasks.map((task) =>
        task.id === taskId ? updatedTask : task
      ));
      clearError();
    } catch (err) {
      handleError(err, "Failed to update task");
    }
  }

  if (loading) {
    return <div className="container">Loading...</div>;
  }

  return (
    <div className="container">
      <h1>SimpleTodo</h1>
      <ErrorMessage message={error} onDismiss={clearError} />
      <TaskForm onTaskAdded={handleTaskAdded} />
      <TaskList tasks={tasks} onToggleComplete={handleToggleComplete} />
    </div>
  );
}

export default App;
