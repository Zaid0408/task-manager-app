import React, { useState } from "react";
import './TaskForm.css'

function TaskForm({ initialData = {}, projects = [], onSubmit, onCancel }){
    const [title, setTitle] = useState(initialData.title || "");
    const [description, setDescription] = useState(initialData.description || "");
    const [dueDate, setDueDate] = useState(initialData.due_date || "");
    const [projectId, setProjectId] = useState(initialData.project_id || "");
    const [status, setStatus] = useState(initialData.status || "TODO");
    const [priority, setPriority] = useState(initialData.priority || "Medium");

    const handleSubmit = (e) => {
        e.preventDefault();
        const payload = {
            title,
            description,
            due_date: dueDate,
            project_id: projectId,
            status,
            priority,
        };
        onSubmit && onSubmit(payload);
    };

    return (
        <div className="task-form-container">
            <form className="task-form" onSubmit={handleSubmit}>
                <div className="form-group">
                    <label className="form-label">Title</label>
                    <input className="form-input" value={title} onChange={(e)=>setTitle(e.target.value)} placeholder="Enter task title" required />
                </div>

                <div className="form-group">
                    <label className="form-label">Description</label>
                    <textarea className="form-textarea" value={description} onChange={(e)=>setDescription(e.target.value)} placeholder="Task details" />
                </div>

                <div className="form-group">
                    <label className="form-label">Project</label>
                    <select className="form-select" value={projectId} onChange={(e)=>setProjectId(e.target.value)}>
                        <option value="">Select a project</option>
                        {projects.map((p)=> (
                            <option key={p.id} value={p.id}>{p.name}</option>
                        ))}
                    </select>
                </div>

                <div className="form-row" style={{ display:'flex', gap:'0.75rem' }}>
                    <div className="form-group" style={{ flex:1 }}>
                        <label className="form-label">Status</label>
                        <select className="form-select" value={status} onChange={(e)=>setStatus(e.target.value)}>
                            <option value="TODO">Todo</option>
                            <option value="IN_PROGRESS">In Progress</option>
                            <option value="CODE_REVIEW">Code Review</option>
                            <option value="DONE">Done</option>
                        </select>
                    </div>
                    <div className="form-group" style={{ flex:1 }}>
                        <label className="form-label">Priority</label>
                        <select className="form-select" value={priority} onChange={(e)=>setPriority(e.target.value)}>
                            <option value="High">High</option>
                            <option value="Medium">Medium</option>
                            <option value="Low">Low</option>
                        </select>
                    </div>
                </div>

                <div className="form-group">
                    <label className="form-label">Due date</label>
                    <input className="form-input" type="date" value={dueDate} onChange={(e)=>setDueDate(e.target.value)} required/>
                </div>

                <div className="form-buttons">
                    <button type="submit" className="btn-submit">Save Task</button>
                    <button type="button" className="btn-cancel" onClick={onCancel}>Cancel</button>
                </div>
            </form>
        </div>
    );
}

export default TaskForm;
