import React from "react";
import './KanbanBoard.css'
import TaskCard from "./Taskcard";
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

    return(

        <div className="kanban-board-container">
            <div className="kanban-column">
                <h2 className="kanban-column-title">
                    TODO
                </h2>
                <div className="kanban-tasks-list">
                    <div className="kanban-task-card">Integrate front end & backend</div>
                    <div className="kanban-task-card">DSA</div>
                    <div className="kanban-task-card">Design system</div>
                    <div className="kanban-task-card">finish react code </div>
                    {tasks.filter(task => task.status === 'TODO').map(task => (
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
                    <div className="kanban-task-card">so</div>
                    <div className="kanban-task-card">A</div>
                    <div className="kanban-task-card">B</div>
                    <div className="kanban-task-card">C</div>
                    {tasks.filter(task => task.status === 'IN_PROGRESS').map(task => (
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
                    <div className="kanban-task-card">code in review</div>
                    <div className="kanban-task-card">code in review</div>
                    <div className="kanban-task-card">code in review</div>
                    <div className="kanban-task-card">code in review</div>
                    {tasks.filter(task => task.status === 'CODE_REVIEW').map(task => (
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
                    <div className="kanban-task-card">review</div>
                    <div className="kanban-task-card">deploy</div>
                    <div className="kanban-task-card">test</div>
                    <div className="kanban-task-card">done </div>
                    {tasks.filter(task => task.status === 'DONE').map(task => (
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