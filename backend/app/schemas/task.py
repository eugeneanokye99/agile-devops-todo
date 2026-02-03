from pydantic import BaseModel, field_validator
from datetime import datetime

class TaskCreate(BaseModel):
    title: str

    @field_validator('title')
    @classmethod
    def title_must_not_be_empty(cls, v):
        if not v or not v.strip():
            raise ValueError('Title cannot be empty or whitespace only')
        return v.strip()
    
class TaskResponse(BaseModel):
    id: int
    title: str
    completed: bool
    created_at: datetime

    class Config:
        from_attributes = True
