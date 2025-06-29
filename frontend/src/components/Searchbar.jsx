import React from "react";
import './Searchbar.css'

function Searchbar(){
    return(
        <div className="search-bar-container">
            <input type="text" placeholder="Search Tasks, Projects or Comments" className="search-input"/>
            <button className="search-btn">🔍</button>
        </div>
    )
}

export default Searchbar;