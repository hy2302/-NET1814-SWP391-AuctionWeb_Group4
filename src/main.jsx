import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import App from './App.jsx'
import Login from './components/Login/Login.jsx'
import Dashboard from './components/AdminView/Dashboard.jsx'
import Users from './components/AdminView/Users.jsx'
import Histories from './components/AdminView/Histories.jsx'
import './index.css'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Router>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/login" element={<Login />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/users" element={<Users />} />
        <Route path="/histories" element={<Histories />} />
      </Routes>
    </Router>
  </React.StrictMode>,
)
