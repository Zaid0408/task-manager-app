from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from typing import List

from ..database import get_db
from ..models import Project
from ..schemas import ProjectCreate, Project, ProjectSimple

router=APIRouter()

# Get All Projects
# Takes a database session as a dependency
# Queries all projects from the database

@router.get("/get_projects", response_model=List[ProjectSimple])
async def get_projects(db: Session = Depends(get_db)):
    projects = db.query(Project).all()
    return projects

# Add a new Project
# Takes a database session and a project creation schema as dependencies
# Creates a new project in the database

router.post("/add_project", response_model=Project)
async def add_project(project:ProjectCreate,db:Session = Depends(get_db)):
    db_project = Project(**project.model_dump())
    db.add(project)
    db.commit()
    db.refresh(db_project)
    return db_project

# Get a single project by ID
# Takes a database session and a project ID as dependencies

@router.get("/get_project_by_id/{project_id}", response_model=Project)
async def get_project(project_id :int , db: Session = Depends(get_db)):
    project = db.query(Project).filter(Project.id == project_id).first()
    if not project :
        raise HTTPException(status_code=404, detail="Project not found")
    return project

# Update a Project
# Takes a database session, a project ID, and a project update schema as dependencies
# Updates an existing project in the database

@router.put("/update_project/{project_id}",response_model=Project)
async def update_project(project_id:int, project:ProjectCreate, db: Session = Depends(get_db)):
    project_changed = db.query(Project).filter(Project.id == project_id).first()
    if not project_changed :
        raise HTTPException(status_code=404, detail="Project not found")
    project_changed.name=project.name
    project_changed.description=project.description
    db.commit()
    db.refresh(project_changed)
    return project_changed

# Delete a Project
# Takes a database session, a project ID, and a project update schema as dependencies
# Deletes an existing project in the database

@router.delete("/delete_project/{project_id}", response_model=Project)
async def delete_project(project_id: int, db: Session = Depends(get_db)):
    project_to_delete = db.query(Project).filter(Project.id==project_id).first()
    if not project_to_delete :
        raise HTTPException(status_code=404, detail="Project not found")
    db.delete(project_to_delete)
    db.commit()
    return project_to_delete