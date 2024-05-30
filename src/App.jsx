import { BrowserRouter as Router, Routes, Route, useNavigate } from 'react-router-dom';
import reactLogo from './assets/react.svg';
import viteLogo from '/vite.svg';
import Dashboard from '../src/components/AdminView/Dashboard';
import Users from '../src/components/AdminView/Users';
import Histories from '../src/components/AdminView/Histories';
import './App.css';

function App() {
  return (
    <Router>
      <div className="app">
        <nav className="navigation">
          <a href="https://vitejs.dev" target="_blank" rel="noopener noreferrer">
            <img src={viteLogo} className="logo" alt="Vite logo" />
          </a>
          <a href="https://react.dev" target="_blank" rel="noopener noreferrer">
            <img src={reactLogo} className="logo react" alt="React logo" />
          </a>
        </nav>
        <main>
          <Routes>
            <Route path="/" element={<MainPage />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/users" element={<Users />} />
            <Route path="/histories" element={<Histories />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

function MainPage() {
  const navigate = useNavigate();

  return (
    <div>
      <h1>Main Page</h1>
      <button onClick={() => navigate('/login')}>Go to Login</button>
      <button onClick={() => navigate('/dashboard')}>Go to Dashboard</button>
    </div>
  );
}

export default App;
