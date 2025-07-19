import React from "react";

function KananBoard(){
    return(
        <div className="kanan-board-container">
            <div className="kanban-column">
                <h2>
                    TODO
                </h2>
                <div className="kanban-tasks-list">
                    <div className="kanaban-task-card"></div>
                    <div className="kanaban-task-card"></div>
                    <div className="kanaban-task-card"></div>
                    <div className="kanaban-task-card"></div>
                </div>
            </div>
            <div className="kanban-column">
                <h2>
                    IN PROGRESS
                </h2>
                <div className="kanban-tasks-list">
                    <div className="kanaban-task-card"></div>
                    <div className="kanaban-task-card"></div>
                    <div className="kanaban-task-card"></div>
                    <div className="kanaban-task-card"></div>
                </div>
            </div>
            <div className="kanban-column">
                <h2>
                    CODE REVIEW
                </h2>
                <div className="kanban-tasks-list">
                    <div className="kanaban-task-card"></div>
                    <div className="kanaban-task-card"></div>
                    <div className="kanaban-task-card"></div>
                    <div className="kanaban-task-card"></div>
                </div>
            </div>
            <div className="kanban-column">
                <h2>DONE</h2> 
                <div className="kanban-tasks-list">
                    <div className="kanaban-task-card"></div>
                    <div className="kanaban-task-card"></div>
                    <div className="kanaban-task-card"></div>
                    <div className="kanaban-task-card"></div></div>               
            </div>

        </div>
    )
}

export default KananBoard;