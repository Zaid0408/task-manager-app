import React from "react";
import './KanbanBoard.css'
import TaskCard from './TaskCard'
import {useState,useEffect } from 'react';

function KanbanBoard(){
    const [tasks] = useState([ // sample data for now will integrate with the bapis later
            {
                id: 1,
                title: "Integrate frontend & backend",
                description: "Connect React frontend with FastAPI backend",
                status: "DONE",
                priority: "High",
                project: { name: "Task Manager" },
                due_date: "2024-01-15"
            },
            {
                id: 2,
                title: "Design system",
                description: "Create consistent UI components and styles",
                status: "IN_PROGRESS",
                priority: "Medium",
                project: { name: "Task Manager" },
                due_date: "2024-01-20"
            },
            {
                id: 3,
                title: "Design system",
                description: "Work on Completing Fronend",
                status: "IN_PROGRESS",
                priority: "Medium",
                project: { name: "Frontend Project" },
                due_date: "2024-01-20"
            },
            {
                id: 4,
                title: "Go To Gym ",
                description: "Go Lift weights ",
                status: "TODO",
                priority: "Medium",
                project: { name: "GYM " },
                due_date: "2024-01-20"
            },
            {
                id:5,
                title: "Sydney Sweeney ",
                description: "That is it",
                status: "CODE REVIEW",
                priority: "High",
                project: { name: "GYM " },
                due_date: "2024-01-20"
            },
            {
                id: 6,
                title: "Make API connecter file to connect frontend and backend ",
                description: "Connect React frontend with FastAPI backend",
                status: "TODO ",
                priority: "High",
                project: { name: "Task Manager" },
                due_date: "2024-01-15"
            },
            {
                id: 7,
                title: "Write unit tests",
                description: "Add tests for components and reducers",
                status: "TODO",
                priority: "Medium",
                project: { name: "Task Manager" },
                due_date: "2024-02-01"
            },
            {
                id: 8,
                title: "Refactor Kanban columns",
                description: "Extract reusable column component",
                status: "IN_PROGRESS",
                priority: "Low",
                project: { name: "Frontend Project" },
                due_date: "2024-02-05"
            },
            {
                id: 9,
                title: "Implement modal for task details",
                description: "Move actions and status into modal",
                status: "CODE REVIEW",
                priority: "High",
                project: { name: "Task Manager" },
                due_date: "2024-02-03"
            },
            {
                id: 10,
                title: "Deploy preview environment",
                description: "Set up Vercel preview for frontend",
                status: "DONE",
                priority: "Low",
                project: { name: "Infra" },
                due_date: "2024-01-28"
            }

    ])
 // implement later after integrating APIs
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
                            onEdit={handleEditTask}
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
                            onEdit={handleEditTask}
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
                            onEdit={handleEditTask}
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
                            onEdit={handleEditTask}
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