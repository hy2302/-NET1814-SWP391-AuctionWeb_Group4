import React from 'react';
import { useNavigate } from 'react-router-dom';
import PieChart from '../Charts/PieChart';
import LineChart from '../Charts/LineChart';

import '../Layouts/Dashboard.css';
import '../AdminView/Sidebar'
import Sidebar from '../AdminView/Sidebar.jsx';

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
      
      <Sidebar/>
      <main>
        <h1>Dashboard</h1>
        <p>Welcome to the admin dashboard. Here you can manage your application.</p>
        <div className="buttons">
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
  );
};

export default Dashboard;
