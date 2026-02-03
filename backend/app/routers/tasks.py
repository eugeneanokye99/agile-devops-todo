from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from typing import List
from app.database import get_db
from app.models.task import Task
from app.schemas.task import TaskResponse
from app.logging_config import logger

router = APIRouter(prefix="/api/tasks", tags=["tasks"])

@router.get("/", response_model=List[TaskResponse])
def get_tasks(db: Session = Depends(get_db)):
    logger.info("Fetching all tasks")
    tasks = db.query(Task).order_by(Task.created_at).all()
    logger.info(f"Retrieved {len(tasks)} tasks")
    return tasks
