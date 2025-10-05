import React, { useState, useEffect, useMemo } from 'react';
import './App.css';
import Header from './components/Header';
import KanbanBoard from './components/KanbanBoard';
import Searchbar from './components/Searchbar';
import Sidebar from './components/Sidebar';
import Modal from './components/Modal';
import TaskForm from './components/TaskForm';
import ProjectForm from './components/ProjectForm.jsx';
import {getProjects} from "./services/service.js";

function App() {
  const [backendStatus, setBackendStatus] = useState('Loading...');
  const [dbConnection, setDbConnection] = useState('Checking...');
  const [isSidebarOpen, setIsSidebarOpen]= useState(false);
  const [isCreateOpen, setIsCreateTaskOpen] = useState(false);
  const [selectedProject, setSelectedProject]= useState(null);
  const [isCreateProjectOpen, setIsCreateProjectOpen] = useState(false);


  const [projects, setProjects] = useState([]); 

  const toggleSidebar = ()=>{ // to change state of the sidebar 
    setIsSidebarOpen(!isSidebarOpen)
  }

  useEffect(() => {

    // To fetch and store projects in a map which will be allowed to be used everywhere
    getProjects().then(data => {
      setProjects(data || []);
      const objectLength = Object.keys(data).length;
      console.log('Retrieved projects from api:', objectLength);
    });
    
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

  const projectsMap = useMemo(() => {
    return projects.reduce((acc, p) => {
      acc[p.id] = p.name;
      return acc;
    }, {});
  }, [projects]);

  const projectOptions = Object.entries(projectsMap).map(([id, name]) => ({ id: Number(id), name }));

  return (
    <div className="App">
      <Header onSidebarClick={toggleSidebar} isOpenSidebar={isSidebarOpen}/> 
       {/* pass state of sidebar to componenets
      when button is clicked in the header componenet the toggle function defined above is called 
      header is deciding whether to open /close sidebar hence toggle function passed in header only which helps in changing side bar state  */}
      <Searchbar onCreateClick={() => setIsCreateTaskOpen(true)} />
      <div className="main-layout">
        <Sidebar isOpenSidebar={isSidebarOpen} 
                 projects={projects} 
                 setSelectedProject={setSelectedProject}
                 onAddProjectClick={() => setIsCreateProjectOpen(true)}
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
            {/* pass state of project/ project object to kanban board
          when project is clicked in the sidebar the toggle function defined above is called 
          sidebar is deciding which project to display in the kanban board hence toggle function passed in header only which helps in changing side bar state  */}
        <div className="content-area">
          <KanbanBoard selectedProject={selectedProject} projectsMap={projectsMap} />
        </div>
      </div>
      <Modal isOpen={isCreateOpen} title="Create Task" onClose={() => setIsCreateTaskOpen(false)}>
        <TaskForm 
          projects={projectOptions}
          onSubmit={() => setIsCreateTaskOpen(false)}
          onCancel={() => setIsCreateTaskOpen(false)}
        />
      </Modal>
      
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
    </div>
  );
}

export default App;