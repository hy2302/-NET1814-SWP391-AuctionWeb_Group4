import React, { useState } from "react"
import { useNavigate } from 'react-router-dom'
import './Home.css'
import Upcoming from '../AuctionItem/Upcoming'
import AboutUs from './AboutUs'
import Policy from './Policy'

const Home = () => {
    const navigate = useNavigate();
    return (
        <div className="work-section-wrapper">
            <Upcoming />
            <button onClick={() => navigate('/dashboard')}>Go to Dashboard</button>
            <Policy />
            <AboutUs />
        </div>
    );
};

export default Home
