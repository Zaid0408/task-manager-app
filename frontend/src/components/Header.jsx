import React, { useState, useEffect } from 'react';
import './Header.css'

function Header(){
    return(
        <header className="Header">
            <button className="menu-btn" aria-label="Open Sidebar">&#9776;</button>
            <h1 className="app-title">Task Manager App</h1>
            <div className="header-right">
                <img src="/logo.svg" alt="Logo" className="logo" />
                <img src="https://ui-avatars.com/api/?name=User" alt="User" className="user-avatar" />
            </div>

        </header>
    )
}


export default Header;