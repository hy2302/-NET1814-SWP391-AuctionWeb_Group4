import React, { useState } from 'react'
import Sidebar from './Sidebar'
import PieChart from '../charts/PieChart'
import LineChart from '../charts/LineChart'
import '../layouts/Dashboard.css'

const Dashboard = () => {
  const [sidebarOpen, setSidebarOpen] = useState(true);

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  return (
    <div className="dashboard">
      <Sidebar isOpen={sidebarOpen} toggleSidebar={toggleSidebar} />
      <div className={`main-container ${sidebarOpen ? 'sidebar-open' : 'sidebar-close'}`}>
        <main className="main-content">
          <h1>Dashboard</h1>
          <div className="charts">
            <PieChart />
            <LineChart />
          </div>
        </main>
      </div>
    </div>
  );
};

export default Dashboard
