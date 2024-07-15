import React, { useState } from 'react'
import { Routes, Route } from 'react-router-dom'
import Sidebar from './Sidebar'
import Users from './Users'
import Histories from './Histories'
import Income from './Income'
import '../Layouts/Dashboard.css'

const Dashboard = () => {
    const [sidebarOpen, setSidebarOpen] = useState(true);

    const toggleSidebar = () => {
        setSidebarOpen(!sidebarOpen);
    };

    return (
        <div className={`dashboard ${sidebarOpen ? 'sidebar-open' : 'sidebar-close'}`}>
            <Sidebar isOpen={sidebarOpen} toggleSidebar={toggleSidebar} />
            <div className="main-container">
                <Income />
                <Routes>
                    <Route path="/users" element={<Users />} />
                    <Route path="/histories" element={<Histories />} />
                </Routes>
            </div>
        </div>
    );
};

export default Dashboard
