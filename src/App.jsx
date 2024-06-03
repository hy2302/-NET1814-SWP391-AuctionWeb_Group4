import { useNavigate } from 'react-router-dom';
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

function App() {
  const navigate = useNavigate();
  
  return (
    <>
      <div>
        <a href="https://vitejs.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
        <div>
          <h1>Main Page</h1>
          <button onClick={() => navigate('/login')}>Go to Login</button>
          <button onClick={() => navigate('/dashboard')}>Go to Dashboard</button>
          <button onClick={() => navigate('/policies')}>View Policy</button> 
          <button onClick={() => navigate('/abouts')}>About Us</button> 
        </div>
      </div>
    </>
  )
}

export default App