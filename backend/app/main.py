from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
import sys

app = FastAPI(title="Task Manager API", version="1.0.0")

# Enable CORS for React frontend
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/")
async def root():
    return {
        "message": "Task Manager API is running!",
        "python_version": sys.version,
        "python_executable": sys.executable
    }

@app.get("/health")
async def health_check():
    return {"status": "healthy", "service": "backend"}