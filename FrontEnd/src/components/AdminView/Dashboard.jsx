import React from 'react';
import PieChart from '../Charts/PieChart.jsx';
import LineChart from '../Charts/LineChart.jsx';
import Sidebar from './Sidebar.jsx';
import '../Layouts/Dashboard.css';

const Dashboard = () => {
  return (
    <div className="dashboard">
      <Sidebar />
      <div className="main-container">
        <main className="main-content">
          <h1>Dashboard</h1>
          <h2>Website Statisctic</h2>
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
