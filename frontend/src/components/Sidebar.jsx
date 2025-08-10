import React from "react";
import './Sidebar.css'

function Sidebar(isOpenSidebar){
    return ( 
        
        <aside className={`sidebar-container $(isOpenSidebar ? 'sidebar-container':'sidebar-closed')` }>
            <div className="sidebar-projects">
                <h2 className="sidebar-title" >Projects</h2>
                <ul className="project-list">
                    <li className="project-item">E-Commerce Website</li>
                    <li className="project-item">Mobile App</li>
                    <li className="project-item">Backend Develpoment</li>
                    <li className="project-item">Sex</li>
                </ul>
                <button className="add-project-btn">Add project +</button>
            </div>
            <div className="sidebar-stats">
                <h2 className="sidebar-title">Statistics</h2>
                <div className="stat-item">📊 Total: 16</div>
                <div className="stat-item">✅ Done: 4</div>
                <div className="stat-item">🔄 Progress: 4</div>
                <div className="stat-item">⏳ Todo: 8</div>
            </div>
        </aside>
        
    )
}

export default Sidebar;