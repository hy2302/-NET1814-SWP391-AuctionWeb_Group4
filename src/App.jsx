import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Dashboard from './components/AdminView/Dashboard';
import Users from './components/AdminView/Users';
import Histories from './components/AdminView/Histories';
import Sidebar from './components/AdminView/Sidebar';

const App = () => {
  return (
    <Router>
      <div className="App">
        <Sidebar />
        <div className="content">
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/users" element={<Users />} />
            <Route path="/histories" element={<Histories />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
};

export default App;
