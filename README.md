# SimpleTodo

A simple and intuitive Todo application that allows users to create, update, and delete tasks while demonstrating Agile and DevOps best practices.

## 📋 Project Documentation

- [Sprint 1 Documentation](./SPRINT_1.md)
- [Sprint 2 Documentation](./SPRINT_2.md)
- [Testing Documentation](./TESTING.md)

## Tech Stack

- **Frontend:** React with Vite
- **Backend:** FastAPI
- **Database:** PostgreSQL
- **Containerization:** Docker

## Features

- **Task Management:** Create, view, complete, edit, and delete tasks
- **Inline Editing:** Double-click any task to edit its title in place
- **Task Filtering:** Filter tasks by status (All, Active, Completed)
- **Data Persistence:** All tasks persist across browser sessions
- **Real-time Updates:** Task list updates immediately on all actions
- **Keyboard Shortcuts:** Use Enter to save and Escape to cancel when editing
- **Error Handling:** User-friendly error messages for all operations

## Getting Started

### Prerequisites

- Docker and Docker Compose installed

### Running the Application

1. Clone the repository
2. Navigate to project root
3. Run the following command:

```bash
docker-compose up --build
```

4. Access the application:
   - Frontend: http://localhost:5173
   - Backend API: http://localhost:8000
   - API Documentation: http://localhost:8000/docs

## API Endpoints

### Tasks

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | /api/tasks/ | Retrieve all tasks |
| POST | /api/tasks/ | Create a new task |
| PATCH | /api/tasks/{id} | Update task completion status |
| DELETE | /api/tasks/{id} | Delete a task |

### GET /api/tasks/

Retrieves all tasks ordered by creation date.

**Response:**

```json
[
  {
    "id": 1,
    "title": "Task title",
    "completed": false,
    "created_at": "2025-01-15T10:30:00Z"
  }
]
```

**Empty Response:**

```json
[]
```

### POST /api/tasks/

Creates a new task.

**Request Body:**

```json
{
  "title": "Task title"
}
```

**Success Response (201 Created):**

```json
{
  "id": 1,
  "title": "Task title",
  "completed": false,
  "created_at": "2025-01-15T10:30:00Z"
}
```

**Error Response (422 Unprocessable Entity):**

```json
{
  "detail": [
    {
      "loc": ["body", "title"],
      "msg": "Title cannot be empty or whitespace only",
      "type": "value_error"
    }
  ]
}
```

### PATCH /api/tasks/{id}

Updates the completion status of a task.

**Path Parameters:**

- `id` (integer): The ID of the task to update

**Request Body:**

```json
{
  "completed": true
}
```

**Success Response (200 OK):**

```json
{
  "id": 1,
  "title": "Task title",
  "completed": true,
  "created_at": "2025-01-15T10:30:00Z"
}
```

**Error Response (404 Not Found):**

```json
{
  "detail": "Task not found"
}
```


### DELETE /api/tasks/{id}

Deletes a task permanently.

**Path Parameters:**

- `id` (integer): The ID of the task to delete

**Success Response (204 No Content):**

No response body

**Error Response (404 Not Found):**

```json
{
  "detail": "Task not found"
}
```


### PATCH /api/tasks/{id}

Updates a task's completion status or title.

**Path Parameters:**

- `id` (integer): The ID of the task to update

**Request Body (Update Completion Status):**

```json
{
  "completed": true
}
```

**Request Body (Update Title):**

```json
{
  "title": "Updated task title"
}
```

**Request Body (Update Both):**

```json
{
  "title": "Updated task title",
  "completed": true
}
```

**Success Response (200 OK):**

```json
{
  "id": 1,
  "title": "Updated task title",
  "completed": true,
  "created_at": "2025-01-15T10:30:00Z"
}
```

**Error Response (404 Not Found):**

```json
{
  "detail": "Task not found"
}
```

**Error Response (422 Unprocessable Entity - Empty Title):**

```json
{
  "detail": [
    {
      "loc": ["body", "title"],
      "msg": "Title cannot be empty or whitespace only",
      "type": "value_error"
    }
  ]
}
```
