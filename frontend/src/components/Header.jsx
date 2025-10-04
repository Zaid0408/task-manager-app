import React, { useState, useEffect } from 'react';
import './Header.css'

function Header({onSidebarClick, isOpenSidebar}){
    return(
        <header className="Header">
            <button className="menu-btn" aria-label="Open Sidebar" onClick ={onSidebarClick}>
                {isOpenSidebar ? '✕':'☰'}
            </button>
            <h1 className="app-title">Task Manager App</h1>
            <div className="header-right">
                <img src="/logo.svg" alt="Logo" className="logo" />
                <img src="frontend/src/icons/man.png" alt="User" className="user-avatar" />
            </div>

        </header>
    )
}


export default Header;