import React, { useState } from "react";
import './ProjectForm.css'

function ProjectForm({onSubmit, onCancel}){
    const [name,setName]=useState('');
    const [description,setDescription]=useState('');

    return(
        <form onSubmit={(e)=>{
            e.preventDefault();
            onSubmit?.({name,description});
        }}
            className="project-form"
        >
            <div className="form-row">
                <label>Project Name</label>
                <input type="text" 
                        value={name} 
                        placeholder="Enter Project Name" 
                        onChange={(e) => setName(e.target.value)}
                        required
                />
            </div>
            <div className="form-row">
                <label >Project Description</label>
                <input type="text" 
                        value={name} 
                        placeholder="Enter Project Description" 
                        onChange={(e) => setName(e.target.value)}
                        rows={3}
                />
            </div>
            <div className="form-actions">
                <button type="button" onClick={onCancel}>
                    Cancel
                </button>
                <button type="submit">
                    Create Project
                </button>
            </div>
        </form>
    )
}
export default ProjectForm;