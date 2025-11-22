from sqlalchemy import Column, Integer, String, Text, DateTime, ForeignKey, Enum, Date
from sqlalchemy.orm import relationship
from sqlalchemy.sql import func
from enum import Enum as PyEnum
from .database import Base
# defines how data is stored in the database
# Task Status Enum
class TaskStatus(PyEnum):
    TODO = "TODO"
    IN_PROGRESS = "IN_PROGRESS"
    CODE_REVIEW = "CODE_REVIEW"
    DONE = "DONE"

class TaskPriority(PyEnum):
    HIGH = "HIGH"
    MEDIUM = "MEDIUM"
    LOW = "LOW"

# Projects Table
# This class defines the 'projects' table. By inheriting from 'Base',
# we are telling SQLAlchemy, "Register this blueprint in the catalog."
# By making them inherit from the Base catalog we just created, we are automatically adding these blueprints to our catalog.
class Project(Base):
    __tablename__ = "projects"
    
    id = Column(Integer, primary_key=True, index=True)
    name = Column(String(100), nullable=False)
    description = Column(Text)
    created_at = Column(DateTime(timezone=True), server_default=func.now())
    
    # Relationship to tasks
    tasks = relationship("Task", back_populates="project")

# Tasks Table
# This class defines the 'tasks' table and is also registered in the 'Base' catalog.
# Added priority and due date 
class Task(Base):
    __tablename__ = "tasks"
    
    id = Column(Integer, primary_key=True, index=True)
    title = Column(String(200), nullable=False)
    description = Column(Text)
    status = Column(Enum(TaskStatus), default=TaskStatus.TODO)
    priority = Column(Enum(TaskPriority), default=TaskPriority.MEDIUM)
    due_date = Column(Date)
    project_id = Column(Integer, ForeignKey("projects.id"))
    created_at = Column(DateTime(timezone=True), server_default=func.now())
    updated_at = Column(DateTime(timezone=True), server_default=func.now(), onupdate=func.now())
    
    # Relationships
    project = relationship("Project", back_populates="tasks")
    comments = relationship("Comment", back_populates="task")
    files = relationship("File", back_populates="task")

# Users Table 
# This class defines the 'tasks' table and is also registered in the 'Base' catalog.
# Key fields include email and hashed password which will hash the password and store it in the db
class User(Base):
    __tablename__="users"
    
    id = Column(Integer, primary_key=True, index=True)
    email = Column(String(255), unique=True, nullable=False)
    hashed_password = Column(String(255), nullable=False)
    name = Column(String(100))
    created_at = Column(DateTime(timezone=True), server_default=func.now())
    
# Comments Table
class Comment(Base):
    __tablename__ = "comments"
    
    id = Column(Integer, primary_key=True, index=True)
    content = Column(Text, nullable=False)
    task_id = Column(Integer, ForeignKey("tasks.id"))
    created_at = Column(DateTime(timezone=True), server_default=func.now())
    
    # Relationship
    task = relationship("Task", back_populates="comments")

# Files Table
class File(Base):
    __tablename__ = "files"
    
    id = Column(Integer, primary_key=True, index=True)
    filename = Column(String(255), nullable=False)
    file_path = Column(String(500), nullable=False)
    task_id = Column(Integer, ForeignKey("tasks.id"))
    uploaded_at = Column(DateTime(timezone=True), server_default=func.now())
    
    # Relationship
    task = relationship("Task", back_populates="files")