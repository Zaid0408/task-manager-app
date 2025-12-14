import React, { useState, useEffect, useMemo } from 'react';
import './App.css';
import Header from './components/Header';
import KanbanBoard from './components/KanbanBoard';
import Searchbar from './components/Searchbar';
import Sidebar from './components/Sidebar';
import Modal from './components/Modal';
import TaskForm from './components/TaskForm';
import LoginForm from './components/LoginForm.jsx';
import SignUpForm from './components/SignUpForm.jsx';
import ProjectForm from './components/ProjectForm.jsx';
import {getProjects,updateProject,updateTask,deleteTask} from "./services/service.js";
import {getToken, setToken, login, removeToken, logout, signup, isAuthenticated} from "./services/auth.js"

function App() {
  const [backendStatus, setBackendStatus] = useState('Loading...');
  const [dbConnection, setDbConnection] = useState('Checking...');
  const [isSidebarOpen, setIsSidebarOpen]= useState(false);
  const [isCreateOpen, setIsCreateTaskOpen] = useState(false);
  const [isLoginOpen,setIsLoginOpen] = useState(false);
  const [isSignUpOpen, setIsSignUpOpen] = useState(false);
  const [isAuthenticatedState, setIsAuthenticatedState] = useState(false);
  const [selectedProject, setSelectedProject]= useState(null);
  const [isCreateProjectOpen, setIsCreateProjectOpen] = useState(false);


  const [projects, setProjects] = useState([]); 
  const [tasksRefreshTrigger, setTasksRefreshTrigger] = useState(0);

  const toggleSidebar = ()=>{ // to change state of the sidebar 
    setIsSidebarOpen(!isSidebarOpen)
  }

  useEffect(() => {

    // To fetch and store projects in a map which will be allowed to be used everywhere
    getProjects().then(data => {
      const projectsData = data || [];
      setProjects(projectsData);
      if (projectsData && typeof projectsData === 'object') {
        const objectLength = Array.isArray(projectsData) ? projectsData.length : Object.keys(projectsData).length;
        console.log('Retrieved projects from api:', objectLength);
      }
    });
    const authStatus = isAuthenticated();
    setIsAuthenticatedState(authStatus); // Check authentication status on mount
    // App loads → Check isAuthenticated() → If false, show login modal
    if (!authStatus) {
      setIsLoginOpen(true); 
    }
    
    // Test backend connection
    fetch('http://localhost:8080/health')
      .then(response => response.json())
      .then(data => {
        setBackendStatus(`Backend: ${data.status}`);
        // If backend is healthy, it means DB connection is also working
        setDbConnection('Database: Connected');
      })
      .catch(error => {
        setBackendStatus('Backend: Disconnected');
        setDbConnection('Database: Unknown');
        console.error('Backend connection failed:', error);
      });
  }, []);

  useEffect(()=>{
    if(!isLoginOpen && !isSignUpOpen){
      setIsAuthenticatedState(isAuthenticated());
    }
  },[isLoginOpen,isSignUpOpen]);

  const projectsMap = useMemo(() => {
    return projects.reduce((acc, p) => {
      acc[p.id] = p.name;
      return acc;
    }, {});
  }, [projects]);

  const projectOptions = Object.entries(projectsMap).map(([id, name]) => ({ id: Number(id), name }));

  const [showEditModal, setShowEditModal] = useState(false);
  const [editingProject, setEditingProject] = useState(null);
  const [showEditTaskModal, setShowEditTaskModal] = useState(false);
  const [editingTask, setEditingTask] = useState(null);

// Add this handler:
  const handleEditProject = (project) => {
      console.log("handleEditProject called with:", project);
      setEditingProject(project);
      setShowEditModal(true);
      console.log("showEditModal set to true");
  };

  const handleEditTask = (task) =>{
    setEditingTask(task);
    setShowEditTaskModal(true);
  }

  const handleLoginSuccess=()=>{
    setIsAuthenticatedState(true);
    setIsLoginOpen(false);
  }
  const handleSignUpSuccess=()=>{
    setIsAuthenticatedState(true);
    setIsSignUpOpen(false);
  }

  const handleEditTaskSubmit = async(updatedTask) => {
    try {
        const response = await updateTask(editingTask.id, updatedTask);
        if(response) {
            alert("Task Updated Successfully!");
            // Trigger refresh in KanbanBoard by incrementing the refresh trigger
            setTasksRefreshTrigger(prev => prev + 1);
            /**
             * After editing a task, App.jsx increments refreshTrigger.
              KanbanBoard's useEffect detects the change and re-fetches tasks.
              The board updates with the latest data.
             */
        }
    } catch (error) {
        alert("Error in updating task: "+ error)
    }
    finally{
        setShowEditTaskModal(false);
        setEditingTask(null);
    }
  };

  const handleDeleteTask = async(task) =>{
    const confirmDelete=window.confirm(`Are you sure you want to delete the task: "${task.title}"?`)
    if(!confirmDelete)
      return;
    try {
      const response=await deleteTask(task.id);
      if(response)
      {
          alert("Task Deleted Successfully !");
          // Trigger refresh in KanbanBoard by incrementing the refresh trigger
          setTasksRefreshTrigger(prev => prev + 1);
      }
    } catch (error) {
      alert("Error in deleting task: "+ error)
    }
  }

  const handleEditProjectSubmit = async(updatedProject) => {
      // Handle the update logic here
      try {
        const response= await updateProject(editingProject.id,updatedProject);
        if(response) {
          alert("Project Updated Successfully!");
          // Refresh projects list
          getProjects().then(data => {
              setProjects(data || []);
          });
        }
      } catch (error) {
        alert("Error in updating project: "+ error)
      }
      finally{
        setShowEditModal(false);
        setEditingProject(null);
        setTasksRefreshTrigger(prev => prev + 1);
      }
  };


  /**
   * App loads → Check isAuthenticated() → If false, show login modal
   * User clicks "Sign up" link → Close login modal, open signup modal
   * User clicks "Log in" link → Close signup modal, open login modal
   * User successfully logs in/signs up → Token stored → isAuthenticated() returns true → Show main app
   * User clicks logout → Remove token → isAuthenticated() returns false → Show login modal
   */

  const handleSignUpSubmit = async(signUpPayload) =>{
    try {
      const response = await signup(signUpPayload).then(response => response.json());
      if(response){
        alert("Sign Up Successful");
        const token = response.access_token; // need to check if proper 
        setToken(token); 
      }
    }catch (error) {
      alert("Error in Sign Up: "+ error)
    }
    finally{
      setIsSignUpOpen(false);
    }

  }

  const handleLogout = async() =>{
    try {
      const response = await logout({})
      if(response){
        alert("Log out Successful");
        removeToken(); 
        setIsAuthenticatedState(false);
      }
    }catch (error) {
      alert("Error in log out: "+ error)
    }
    finally{
      removeToken(); 
      setIsAuthenticatedState(false);
    }
  }

  return (
    <div className="App">
      {/* Conditional rendering based on authentication */}
      {!isAuthenticatedState ? (
          // Show login/signup interface when not authenticated
         <div className="auth-container">
          <Modal
            isOpen={isLoginOpen || (!isLoginOpen && !isSignUpOpen)}
            title="Log In"
            onClose={()=> setIsLoginOpen(false)}
          >
            <LoginForm 
              onCancel={()=>setIsLoginOpen(false)}
              onSwitchToSignUp={()=>{
                setIsLoginOpen(false);
                setIsSignUpOpen(true);
              }}
              onLoginSuccess={ handleLoginSuccess}
            />
          </Modal>

          <Modal
            isOpen={isSignUpOpen}
            title="Sign Up"
            onClose={()=> setIsSignUpOpen(false)}
          >
            <SignUpForm 
              onCancel={()=> setIsSignUpOpen(false)}
              onSwitchToLogin={()=>{
                setIsLoginOpen(true);
                setIsSignUpOpen(false);
              }}
              onSignUpSuccess={ handleSignUpSuccess}
            />
          </Modal>
         </div>
      ) : ( // Show main app when authenticated
        <>
      <Header onSidebarClick={toggleSidebar} isOpenSidebar={isSidebarOpen} onLogout={handleLogout}/> 
       {/* pass state of sidebar to componenets
      when button is clicked in the header componenet the toggle function defined above is called 
      header is deciding whether to open /close sidebar hence toggle function passed in header only which helps in changing side bar state  */}
      <Searchbar onCreateClick={() => setIsCreateTaskOpen(true)} />
      <div className="main-layout">
        <Sidebar isOpenSidebar={isSidebarOpen} 
                 projects={projects} 
                 setSelectedProject={setSelectedProject}
                 onAddProjectClick={() => setIsCreateProjectOpen(true)}
                 onEditProject={handleEditProject}
        />
        <Modal isOpen={isCreateProjectOpen} title="Create Project" onClose={() => setIsCreateProjectOpen(false)}>
            <ProjectForm
              onSubmit={(payload) => {
                // later: call createProject(payload)
                setIsCreateProjectOpen(false);
              }}
              onCancel={() => setIsCreateProjectOpen(false)}
            />
        </Modal>
        {showEditModal && (
        <Modal isOpen={showEditModal} title="Edit Project" onClose={() => setShowEditModal(false)}>
            <ProjectForm
                editMode={true}
                projectData={editingProject}
                onSubmit={handleEditProjectSubmit}
                onCancel={() => setShowEditModal(false)}
            />
        </Modal>
        )}
            {/* pass state of project/ project object to kanban board
          when project is clicked in the sidebar the toggle function defined above is called 
          sidebar is deciding which project to display in the kanban board hence toggle function passed in header only which helps in changing side bar state  */}
        <div className="content-area">
          <KanbanBoard selectedProject={selectedProject} projectsMap={projectsMap} onEditTask={handleEditTask} refreshTrigger={tasksRefreshTrigger} onDeleteTask={handleDeleteTask} />
        </div>
      </div>
      <Modal isOpen={isCreateOpen} title="Create Task" onClose={() => setIsCreateTaskOpen(false)}>
        <TaskForm 
          projects={projectOptions}
          onSubmit={() => setIsCreateTaskOpen(false)}
          onCancel={() => setIsCreateTaskOpen(false)}
        />
      </Modal>
      {showEditTaskModal && (
        <Modal isOpen={showEditTaskModal} title="Edit Task" onClose={() => setShowEditTaskModal(false)}>
          <TaskForm 
            editMode={true}
            taskData={editingTask}
            projects={projectOptions}
            onSubmit={handleEditTaskSubmit}
            onCancel={() => setShowEditTaskModal(false)}
          />
        </Modal>
      )}
      
      {/* Status indicators - you can remove these later */}
      <div className="status-indicators">
        <div style={{ 
          padding: '10px', 
          backgroundColor: backendStatus.includes('healthy') ? '#4CAF50' : '#f44336',
          borderRadius: '5px',
          margin: '5px 0',
          color: 'white'
        }}>
          {backendStatus}
        </div>
        
        <div style={{ 
          padding: '10px', 
          backgroundColor: dbConnection.includes('Connected') ? '#4CAF50' : '#ff9800',
          borderRadius: '5px',
          margin: '5px 0',
          color: 'white'
        }}>
          {dbConnection}
        </div>
      </div>
      </>
      )}
    </div>
  );
}

export default App;