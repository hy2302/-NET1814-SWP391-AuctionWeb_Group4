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
            const response = await fetch('http://localhost:5074/api/upcoming-auctions');
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
                <section className="categories-section">
                    <h2>Jewelry Types</h2>
                    <div className="categories-list">
                        {jewelryTypes.map(jewelryType => (
                            <a key={jewelryType.jewelry_type_id} href={`/jewelry-type/${jewelryType.jewelry_type_id}`}>
                                {jewelryType.jewelry_type_name}
                            </a>
                        ))}
                    </div>
                </section>
                <section className="jewelry-items-section">
                    <h2 >Jewelry Items</h2>
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
                </section>
                <section className="upcoming-auctions-section">
                    <h2>Upcoming Auctions</h2>
                    <Upcoming auctions={upcomingAuctions} />
                </section>
            </main>
            <footer className="auction-footer">
                <p>&copy; 2024 Auction Company. All rights reserved.</p>
            </footer>
        </div>
    );
};

export default AuctionViewUser;
