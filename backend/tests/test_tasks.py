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
