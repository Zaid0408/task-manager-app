import React from "react";
import './Searchbar.css'

function Searchbar({ onCreateClick }){
    return(
        <div className="search-bar-container">
            <input type="text" placeholder="Search Tasks, Projects or Comments" className="search-input"/>
            <button className="search-btn">🔍</button>
            <button className="create-task-btn" onClick={onCreateClick}>
                ➕ Create Task
            </button>
        </div>
    )
}

export default Searchbar;