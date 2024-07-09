import React, { useState, useEffect } from 'react';
import Upcoming from './Upcoming';
import '../Layouts/AuctionViewUser.css';

const AuctionViewUser = () => {
    const [jewelryTypes, setJewelryTypes] = useState([]);
    const [jewelryItems, setJewelryItems] = useState([]);
    const [upcomingAuctions, setUpcomingAuctions] = useState([]);

    useEffect(() => {
        fetchJewelryTypes();
        fetchJewelryItems();
        fetchUpcomingAuctions();
    }, []);

    const fetchJewelryTypes = async () => {
        try {
            const response = await fetch('http://localhost:5074/api/JewelryType');
            const data = await response.json();
            setJewelryTypes(data);
        } catch (error) {
            console.error('Error fetching jewelry types:', error);
        }
    };

    const fetchJewelryItems = async () => {
        try {
            const response = await fetch('http://localhost:5074/api/Jewelry');
            const data = await response.json();
            setJewelryItems(data);
        } catch (error) {
            console.error('Error fetching jewelry items:', error);
        }
    };

    const fetchUpcomingAuctions = async () => {
        try {
            const response = await fetch('http://localhost:5074/api/Auction');
            const data = await response.json();
            setUpcomingAuctions(data);
        } catch (error) {
            console.error('Error fetching upcoming auctions:', error);
        }
    };

    return (
        <div className="auction-container">
            <header className="auction-header">
                <div className="logo">AuctionLogo</div>
                <nav className="auction-nav">
                    <a href="/">Home</a>
                    <a href="/about">About</a>
                </nav>
            </header>
            <main className="auction-main">
                <section className="filter-section">
                    <div className="filter-header">
                        <h2>Filter by</h2>
                    </div>
                    <div className="price-filter">
                        <h3>Initial price range</h3>
                        <input type="range" min="100" max="500" />
                    </div>
                    <div className="category-filter">
                        <h3>Categories</h3>
                        <ul>
                            <li>General (12)</li>
                            <li>Bracelets (5)</li>
                            <li>Watches (8)</li>
                            <li>Rings (8)</li>
                        </ul>
                    </div>
                    <div className="display-filter">
                        <h3>Display</h3>
                        <ul>
                            <li>Upcoming items</li>
                            <li>Ongoing items</li>
                            <li>Past items</li>
                        </ul>
                    </div>
                </section>
                <section className="jewelry-items-section">
                    <div className="search-bar">
                        <input type="text" placeholder="Enter auction keyword" />
                        <select>
                            <option value="ending-soonest">Sort by: Ending soonest</option>
                        </select>
                    </div>
                    <div className="jewelry-items-list">
                        {jewelryItems.map(jewelry => (
                            <div key={jewelry.jewelry_id} className="jewelry-item">
                                <img src={jewelry.jewelry_image} alt={jewelry.jewelry_name} />
                                <h3>{jewelry.jewelry_name}</h3>
                                <p>{jewelry.jewelry_description}</p>
                                <p>Status: {jewelry.jewelry_status}</p>
                            </div>
                        ))}
                    </div>
                    <button className="load-more">Load more</button>
                </section>
            </main>
            <footer className="auction-footer">
                <p>&copy; 2024 Auction Company. All rights reserved.</p>
            </footer>
        </div>
    );
};

export default AuctionViewUser;
