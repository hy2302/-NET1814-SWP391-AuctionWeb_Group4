import React, { useState, useEffect } from "react"
import { Route, Routes, useNavigate } from 'react-router-dom'
import './App.css'
import Navbar from './components/Navbar/Navbar'
import Home from './components/Home/Home.jsx'
import Footer from './components/Footer/MainFooter.jsx'
import AuctionView from './components/AuctionItem/AuctionView.jsx'

function App() {
<<<<<<< Updated upstream:src/App.jsx
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
        </div>
      </div>
    </>
  )
=======
    const [nav, setNav] = useState(true);

    const changeNavBackground = () => {
        if (window.scrollY >= 150) {
            setNav(false);
        } else {
            setNav(true);
        }
    }

    useEffect(() => {
        window.addEventListener('scroll', changeNavBackground);
        return () => {
            window.removeEventListener('scroll', changeNavBackground);
        };
    }, []);

    return (
        <>
            <Navbar nav={nav} />
            <Routes>
                <Route path="/*" element={<Home />} />
                <Route path="/auctionview" element={<AuctionView />} />
            </Routes>
            <Footer />
        </>
    )
>>>>>>> Stashed changes:FrontEnd/src/App.jsx
}

export default App
