import React, { useState, useEffect } from 'react';
import Upcoming from './Upcoming';
import '../layouts/AuctionViewUser.css';

const AuctionViewUser = () => {
    const [categories, setCategories] = useState([]);
    const [upcomingAuctions, setUpcomingAuctions] = useState([]);

    useEffect(() => {
        fetchCategories();
        fetchUpcomingAuctions();
    }, []);

    const fetchCategories = async () => {
        try {
            const response = await fetch('http://localhost:5074/api/categories');
            const data = await response.json();
            setCategories(data);
        } catch (error) {
            console.error('Error fetching categories:', error);
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
                    <a href="/abouts">About</a>
                </nav>
            </header>
            <main className="auction-main">
                <section className="categories-section">
                    <h2>Categories</h2>
                    <div className="categories-list">
                        {categories.map(category => (
                            <a key={category.id} href={`/category/${category.slug}`}>
                                {category.name}
                            </a>
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
