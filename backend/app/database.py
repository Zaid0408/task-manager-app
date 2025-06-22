import os
from sqlalchemy import create_engine
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker

# This file is responsible for connecting to the database
# First, we need to create two fundamental things:
# A connection to the database.
# A catalog where we will register all our table designs.

# Get database URL from environment variable , this env var is defined in the yaml file , if not fetch uses the default value
DATABASE_URL = os.getenv("DATABASE_URL", "postgresql://admin:password123@database:5432/taskmanager") 

# Create SQLAlchemy engine to connect to database
engine = create_engine(DATABASE_URL) # This is the connection line to our specific database.

# Create SessionLocal class
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)

# Create Base class for our models. This is the central catalog.
# Any model that inherits from this 'Base' will be registered here.
Base = declarative_base()

# Dependency to get database session
def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()