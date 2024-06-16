import React, { useState, useEffect } from "react"
import { Route, Routes, useNavigate } from 'react-router-dom'
import './App.css'
import Navbar from './components/Navbar/Navbar'
import Home from './components/Home/Home.jsx'
import Footer from './components/HeaderFooter/MainFooter.jsx'
import AuctionView from './components/AuctionView/AuctionView.jsx'

function App() {
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
}

export default App