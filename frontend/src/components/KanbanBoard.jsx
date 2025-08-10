import React from "react";
import './KanbanBoard.css'

function KanbanBoard(){
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
                </div>
            </div>
            <div className="kanban-column">
                <h2 className="kanban-column-title">DONE</h2> 
                <div className="kanban-tasks-list">
                    <div className="kanban-task-card">review</div>
                    <div className="kanban-task-card">deploy</div>
                    <div className="kanban-task-card">test</div>
                    <div className="kanban-task-card">done </div>
                </div>               
            </div>
        </div>
    )
}

export default KanbanBoard;