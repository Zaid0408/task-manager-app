import React from "react";
import {useState,useEffect } from 'react';
import './Sidebar.css';
import { getProjects } from "../services/service.js";

function Sidebar({isOpenSidebar}){

    const [projects,setProjects]= useState([]);
    const [loading, setLoading]= useState(false);
    const [error, setError]= useState(null);

    useEffect(()=>{
        setLoading(true);
        setError(null);

        getProjects()
            .then((data)=>{
                setProjects(data);
                console.log("Retrieved Projects from API: "+ data);
                setLoading(false);
            })
            .catch((error)=>{
                setError(error);
                console.error("Error recieved: "+ error);
                setLoading(false);
            })
    }, [])

    if(loading){
        return <p>Loading Projects ...</p>
    }
    if(error){
        return <p style={{ color: "red" }}>Error : {error}</p>
    }
    if (projects.length === 0) {
        return <p style={{ color: "red" }}>No Projects found.</p>;
      }

    const handleEditProject= (task) =>{
        console.log("Edit Task :", task)
    }
    const handleDeleteProject= (taskId) =>{
        console.log("Delete Task Id :", taskId)
    }

    return ( 
        
        <aside className={`sidebar-container ${isOpenSidebar ? 'sidebar-open' : 'sidebar-closed'}` }>
            <div className="sidebar-projects">
                <h2 className="sidebar-title" >All Tasks</h2>
                <ul className="project-list">
                <li className="project-item">View All Tasks</li>
                </ul>
            </div>
            <div className="sidebar-projects">
                <h2 className="sidebar-title" >Projects</h2>
                <ul className="project-list">
                    {projects.map(project => (
                        <li key={project.id} className="project-item">
                            {project.name}
                        </li>
                    ))}
                </ul>
                <button className="add-project-btn">Add project +</button>
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