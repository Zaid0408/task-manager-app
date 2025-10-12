import React from "react";
import './ContextMenu.css'

function ContextMenu({isVisible,position,onEdit,onDelete,onClose}){

    if(!isVisible)
        return null;

    return(
        <>
            <div className="context-menu-backdrop" onClick={onClose}></div>
            <div className="context-menu " style={{
                left: position.x,
                top: position.y,
            }}>
                <div className="context-menu-item" onClick={onEdit} >
                    ✏️ Edit
                </div>
                <div className="context-menu-item" onClick={onDelete}>
                    🗑️ Delete
                </div>
            </div>  
        </>
    )
}

export default ContextMenu;