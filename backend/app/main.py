from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
import sys

# Import our database models and setup
from .database import engine, Base
from .routers import projects, tasks

app = FastAPI(title="Task Manager API", version="1.0.0")

# Enable CORS for React frontend
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)
# Configure logging
import logging
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)
# Include routers
app.include_router(projects.router, prefix="/api/projects", tags=["projects"])
app.include_router(tasks.router, prefix="/api/tasks", tags=["tasks"])

@app.get("/")
async def root():
    return {
        "message": "Task Manager API is running!",
        "python_version": sys.version,
        "python_executable": sys.executable
    }

@app.on_event("startup")
async def startup_event():
    logger.info("🚀 Task Manager API is starting up!")
    logger.info("📊 Database tables created successfully!")


@app.get("/health")
async def health_check():
    return {"status": "healthy", "service": "backend"}

@app.get("/test")
async def test_endpoint():
    return {"message": "Test endpoint working", "backend": "connected"}