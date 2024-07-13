import React from 'react'
import './Home.css'
import AboutUs from './AboutUs'
import Policy from './Policy'
import AuctionPreview from './AuctionPreview'

const Home = () => {
    return (
        <div className="work-section-wrapper">
            <AuctionPreview />
            <Policy />
            <AboutUs />
        </div>
    );
};

export default Home
