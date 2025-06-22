from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from typing import List

from ..database import get_db
from ..models import Project as ProjectModel
from ..schemas import ProjectCreate, Project as ProjectSchema, ProjectSimple

router=APIRouter(prefix="/projects") # Added projects path and changed api structure

# This file is resposible of handling all the requests to the projects and its different endpoints

# Get All Projects
# Takes a database session as a dependency
# Queries all projects from the database

@router.get("/get_projects", response_model=List[ProjectSimple])
async def get_projects(db: Session = Depends(get_db)):
    projects = db.query(ProjectModel).all()
    return projects

# Add a new Project
# Takes a database session and a project creation schema as dependencies
# Creates a new project in the database

@router.post("/add_project", response_model=ProjectSchema)
async def add_project(project:ProjectCreate,db:Session = Depends(get_db)):
    # project.model_dump() converts the incoming Pydantic model (from the request body) into a dictionary.
    # The ** operator unpacks this dictionary, so ProjectModel(**{'name': '...'}) becomes ProjectModel(name='...').
    # This creates a new SQLAlchemy model instance ready for the database.
    db_project = ProjectModel(**project.model_dump())
    db.add(db_project)      # Stages the new 'db_project' instance to be saved. This does NOT save it to the DB yet.
    db.commit()            # Commits the transaction. All staged changes (like our new project) are now saved permanently.
    db.refresh(db_project) # Refreshes the 'db_project' Python object with new data from the DB (like the auto-generated ID).
    return db_project
    # When you commit the new project, the database itself creates the id and the created_at timestamp. 
    # Your Python object db_project doesn't know about these new values yet. db.refresh() updates your Python object with this fresh data from the database.

# Get a single project by ID
# Takes a database session and a project ID as dependencies

@router.get("/get_project_by_id/{project_id}", response_model=ProjectSchema)
async def get_project(project_id :int , db: Session = Depends(get_db)):
    project = db.query(ProjectModel).filter(ProjectModel.id == project_id).first()
    if not project :
        raise HTTPException(status_code=404, detail="Project not found")
    return project

# Update a Project
# Takes a database session, a project ID, and a project update schema as dependencies
# Updates an existing project in the database

@router.put("/update_project/{project_id}",response_model=ProjectSchema)
async def update_project(project_id:int, project:ProjectCreate, db: Session = Depends(get_db)):
    project_changed = db.query(ProjectModel).filter(ProjectModel.id == project_id).first()
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

@router.delete("/delete_project/{project_id}", response_model=ProjectSchema)
async def delete_project(project_id: int, db: Session = Depends(get_db)):
    project_to_delete = db.query(ProjectModel).filter(ProjectModel.id==project_id).first()
    if not project_to_delete :
        raise HTTPException(status_code=404, detail="Project not found")
    db.delete(project_to_delete)
    db.commit()
    return project_to_delete