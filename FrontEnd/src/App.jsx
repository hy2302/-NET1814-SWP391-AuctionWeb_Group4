import React, { useState, useEffect } from "react"
import { Route, Routes, useLocation } from 'react-router-dom'
import './App.css'
import Navbar from './components/Navbar/Navbar'
import Home from './components/Home/Home.jsx'
import Footer from './components/HeaderFooter/MainFooter.jsx'
import JewelryView from "./components/AuctionView/JewelryView.jsx"
import AuctionMainPage from "./components/AuctionView/AuctionMainPage.jsx"
import JewelryDetail from "./components/AuctionView/JewelryDetail.jsx"
import ScrollToTop from "./utils/ScrollToTop.jsx"

function App() {
    const [nav, setNav] = useState(true);
    const location = useLocation();
    const showSlider = !location.pathname.includes('/auctionmain') && !location.pathname.includes('/jewelrydetail');

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
            <ScrollToTop />
            <Navbar nav={nav} showSlider={showSlider} />
            <Routes>
                <Route path="/*" element={<Home />} />
                <Route path="/auctionmain" element={<AuctionMainPage />} />
                <Route path="/jewelryview" element={<JewelryView />} />
                <Route path="/jewelrydetail/:id" element={<JewelryDetail />} />
            </Routes>
            <Footer />
        </>
    );
}

export default App
