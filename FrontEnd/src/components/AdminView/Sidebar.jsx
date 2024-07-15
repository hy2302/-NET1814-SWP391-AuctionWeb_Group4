import React from 'react'
import { Link } from 'react-router-dom'
import '../Layouts/Sidebar.css'

const Sidebar = ({ isOpen, toggleSidebar }) => {
    return (
        <div className={`sidebar ${isOpen ? 'open' : 'closed'}`}>
            {isOpen && (
                <>
                    <div className="sidebar-header">
                        <h2>JewelryAuction</h2>
                        <button className="toggle-button" onClick={toggleSidebar}>☰</button>
                    </div>
                    <div className="sidebar-component">
                        <ul>
                            <li>
                                <Link to="/users">Users</Link>
                            </li>
                            <li>
                                <Link to="/histories">Histories</Link>
                            </li>
                            <li>
                                <Link to="/*">Back to main</Link>
                            </li>
                        </ul>
                    </div>
                </>
            )}
            {!isOpen && (
                <div className="sidebar-header">
                    <button className="toggle-button" onClick={toggleSidebar}> ☰ </button>
                </div>
            )}
        </div>
    );
};

export default Sidebar;
