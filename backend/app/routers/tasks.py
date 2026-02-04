from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from typing import List
from app.db.database import get_db
from app.models.task import Task
from app.schemas.task import TaskCreate, TaskUpdate, TaskResponse
from app.logging.logging_config import logger

router = APIRouter(prefix="/api/tasks", tags=["tasks"])

@router.get("/", response_model=List[TaskResponse])
def get_tasks(db: Session = Depends(get_db)):
    logger.info("Fetching all tasks")
    tasks = db.query(Task).order_by(Task.created_at).all()
    logger.info(f"Retrieved {len(tasks)} tasks")
    return tasks

@router.post("/", response_model=TaskResponse, status_code=201)
def create_task(task: TaskCreate, db: Session = Depends(get_db)):
    logger.info(f"Creating new task: {task.title}")
    
    new_task = Task(title=task.title)
    db.add(new_task)
    db.commit()
    db.refresh(new_task)
    
    logger.info(f"Task created with id: {new_task.id}")
    return new_task

@router.patch("/{task_id}", response_model=TaskResponse)
def update_task(task_id: int, task_update: TaskUpdate, db: Session = Depends(get_db)):
    logger.info(f"Updating task {task_id}")
    
    task = db.query(Task).filter(Task.id == task_id).first()
    if not task:
        logger.error(f"Task {task_id} not found")
        raise HTTPException(status_code=404, detail="Task not found")
    
    if task_update.title is not None:
        task.title = task_update.title
        logger.info(f"Task {task_id} title updated to: {task_update.title}")
    
    if task_update.completed is not None:
        task.completed = task_update.completed
        logger.info(f"Task {task_id} completed status updated to: {task_update.completed}")
    
    db.commit()
    db.refresh(task)
    
    logger.info(f"Task {task_id} updated successfully")
    return task

@router.delete("/{task_id}", status_code=204)
def delete_task(task_id: int, db: Session = Depends(get_db)):
    logger.info(f"Deleting task {task_id}")
    
    task = db.query(Task).filter(Task.id == task_id).first()
    if not task:
        logger.error(f"Task {task_id} not found")
        raise HTTPException(status_code=404, detail="Task not found")
    
    db.delete(task)
    db.commit()
    
    logger.info(f"Task {task_id} deleted successfully")
    return None