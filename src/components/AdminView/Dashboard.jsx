import React from 'react';
import PieChart from '../Charts/PieChart';
import LineChart from '../Charts/LineChart';
import Header from '../Header & Footer/Header';
import Footer from '../Header & Footer/Footer';
import '../Layouts/Dashboard.css';

const Dashboard = () => {
  return (
    <div>
      <Header/>
      <h1>Dashboard</h1>
      <p>Welcome to the admin dashboard. Here you can manage your application.</p>
      <div className="charts">
        <PieChart />
        <LineChart />
      </div>
      {/* Add your dashboard components here */}
      <Footer/>
    </div>
  );
};

export default Dashboard;
