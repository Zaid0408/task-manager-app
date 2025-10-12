import React, { useState } from "react";
import { createProject, updateProject } from "../services/service.js";
import './ProjectForm.css'
import ContextMenu from "./ContextMenu.jsx";

function ProjectForm({onSubmit, onCancel, editMode, projectData}){
    const [name,setName]=useState('');
    const [description,setDescription]=useState('');
    const [loading,setLoading]=useState(false);

    const handleSubmit = async(e)=>{
        e.preventDefault();
        setLoading(true);
        
        const payload = {name : name, description: description}
        try {
            let response;
            if (editMode) {
                response = await updateProject(projectData.id, payload);
                alert("Project Updated Successfully!");
            } else {
                response = await createProject(payload);
                alert("Project Added Successfully!");
            }
            if(response){
                onSubmit?.(payload);
            }
        } catch (error) {
            console.error('Error adding project:', error);
            if(error.response?.status >= 400) {
                alert(`Server error: ${error.response.status}`);
            } else {
                alert("Failed to add project");
            }
        }
        finally{
            setLoading(false);
        }
    }

    if(loading){
        return <p> {editMode ? 'Updating' : 'Adding'} Projects... </p>
    }

    return(
        <form onSubmit={handleSubmit} className="project-form" >
            <div className="form-group">
                <label className="form-label">Project Name</label>
                <input 
                    disabled={loading}
                    className="form-input"
                    type="text" 
                    value={name} 
                    placeholder="Enter Project Name" 
                    onChange={(e) => setName(e.target.value)}
                    required
                />
            </div>
            <div className="form-group">
                <label className="form-label">Project Description</label>
                <textarea 
                    className="form-textarea"
                    value={description} 
                    placeholder="Enter Project Description" 
                    onChange={(e) => setDescription(e.target.value)}
                    rows={3}
                />
            </div>
            <div className="form-buttons">
                <button type="submit" disabled={loading} className="btn-submit">
                    {loading ? (editMode ? "Updating..." : "Creating...") : (editMode ? "Update Project" : "Create Project")}
                </button>
                <button type="button" className="btn-cancel" onClick={onCancel}>Cancel</button>
            </div>
        </form>
    )
}
export default ProjectForm;