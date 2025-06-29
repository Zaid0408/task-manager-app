import React, { useState, useEffect } from 'react';
import './App.css';
import Header from './components/Header';
import KanbanBoard from './components/KanbanBoard';
import Searchbar from './components/Searchbar';
import Sidebar from './components/Sidebar';
import Taskbar from './components/Taskbar';

function App() {
  const [backendStatus, setBackendStatus] = useState('Loading...');
  const [dbConnection, setDbConnection] = useState('Checking...');

  useEffect(() => {
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

  return (
    <div className="App">
      <Header />
      <Searchbar />
      <header className="App-header">
        <h1>🚀 Task Manager</h1>
        <p>Welcome to the Task Management System</p>
        
        <div style={{ margin: '20px 0' }}>
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

        <p style={{ fontSize: '14px', opacity: 0.8 }}>
          🐳 All services running in Docker containers
        </p>
      </header>
    </div>
  );
}

export default App;