import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../Layouts/About.css';
import about1 from '../../assets/about1.png';
import about2 from '../../assets/about2.png';
import about3 from '../../assets/about3.png';

const About = () => {
    const navigate = useNavigate();
  
  return (
    <div>
      
      <div className="about-container">
        <h1>About Us</h1>

        <section className="about-section">
          <h2>Introduction</h2>
          <p>We are a leading auction platform dedicated to providing a seamless and secure auction experience for both buyers and sellers. Our team is passionate about delivering exceptional service and helping you find unique and valuable items.</p>
        </section>

        <section className="about-section">
          <h2>Mission and Vision</h2>
          <p><strong>Mission Statement:</strong> Our mission is to connect buyers and sellers through a transparent and trustworthy auction process, ensuring satisfaction and value for all parties involved.</p>
          <p><strong>Vision Statement:</strong> Our vision is to be the most trusted and innovative auction platform, empowering individuals and businesses to discover and trade exceptional items globally.</p>
        </section>

        <section className="about-section">
          <h2>Services Offered</h2>
          <p><strong>Auction Types:</strong> We host various types of auctions including live auctions, silent auctions, and online-only auctions to cater to different preferences and needs.</p>
          <p><strong>Categories:</strong> Our platform features a wide range of product categories including diamonds, rubies, gold, and more. We ensure that all items listed are of the highest quality and authenticity.</p>
        </section>

        <section className="about-section">
          <h2>How it Works</h2>
          <p>Our auction process is simple and user-friendly. Register for an account, browse through our extensive listings, place your bids, and if you win, complete the payment to receive your item. We are committed to providing a smooth and enjoyable auction experience.</p>
        </section>

        <section className="about-section">
          <h2>Some of Our Auctions</h2>
          <div className="auction-images">
            <img src={about1} alt="Auction 1" className="auction-image" />
            <img src={about2} alt="Auction 2" className="auction-image" />
            <img src={about3} alt="Auction 3" className="auction-image" />
          </div>
        </section>

        <section className="about-section">
          <h2>Sign Up</h2>
          <p>Join our community and start participating in exciting auctions today. 
            <a href="/login">Sign up</a> to create your account and begin your auction journey with us.</p>
          <button onClick={() => navigate('/login')}>Go to Login</button>
        </section>
        <button onClick={() => navigate('/')}>Back to Main</button>
      </div>
     
    </div>
  );
};

export default About;
