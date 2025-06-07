from pydantic import BaseModel
from datetime import datetime
from typing import List, Optional
from enum import Enum

# Task Status Enum for API
class TaskStatusEnum(str, Enum):
    TODO = "todo"
    IN_PROGRESS = "in_progress"
    CODE_REVIEW = "code_review"
    TESTING = "testing"
    DONE = "done"

# Base Schemas
class ProjectBase(BaseModel):
    name: str
    description: Optional[str] = None

class TaskBase(BaseModel):
    title: str
    description: Optional[str] = None
    status: TaskStatusEnum = TaskStatusEnum.TODO

class CommentBase(BaseModel):
    content: str

class FileBase(BaseModel):
    filename: str

# Request Schemas (for creating)
class ProjectCreate(ProjectBase):
    pass

class TaskCreate(TaskBase):
    project_id: int

class CommentCreate(CommentBase):
    pass

class TaskStatusUpdate(BaseModel):
    status: TaskStatusEnum

# Response Schemas (for returning data)
class Comment(CommentBase):
    id: int
    task_id: int
    created_at: datetime
    
    class Config:
        from_attributes = True

class File(FileBase):
    id: int
    task_id: int
    file_path: str
    uploaded_at: datetime
    
    class Config:
        from_attributes = True

class Task(TaskBase):
    id: int
    project_id: int
    created_at: datetime
    updated_at: datetime
    comments: List[Comment] = []
    files: List[File] = []
    
    class Config:
        from_attributes = True

class Project(ProjectBase):
    id: int
    created_at: datetime
    tasks: List[Task] = []
    
    class Config:
        from_attributes = True

# Simplified schemas without relationships (for listing)
class TaskSimple(BaseModel):
    id: int
    title: str
    description: Optional[str]
    status: TaskStatusEnum
    project_id: int
    created_at: datetime
    updated_at: datetime
    
    class Config:
        from_attributes = True

class ProjectSimple(BaseModel):
    id: int
    name: str
    description: Optional[str]
    created_at: datetime
    
    class Config:
        from_attributes = True