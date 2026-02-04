from pydantic import BaseModel, field_validator
from datetime import datetime
from typing import Optional

class TaskCreate(BaseModel):
    title: str

    @field_validator('title')
    @classmethod
    def title_must_not_be_empty(cls, v):
        if not v or not v.strip():
            raise ValueError('Title cannot be empty or whitespace only')
        return v.strip()
    
class TaskUpdate(BaseModel):
    title: Optional[str] = None
    completed: Optional[bool] = None

    @field_validator('title')
    @classmethod
    def title_must_not_be_empty(cls, v):
        if v is not None and (not v or not v.strip()):
            raise ValueError('Title cannot be empty or whitespace only')
        return v.strip() if v else v
    
class TaskResponse(BaseModel):
    id: int
    title: str
    completed: bool
    created_at: datetime

    class Config:
        from_attributes = True
