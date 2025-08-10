import React from "react";

function TaskCard({task, onEdit,onDelete,onStatusChange}){
    return (
        <div className="task-card">
            <div className="task-card-header">
                <h3 className="task-card-title">{task.title}</h3>
                <span className={`task-status-badge ${task.status.toLowerCase().replace('_', '-')}`}>
                {task.status}
                </span>
                <button className="task-action-btn" onClick={() => onEdit(task)}>
                    ✏️
                </button>
                <button className="task-action-btn" onClick={() => onDelete(task.id)}>
                    🗑️
                </button>
                <select 
                    className="task-status-select"
                    value={task.status}
                    onChange={(e) => onStatusChange(task.id, e.target.value)}>

                    <option value="TODO">⏳ Todo</option>
                    <option value="IN_PROGRESS">🔄 In Progress</option>
                    <option value="CODE REVIEW">💻 Code Review</option>
                    <option value="DONE">✅ Done</option>
                </select>
            </div>
            <div className="task-card-content">
                <p className="task-description">
                    {task.description}
                </p>
                <span className="task-project">
                    📁 {task.project?.name || 'No Project'}
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
    )
}

export default TaskCard;