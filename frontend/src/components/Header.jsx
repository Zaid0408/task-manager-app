import React, { useState, useEffect } from 'react';
import './Header.css'

function Header({onSidebarClick, isOpenSidebar, onLogout}){
    return(
        <header className="Header">
            <button className="menu-btn" aria-label="Open Sidebar" onClick ={onSidebarClick}>
                {isOpenSidebar ? '✕':'☰'}
            </button>
            <h1 className="app-title">Task Manager App</h1>
            <div className="header-right">
                <img src="/logo.svg" alt="Logo" className="logo" />
                <img src="frontend/src/icons/man.png" alt="User" className="user-avatar" />
                {onLogout && (
                    <button 
                        onClick={onLogout} 
                        className="logout-btn"
                        style={{
                            marginLeft: '10px',
                            padding: '8px 16px',
                            backgroundColor: '#f44336',
                            color: 'white',
                            border: 'none',
                            borderRadius: '4px',
                            cursor: 'pointer',
                            fontSize: '14px'
                        }}
                    >
                        Logout
                    </button>
                )}
            </div>

        </header>
    )
}


export default Header;