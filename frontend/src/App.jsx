import { useState, useEffect } from "react";
import TaskList from "./components/TaskList";
import { getTasks } from "./services/api";
import "./App.css";

function App() {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchTasks();
  }, []);

  async function fetchTasks() {
    try {
      setLoading(true);
      const data = await getTasks();
      setTasks(data);
      setError(null);
    } catch (err) {
      setError("Failed to load tasks");
    } finally {
      setLoading(false);
    }
  }

  if (loading) {
    return <div className="container">Loading...</div>;
  }

  if (error) {
    return <div className="container">{error}</div>;
  }

  return (
    <div className="container">
      <h1>SimpleTodo</h1>
      <TaskList tasks={tasks} />
    </div>
  );
}

export default App;
