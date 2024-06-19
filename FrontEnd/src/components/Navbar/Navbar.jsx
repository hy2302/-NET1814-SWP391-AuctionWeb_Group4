import React, { useState } from "react"
import { useNavigate } from 'react-router-dom'
import { Link } from "react-scroll"
import '../Navbar/Navbar.css'
import ImageSlider from '../Home/ImageSlider'

const Navbar = ({ nav }) => {
    const navigate = useNavigate();
    const [click, setClick] = useState(false);

    const scrollToTop = () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    const handleHomeClick = () => {
        if (location.pathname === "/*") {
            scrollToTop();
        } else {
            navigate('/*');
        }
    };

    const slides = [
        { url: "https://i.pinimg.com/736x/db/a8/61/dba8610978b24efe8a92164249aff577.jpg", title: "Timeless Splendor", content: "Discover timeless elegance and modern marvels at our jewelry auction. Bid on treasures that sparkle with history and allure." },
        { url: "https://i.pinimg.com/564x/38/e4/df/38e4df1a2254f10fe4b75662b185bb88.jpg", title: "Elegance Redefined", content: "Elevate your style with our curated collection of rare and exquisite jewelry pieces. Join the excitement of our exclusive auctions." },
        { url: "https://i.pinimg.com/originals/83/32/4b/83324bd95c1867269657669d54bfa223.jpg", title: "Radiance Revealed", content: "Shine bright like never before. Explore our curated selection of fine jewelry, where every piece is a masterpiece waiting to be discovered." },
        { url: "https://i.pinimg.com/564x/f8/74/aa/f874aa78b7915b4ce41710a4c824df2f.jpg", title: "Journey to Refinement", content: "Journey through a world of elegance and sophistication. Bid on breathtaking jewelry pieces that define luxury and refinement." },
    ];

    const containerStyles = {
        width: "100%",
        height: "100%",
    };

    return (
        <div className={`navbar ${nav ? 'navbar-transparent' : 'navbar-black'}`}>
            <div className="slider-container" style={containerStyles}>
                <ImageSlider slides={slides} parentWidth={1520} />
            </div>
            <div className='navbar-header'>
                <span onClick={handleHomeClick}>Home</span>
                <span onClick={() => navigate('/auctionviewuser')}>Auction</span>
                <span onClick={() => navigate('/dashboard')}>Dashboard</span>
                <Link to="policy" spy={true} smooth={true} offset={-100} duration={500} onSetActive={setClick}>Policy</Link>
                <Link to="about" spy={true} smooth={true} offset={-100} duration={500} onSetActive={setClick}>About</Link>
                <button className="login-btn" onClick={() => navigate('/login')}>Join Us</button>
            </div>
        </div>
    );
};

export default Navbar