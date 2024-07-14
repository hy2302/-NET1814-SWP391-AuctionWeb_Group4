import React, { useState, useEffect } from "react"
import { Route, Routes, useLocation } from 'react-router-dom'
import './App.css'
import Navbar from './components/Navbar/Navbar'
import Home from './components/Home/Home.jsx'
import Footer from './components/HeaderFooter/MainFooter.jsx'
import JewelryView from "./components/AuctionView/JewelryView.jsx"
import AuctionMainPage from "./components/AuctionView/AuctionMainPage.jsx"

function App() {
    const [nav, setNav] = useState(true);
    const location = useLocation();

    const changeNavBackground = () => {
        if (window.scrollY >= 150) {
            setNav(false);
        } else {
            setNav(true);
        }
    };

    useEffect(() => {
        window.addEventListener('scroll', changeNavBackground);
        return () => {
            window.removeEventListener('scroll', changeNavBackground);
        };
    }, []);

    return (
        <>
            <Navbar nav={nav} showSlider={!location.pathname.includes('/auctionmain')} />
            <Routes>
                <Route path="/*" element={<Home />} />
                <Route path="/auctionmain" element={<AuctionMainPage />} />
                <Route path="/jewelryview" element={<JewelryView />} />
            </Routes>
            <Footer />
        </>
    );
}

export default App
