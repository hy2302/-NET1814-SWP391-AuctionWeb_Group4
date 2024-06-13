import React from 'react'
import './Home.css'
import Upcoming from '../AuctionView/Upcoming'
import AboutUs from './AboutUs'
import Policy from './Policy'

const Home = () => {
    return (
        <div className="work-section-wrapper">
            <Upcoming />
            <Policy />
            <AboutUs />
        </div>
    );
};

export default Home
