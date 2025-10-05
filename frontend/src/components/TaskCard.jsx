import React, { useState } from "react";

import './TaskCard.css'
import Modal from './Modal'

function TaskCard({task, projectName,onEdit,onDelete,onStatusChange}){
    const [isOpen, setIsOpen] = useState(false);
    const normalizedStatusClass = ((task.status || '')
        .trim()
        .toLowerCase()
        .replace(/\s+/g, '-')
        .replace('_', '-'));

    return (
        <>
        <div 
            className="task-card task-card-clickable"
            onClick={() => setIsOpen(true)}
            role="button"
            tabIndex={0}
            onKeyDown={(e) => { if (e.key === 'Enter') setIsOpen(true); }}
        >
            <div className="task-card-header">
                <h3 className="task-card-title">{task.title}</h3>
            </div>
            <div className="task-card-content">
                <p className="task-description">
                    {task.description}
                </p>
                <span className="task-project">
                    📁 {projectName || 'No Project'}
                </span>
                <span className="task-due-date">
                    📅 {task.due_date ? new Date(task.due_date).toLocaleDateString() : 'No due date'}
                </span>
            </div>
            <div className="task-card-footer">
                <span className={`task-priority ${task.priority?.toLowerCase() || "medium"}`}>
                    {task.priority || "Medium"}
                </span>
                <div className="task-assignee">
                    <img 
                        src={task.assignee?.avatar || `https://ui-avatars.com/api/?name=${task.assignee?.name || 'User'}`}
                        alt={task.assignee?.name || 'Unassigned'}
                        className="assignee-avatar"
                    />
                </div>
            </div>
        </div>

        <Modal isOpen={isOpen} title={`#${task.id}`} onClose={() => setIsOpen(false)}>
            <div className="task-modal-title-row">
                <h3 className="task-modal-title-text">{task.title}</h3>
                <select 
                    className="task-status-select"
                    value={task.status}
                    onChange={(e) => onStatusChange(task.id, e.target.value)}
                >
                    <option value="TODO">⏳ Todo</option>
                    <option value="IN_PROGRESS">🔄 In Progress</option>
                    <option value="CODE_REVIEW">💻 Code Review</option>
                    <option value="DONE">✅ Done</option>
                </select>
            </div>
            <div className="task-modal-body">
                <p className="task-description task-modal-description">
                    {task.description}
                </p>

                <div className="task-modal-meta-block">
                    <span className="task-project">📁 {projectName || 'No Project'}</span>
                </div>
                <div className="task-modal-meta-row">
                    <span className="task-due-date">📅 {task.due_date ? new Date(task.due_date).toLocaleDateString() : 'No due date'}</span>
                    <span className={`task-priority ${task.priority?.toLowerCase() || "medium"}`}>Priority: {task.priority || 'Medium'}</span>
                </div>

                <div className="task-modal-actions-row">
                    <button className="task-action-btn" onClick={() => { onEdit(task); setIsOpen(false); }}>
                        ✏️ Edit
                    </button>
                    <button className="task-action-btn" onClick={() => { onDelete(task.id); setIsOpen(false); }}>
                        🗑️ Delete
                    </button>
                </div>
            </div>
        </Modal>
        </>
    )
}

export default TaskCard;
