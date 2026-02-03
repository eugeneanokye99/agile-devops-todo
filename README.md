# SimpleTodo

A simple and intuitive Todo application that allows users to create, update, and delete tasks while demonstrating Agile and DevOps best practices.

## Tech Stack

- **Frontend:** React with Vite
- **Backend:** FastAPI
- **Database:** PostgreSQL
- **Containerization:** Docker

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
