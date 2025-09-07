import React from "react";
import './EmptyState.css'

function EmptyState({ title = "No items", description = "There is nothing to show here yet." }){
    return (
        <div className="empty-state">
            <div className="empty-illustration">🗂️</div>
            <h3 className="empty-title">{title}</h3>
            <p className="empty-description">{description}</p>
        </div>
    );
}

export default EmptyState;
