import React from 'react';
import { Link } from 'react-router-dom';
import '../Layouts/Sidebar.css';

const Sidebar = () => {
  return (
    <div className="sidebar">
      <h2>Admin Dashboard</h2>
      <ul>
        <li>
          <Link to="/">1. Dashboard</Link>
        </li>
        <li>
          <Link to="/users">2. Users</Link>
        </li>
        <li>
          <Link to="/histories">3. Histories</Link> 
        </li>
      </ul>
    </div>
  );
};

export default Sidebar;
