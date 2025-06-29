from sqlalchemy.orm import Session
from .models import Project as ProjectModel, Task as TaskModel, TaskStatus
from .database import SessionLocal

def seed_database():
    """
    Add dummy data to the database for testing purposes.
    This function will be called during application startup.
    """
    db = SessionLocal()
    try:
        # Check if we already have data to avoid duplicates
        existing_projects = db.query(ProjectModel).count()
        if existing_projects > 0:
            print("Database already has data, skipping seed...")
            return
        
        print("Seeding database with dummy data...")
        
        # Create dummy projects
        projects_data = [
            {
                "name": "E-commerce Website",
                "description": "Build a modern e-commerce platform with React and Node.js"
            },
            {
                "name": "Mobile App Development",
                "description": "Create a cross-platform mobile app using React Native"
            },
            {
                "name": "Data Analytics Dashboard",
                "description": "Develop a real-time analytics dashboard for business metrics"
            },
            {
                "name": "API Integration Project",
                "description": "Integrate third-party APIs for payment processing and notifications"
            }
        ]
        
        created_projects = []
        for project_data in projects_data:
            project = ProjectModel(**project_data)
            db.add(project)
        
        # Commit projects first to ensure they have proper IDs
        db.commit()
        
        # Now get the created projects to use their actual IDs
        created_projects = db.query(ProjectModel).all()
        
        # Create dummy tasks for each project
        tasks_data = [
            # Tasks for E-commerce Website (first project)
            {
                "title": "Design User Interface",
                "description": "Create wireframes and mockups for the main pages",
                "status": TaskStatus.DONE,
                "project_id": created_projects[0].id
            },
            {
                "title": "Set up React Frontend",
                "description": "Initialize React project with routing and state management",
                "status": TaskStatus.IN_PROGRESS,
                "project_id": created_projects[0].id
            },
            {
                "title": "Implement Shopping Cart",
                "description": "Build cart functionality with add/remove items",
                "status": TaskStatus.TODO,
                "project_id": created_projects[0].id
            },
            {
                "title": "Payment Gateway Integration",
                "description": "Integrate Stripe for secure payment processing",
                "status": TaskStatus.TODO,
                "project_id": created_projects[0].id
            },
            
            # Tasks for Mobile App Development (second project)
            {
                "title": "Project Setup",
                "description": "Initialize React Native project with navigation",
                "status": TaskStatus.DONE,
                "project_id": created_projects[1].id
            },
            {
                "title": "User Authentication",
                "description": "Implement login/signup screens with Firebase Auth",
                "status": TaskStatus.IN_PROGRESS,
                "project_id": created_projects[1].id
            },
            {
                "title": "Push Notifications",
                "description": "Set up push notifications for user engagement",
                "status": TaskStatus.CODE_REVIEW,
                "project_id": created_projects[1].id
            },
            {
                "title": "App Store Deployment",
                "description": "Prepare app for submission to App Store and Google Play",
                "status": TaskStatus.TESTING,
                "project_id": created_projects[1].id
            },
            
            # Tasks for Data Analytics Dashboard (third project)
            {
                "title": "Database Schema Design",
                "description": "Design efficient database schema for analytics data",
                "status": TaskStatus.DONE,
                "project_id": created_projects[2].id
            },
            {
                "title": "Data Pipeline Setup",
                "description": "Create ETL pipeline to process raw data",
                "status": TaskStatus.IN_PROGRESS,
                "project_id": created_projects[2].id
            },
            {
                "title": "Chart Components",
                "description": "Build reusable chart components using Chart.js",
                "status": TaskStatus.TODO,
                "project_id": created_projects[2].id
            },
            {
                "title": "Real-time Updates",
                "description": "Implement WebSocket connection for live data updates",
                "status": TaskStatus.TODO,
                "project_id": created_projects[2].id
            },
            
            # Tasks for API Integration Project (fourth project)
            {
                "title": "API Documentation Review",
                "description": "Study documentation for payment and notification APIs",
                "status": TaskStatus.DONE,
                "project_id": created_projects[3].id
            },
            {
                "title": "Payment API Integration",
                "description": "Integrate PayPal and Stripe payment gateways",
                "status": TaskStatus.IN_PROGRESS,
                "project_id": created_projects[3].id
            },
            {
                "title": "Email Service Setup",
                "description": "Configure SendGrid for transactional emails",
                "status": TaskStatus.CODE_REVIEW,
                "project_id": created_projects[3].id
            },
            {
                "title": "Testing and Validation",
                "description": "Write comprehensive tests for all API integrations",
                "status": TaskStatus.TESTING,
                "project_id": created_projects[3].id
            }
        ]
        
        for task_data in tasks_data:
            task = TaskModel(**task_data)
            db.add(task)
        
        # Commit all changes
        db.commit()
        print(f"✅ Successfully seeded database with {len(created_projects)} projects and {len(tasks_data)} tasks!")
        
    except Exception as e:
        print(f"❌ Error seeding database: {e}")
        db.rollback()
    finally:
        db.close() 