import React, { useState } from 'react'
import { Routes, Route } from 'react-router-dom'
import Sidebar from './Sidebar'
import ChartView from './ChartView'
import Users from './Users'
import Histories from './Histories'
import '../Layouts/Dashboard.css'

const Dashboard = () => {
    const [sidebarOpen, setSidebarOpen] = useState(true);

    const toggleSidebar = () => {
        setSidebarOpen(!sidebarOpen);
    };

    return (
        <div className={`dashboard ${sidebarOpen ? 'sidebar-open' : 'sidebar-close'}`}>
            <Sidebar isOpen={sidebarOpen} toggleSidebar={toggleSidebar}/>
            <div className="main-container">
                <Routes>
                    <Route path="/" element={<ChartView />} />
                    <Route path="/users" element={<Users />} />
                </Routes>
            </div>
        </div>
    );
};

export default Dashboard
