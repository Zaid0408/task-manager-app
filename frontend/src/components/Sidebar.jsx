import React from "react";
import {useState,useEffect } from 'react';
import './Sidebar.css';
import { getProjects, deleteProject, updateProject } from "../services/service.js";

function Sidebar({isOpenSidebar, projects ,setSelectedProject, onAddProjectClick}){

    const [error, setError]= useState(null);

    useEffect(()=>{
        if(!projects){
            setError("Failed to get Projects");
        }
        setError(null);
    }, [])

    if(error){
        return <p style={{ color: "red" }}>Error : {error}</p>
    }
    if (projects.length === 0) {
        return <p style={{ color: "red" }}>No Projects found.</p>;
    }

    const handleEditProject= (project) =>{
        console.log("Edit Project :", project)
    }
    const handleDeleteProject= (projectId) =>{
        console.log("Delete Project Id :", projectId)
    }

    const handleProjectClick= (project) =>{
        setSelectedProject(project);
    }

    

    return ( 
        
        <aside className={`sidebar-container ${isOpenSidebar ? 'sidebar-open' : 'sidebar-closed'}` }>
            <div className="sidebar-projects">
                <h2 className="sidebar-title" >All Tasks</h2>
                <ul className="project-list">
                <li className="project-item"
                    onClick={()=> handleProjectClick(null)} // null means "all tasks"
                    style={{cursor:'pointer'}}
                >
                    View All Tasks</li>
                </ul>
            </div>
            <div className="sidebar-projects">
                <h2 className="sidebar-title" >Projects</h2>
                <ul className="project-list">
                    {projects.map(project => (
                        <li key={project.id} 
                            className="project-item"
                            onClick={()=> handleProjectClick(project)} // Passing entire project object so as to filter the tasks by project id.
                            style={{cursor:'pointer'}}
                        >
                            {project.name}
                        </li>
                    ))}
                </ul>
                <button className="add-project-btn" onClick={onAddProjectClick}>Add project +</button>
            </div>
            <div className="sidebar-stats">
                <h2 className="sidebar-title">Statistics</h2>
                <div className="stat-item">📊 Total: 16</div>
                <div className="stat-item">✅ Done: 4</div>
                <div className="stat-item">🔄 Progress: 6</div>
                <div className="stat-item">💻 Code Review: 2</div>
                <div className="stat-item">⏳ Todo: 2</div>
            </div>
        </aside>
        
    )
}

export default Sidebar;