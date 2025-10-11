import React, { useState } from "react";
import { createProject } from "../services/service.js";
import './ProjectForm.css'

function ProjectForm({onSubmit, onCancel}){
    const [name,setName]=useState('');
    const [description,setDescription]=useState('');
    const [loading,setLoading]=useState(false);

    const addProject = async(e)=>{
        e.preventDefault();
        setLoading(true);
        
        const payload = {name : name, description: description}
        try {
            const response = await createProject(payload);
            if(response){
                alert("Project Added Successfully!");
                onSubmit?.({name, description}); // Call parent callback 
                // needed as this will close the modal within which the project form is present
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
        return <p> Adding Projects... </p>
    }

    return(
        <form onSubmit={addProject} className="project-form" >
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
                <button type="submit" disabled={loading} className="btn-submit">{loading ? "Creating... ": "Create Project"}</button>
                <button type="button" className="btn-cancel" onClick={onCancel}>Cancel</button>
            </div>
        </form>
    )
}
export default ProjectForm;