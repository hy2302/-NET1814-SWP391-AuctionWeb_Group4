import React, { useState, useEffect } from "react"
import { Route, Routes, useNavigate } from 'react-router-dom'
import './App.css'
import Navbar from './components/Navbar/Navbar'
import Home from './components/Home/Home.jsx'
import Footer from './components/HeaderFooter/MainFooter.jsx'
import AuctionViewUser from './components/AuctionView/AuctionViewUser.jsx'
import ProtectedRoutes from "./utils/ProtectedRoutes.jsx"
import Dashboard from './components/AdminView/Dashboard.jsx'
import Users from './components/AdminView/Users.jsx'
import Histories from './components/AdminView/Histories.jsx'
import AppraisalForm from './components/staffView/AppraisalForm.jsx'

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
                <Route path="/auctionviewuser" element={<AuctionViewUser />} />
                <Route element={<ProtectedRoutes/>}>
                    <Route path="/dashboard" element={<Dashboard />} />
                    <Route path="/users" element={<Users />} />
                    <Route path="/histories" element={<Histories />} />
                    <Route path="/appraisals" element={<AppraisalForm/>}/>
                </Route>
            </Routes>
            <Footer />
        </>
    )
}

export default App