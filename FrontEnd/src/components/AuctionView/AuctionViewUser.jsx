import React from 'react';
import Upcoming from './Upcoming';
import '../Layouts/AuctionViewUser.css';

const AuctionViewUser = () => {
    return (
        <div className="auction-container">
            <header className="auction-header">
                <div className="logo">AuctionLogo</div>
                <nav className="auction-nav">
                    <a href="/*">Home</a>
                    <a href="/abouts">About</a>
                </nav>
            </header>
            <main className="auction-main">
                <section className="categories-section">
                    <h2>Categories</h2>
                    <div className="categories-list">
                        <a href="/category/jewelry">Jewelry</a>
                       
                    </div>
                </section>
                <section className="upcoming-auctions-section">
                    <h2>Upcoming Auctions</h2>
                    <Upcoming />
                </section>
            </main>
            <footer className="auction-footer">
                <p>&copy; 2024 Auction Company. All rights reserved.</p>
            </footer>
        </div>
    );
};

export default AuctionViewUser;
