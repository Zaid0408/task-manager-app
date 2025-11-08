import React from "react";
import './KanbanBoard.css'
import TaskCard from './TaskCard'
import {useState,useEffect } from 'react';
import { getTasks, getTasksByProjectId } from "../services/service.js";

function KanbanBoard({selectedProject, projectsMap, onEditTask, refreshTrigger}){

    const [tasks,setTasks]= useState([]);
    const [loading, setLoading]= useState(false);
    const [error, setError]= useState(null);
    
    useEffect(()=>{
        setLoading(true);
        setError(null);

        const fetchTasks= selectedProject 
        ? getTasksByProjectId(selectedProject.id)
        : getTasks();

        fetchTasks
            .then((data)=>{
                setTasks(data);
                console.log("Retrieved data from api : "+ data);
                setLoading(false);
            })
            .catch((error)=>{
                setError("Failed to fetch tasks: "+error.message)
                setLoading(false);
            })
    },[selectedProject, refreshTrigger]);// Depends on selectedProject and refreshTrigger 

    if(loading){
        return <p>Loading Tasks ...</p>
    }
    if(error){
        return <p style={{ color: "red" }}>Error : {error}</p>
    }
    if (tasks.length === 0) {
        return <p style={{ color: "red" }}>No tasks found.</p>;
      }

    const handleEditTask= (task) =>{
        console.log("Edit Task :", task)
    }
    const handleDeleteTask= (taskId) =>{
        console.log("Delete Task Id :", taskId)
    }
    const handleStatusChange= (taskId, newStatus) =>{
        console.log("Status Change : ", taskId , "to", newStatus)
    }

    const normalize = (status) => (status || '').trim().toUpperCase().replace(/\s+/g, '_');
    const projectNameFor = (task) => projectsMap?.[task.project_id] || selectedProject?.name || 'No Project';
      

    return(

        <div className="kanban-board-container">
            <div className="kanban-column">
                <h2 className="kanban-column-title">
                    TODO
                </h2>
                <div className="kanban-tasks-list">
                    {tasks.filter(task => normalize(task.status) === 'TODO').map(task => (
                        <TaskCard
                            key={task.id}
                            task={task}
                            projectName={projectNameFor(task)}
                            onEdit={onEditTask}
                            onDelete={handleDeleteTask}
                            onStatusChange={handleStatusChange}
                        />
                    ))}
                </div>
            </div>
            <div className="kanban-column">
                <h2 className="kanban-column-title">
                    IN PROGRESS
                </h2>
                <div className="kanban-tasks-list">
                    {tasks.filter(task => normalize(task.status) === 'IN_PROGRESS').map(task => (
                        <TaskCard
                            key={task.id}
                            task={task}
                            projectName={projectNameFor(task)}
                            onEdit={onEditTask}
                            onDelete={handleDeleteTask}
                            onStatusChange={handleStatusChange}
                        />
                    ))}
                </div>
            </div>
            <div className="kanban-column">
                <h2 className="kanban-column-title">
                    CODE REVIEW
                </h2>
                <div className="kanban-tasks-list">
                    {tasks.filter(task => normalize(task.status) === 'CODE_REVIEW').map(task => (
                        <TaskCard
                            key={task.id}
                            task={task}
                            projectName={projectNameFor(task)}
                            onEdit={onEditTask}
                            onDelete={handleDeleteTask}
                            onStatusChange={handleStatusChange}
                        />
                    ))}
                </div>
            </div>
            <div className="kanban-column">
                <h2 className="kanban-column-title">DONE</h2> 
                <div className="kanban-tasks-list">
                    {tasks.filter(task => normalize(task.status) === 'DONE').map(task => (
                        <TaskCard
                            key={task.id}
                            task={task}
                            projectName={projectNameFor(task)}
                            onEdit={onEditTask}
                            onDelete={handleDeleteTask}
                            onStatusChange={handleStatusChange}
                        />
                    ))}
                </div>               
            </div>
        </div>
    )
}

export default KanbanBoard;