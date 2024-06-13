import React from 'react';
import { useNavigate } from 'react-router-dom';
import PieChart from '../Charts/PieChart';
import LineChart from '../Charts/LineChart';
import Sidebar from '../AdminView/Sidebar.jsx';
import '../Layouts/Dashboard.css';

const Dashboard = () => {
  const navigate = useNavigate();

  const navigateToMain = () => {
    navigate('/');
  };

  const navigateToUsers = () => {
    navigate('/users');
  };

  const navigateToHistories = () => {
    navigate('/histories');
  };

  return (
    <div className="dashboard">
      <Sidebar />
      <div className="main-container">
        <main className="main-content">
          <h1>Dashboard</h1>
          <h2>Website Statisctic</h2>
          
          <div className="toolbar">
            <button onClick={navigateToMain} className="nav-button">Main</button>
            <button onClick={navigateToUsers} className="nav-button">Users</button>
            <button onClick={navigateToHistories} className="nav-button">Histories</button>
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
