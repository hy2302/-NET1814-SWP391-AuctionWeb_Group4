import React from 'react';
import { useNavigate } from 'react-router-dom';
import PieChart from '../Charts/PieChart.jsx';
import LineChart from '../Charts/LineChart.jsx';
import Sidebar from './Sidebar.jsx';
import '../Layouts/Dashboard.css';

const Dashboard = () => {
  const navigate = useNavigate();
  return (
    <div className="dashboard">
      <Sidebar />
      <div className="main-container">
        <main className="main-content">
          <h1>Dashboard</h1>
          <h2>Website Statisctic</h2>
          
          <div className="toolbar">
            <button onClick={() => navigate('/*')} className="nav-button">Main</button>
            <button onClick={() => navigate('/users')} className="nav-button">Users</button>
            <button onClick={() => navigate('/histories')} className="nav-button">Histories</button>
          </div>
          
          <div className="charts">
            <PieChart />
            <LineChart />
          </div>
        </main>
      </div>
    </div>
  );
};

export default Dashboard;
