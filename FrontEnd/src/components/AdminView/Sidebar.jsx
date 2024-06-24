import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import '../Layouts/Sidebar.css'

const Sidebar = ({ isOpen, toggleSidebar }) => {
    const navigate = useNavigate();
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
                                <span onClick={() => navigate('/users')}>Users</span>
                            </li>
                            <li>
                                <span onClick={() => navigate('/histories')}>Histories</span>
                            </li>
                            <li>
                                <Link to="/*">Back to Main</Link>
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

export default Sidebar
