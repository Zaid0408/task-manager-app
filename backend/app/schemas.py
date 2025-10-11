from pydantic import BaseModel
from datetime import datetime, date
from typing import List, Optional
from enum import Enum
# This file defines how data is sent to and from your API
# Task Status Enum for API
class TaskStatusEnum(str, Enum):
    TODO = "TODO"
    IN_PROGRESS = "IN_PROGRESS"
    CODE_REVIEW = "CODE_REVIEW"
    TESTING = "TESTING"
    DONE = "DONE"

class TaskPriorityEnum(str, Enum):
    HIGH = "HIGH"
    MEDIUM = "MEDIUM"
    LOW = "LOW"

# Base Schemas (what you need to create something):
# define the minimum information needed to create a project or task
class ProjectBase(BaseModel):
    name: str
    description: Optional[str] = None

class TaskBase(BaseModel):
    title: str
    description: Optional[str] = None
    status: TaskStatusEnum = TaskStatusEnum.TODO
    priority: TaskPriorityEnum = TaskPriorityEnum.MEDIUM
    due_date: Optional[date] = None

class CommentBase(BaseModel):
    content: str

class FileBase(BaseModel):
    filename: str

# Request Schemas (for creating new items):
class ProjectCreate(ProjectBase):
    pass

class TaskCreate(TaskBase):
    project_id: int

class CommentCreate(CommentBase):
    task_id: int
    pass

class TaskStatusUpdate(BaseModel):
    status: TaskStatusEnum

# Response Schemas (for returning data) (what you get back from the API):
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

# Simplified schemas without relationships (for listing): These are simplified versions used when listing items
class TaskSimple(BaseModel):
    id: int
    title: str
    description: Optional[str]
    status: TaskStatusEnum
    priority: TaskPriorityEnum
    due_date: Optional[date]
    project_id: int
    project_name: str
    created_at: datetime
    
    class Config:
        from_attributes = True

class ProjectSimple(BaseModel):
    id: int
    name: str
    description: Optional[str]
    created_at: datetime
    
    class Config:
        from_attributes = True