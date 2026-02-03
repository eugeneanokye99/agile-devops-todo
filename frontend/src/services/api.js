const API_URL = "http://localhost:8000/api";

export async function getTasks() {
  const response = await fetch(`${API_URL}/tasks/`);
  if (!response.ok) {
    throw new Error("Failed to fetch tasks");
  }
  return response.json();
}
