def test_get_tasks_empty(client):
    """Test retrieving tasks when database is empty"""
    response = client.get("/api/tasks/")
    
    assert response.status_code == 200
    assert response.json() == []

def test_get_tasks_returns_list(client, test_db):
    """Test retrieving tasks returns a list"""
    response = client.get("/api/tasks/")
    
    assert response.status_code == 200
    assert isinstance(response.json(), list)

def test_create_task_success(client):
    """Test creating a new task"""
    response = client.post("/api/tasks/", json={"title": "Test Task"})
    
    assert response.status_code == 201
    assert response.json()["title"] == "Test Task"
    assert response.json()["completed"] == False
    assert "id" in response.json()

def test_create_task_empty_title(client):
    """Test creating task with empty title fails"""
    response = client.post("/api/tasks/", json={"title": ""})
    
    assert response.status_code == 422

def test_create_task_whitespace_title(client):
    """Test creating task with whitespace only title fails"""
    response = client.post("/api/tasks/", json={"title": "   "})
    
    assert response.status_code == 422

def test_create_task_appears_in_list(client):
    """Test created task appears in task list"""
    client.post("/api/tasks/", json={"title": "New Task"})
    
    response = client.get("/api/tasks/")
    
    assert response.status_code == 200
    assert len(response.json()) == 1
    assert response.json()[0]["title"] == "New Task"

def test_update_task_complete(client):
    """Test marking task as complete"""
    create_response = client.post("/api/tasks/", json={"title": "Test Task"})
    task_id = create_response.json()["id"]
    
    response = client.patch(f"/api/tasks/{task_id}", json={"completed": True})
    
    assert response.status_code == 200
    assert response.json()["completed"] == True

def test_update_task_incomplete(client):
    """Test marking task as incomplete"""
    create_response = client.post("/api/tasks/", json={"title": "Test Task"})
    task_id = create_response.json()["id"]
    
    client.patch(f"/api/tasks/{task_id}", json={"completed": True})
    response = client.patch(f"/api/tasks/{task_id}", json={"completed": False})
    
    assert response.status_code == 200
    assert response.json()["completed"] == False

def test_update_task_not_found(client):
    """Test updating non-existent task returns 404"""
    response = client.patch("/api/tasks/999", json={"completed": True})
    
    assert response.status_code == 404

def test_update_task_persists(client):
    """Test completion status persists"""
    create_response = client.post("/api/tasks/", json={"title": "Test Task"})
    task_id = create_response.json()["id"]
    
    client.patch(f"/api/tasks/{task_id}", json={"completed": True})
    
    response = client.get("/api/tasks/")
    task = next(t for t in response.json() if t["id"] == task_id)
    
    assert task["completed"] == True