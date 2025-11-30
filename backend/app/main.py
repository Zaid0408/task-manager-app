from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
import sys
import time 
import logging
from .database import engine, Base  # Import our database models and setup
from .routers import projects, tasks, auth
from .seed_data import seed_database, seed_users

logger = logging.getLogger(__name__)


app = FastAPI(title="Task Manager API", version="1.0.0")

# Enable CORS for React frontend
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# database.py prepares the engine (the connection) and Base (the empty catalog).
# models.py defines the Project and Task blueprints and adds them to the Base catalog.
# main.py uses the startup event to give the final command: create_all, which takes the blueprints from the catalog and builds the tables using the engine's connection.

# Configure logging
import logging
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)
# Include routers
app.include_router(projects.router, tags=["projects"]) # Changed path of the APIs
app.include_router(tasks.router, tags=["tasks"])
app.include_router(auth.router, tags=["auth"])

@app.get("/")
async def root():
    return {
        "message": "Task Manager API is running!",
        "python_version": sys.version,
        "python_executable": sys.executable
    }

# we need to tell our application to actually build these tables. We have the connection, and we have the catalog full of blueprints. 
# The last step is to give the "build" command.
# This is a special FastAPI event handler.
# The code inside this function will run one time, right after the application starts.
@app.on_event("startup")
async def startup_event():
    logger.info("🚀 Task Manager API is starting up!")
    wait_for_db()
    logger.info("�� Creating database tables...")
    # This is the command that builds the tables.
    # Base.metadata: "Look at the catalog of all registered table blueprints."
    # .create_all(): "For each blueprint, check if the table exists in the database. If not, create it."
    # (bind=engine): "Use this specific database connection for the operation."
    Base.metadata.create_all(bind=engine)
    logger.info("📊 Database tables created successfully!")
    logger.info("✅ Database tables created!")

# Seed database
    logger.info("🌱 Starting database seeding...")
    try:
        seed_users()
        seed_database()
        logger.info("✅ Database seeding completed!")
    except Exception as e:
        logger.error(f"❌ Error seeding database: {e}")
        raise

def wait_for_db():
    time.sleep(5) # wait for 5 seconds when db is deployed 
    max_retries=5 
    for attempt in range(max_retries):
        try:
            engine.connect()
            logger.info("✅ Database is ready!")
            return
        except Exception as e:
            logger.warning(f"⏳ Database not ready, attempt {attempt + 1}/{max_retries}: {e}")
            time.sleep(2)
    raise Exception("Database Connection Failed")

@app.get("/health")
async def health_check():
    return {"status": "healthy", "service": "backend"}

@app.get("/test")
async def test_endpoint():
    return {"message": "Test endpoint working", "backend": "connected"}