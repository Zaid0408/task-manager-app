from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from typing import List

from ..database import get_db
from ..models import Task as TaskModel, Comment
from ..schemas import (
    TaskCreate, 
    Task as TaskSchema, 
    TaskSimple, 
    TaskStatusUpdate, 
    Comment as CommentSchema, 
    CommentCreate
)

router=APIRouter(prefix="/tasks") # Added tasks path properly and added new task apis

# This file is resposible of handling all the requests to the tasks and its different endpoints

# Get All Tasks
# Takes a database session as a dependency
# Queries all tasks from the database

@router.get("/get_tasks",response_model=List[TaskSimple])
async def get_tasks(db: Session= Depends(get_db)):
    tasks = db.query(TaskModel).all()
    return tasks

@router.post("/add_tasks",response_model=TaskSchema)
async def add_tasks(task:TaskCreate,db: Session= Depends(get_db)):
    db_task=TaskModel(**task.model_dump())
    db.add(db_task)
    db.commit()
    db.refresh(db_task)
    return db_task

@router.get("/get_task_by_id/{task_id}", response_model=TaskSchema)
async def get_tasks_by_id(task_id : int,db: Session= Depends(get_db)):
    task = db.query(TaskModel).filter(TaskModel.id==task_id).first()
    if not task:
        raise HTTPException(status_code=404, detail="Task not found")
    return task

@router.put("/update_task/{task_id}", response_model=TaskSchema)
async def update_task(task_id : int,updated_task : TaskCreate,db: Session= Depends(get_db)):
    task=db.query(TaskModel).filter(TaskModel.id==task_id).first()
    if not task:
        raise HTTPException(status_code=404, detail="Task not found")
    task.title=updated_task.title if (updated_task.title != None) else task.title
    task.description=updated_task.description if (updated_task.description != None) else task.description
    db.commit()
    db.refresh(task)
    return task

# PATCH:
# Used to apply partial updates to an existing resource. It's typically not idempotent. Since we update status only we use patch
@router.patch("/update_task_status/{task_id}", response_model=TaskSchema)
async def update_task_status(task_id:int, updated_status: TaskStatusUpdate,db: Session= Depends(get_db)):
    task=db.query(TaskModel).filter(TaskModel.id==task_id).first()
    if not task:
        raise HTTPException(status_code=404, detail="Task not found")
    task.status=updated_status.status 
    db.commit()
    db.refresh(task)
    return task
    
    
@router.delete("/delete_task/{task_id}",response_model=TaskSchema)
async def delete_task(task_id:int , db: Session=Depends(get_db)):
    task_to_delete=db.query(TaskModel).filter(TaskModel.id==task_id).first()
    if not task_to_delete:
        raise HTTPException(status_code=404, detail="Task not found")
    db.delete(task_to_delete)
    db.commit()
    return task_to_delete

@router.post("/add_comment/{task_id}", response_model=CommentSchema)
async def add_comment(task_id: int, comment: CommentCreate, db: Session=Depends(get_db)):
    # First, ensure the task exists
    db_task = db.query(TaskModel).filter(TaskModel.id == task_id).first()
    if not db_task:
        raise HTTPException(status_code=404, detail="Task not found")
    # Create the comment with the content from the body and the task_id from the URL
    db_comment=Comment(**comment.model_dump(), task_id=task_id)
    db.add(db_comment)
    db.commit()
    db.refresh(db_comment)
    return db_comment

# @router.post("/add_file/",response_model=)