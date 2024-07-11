import React, { useState, useEffect } from 'react';

const AuctionManagement = () => {
    const [auctions, setAuctions] = useState([]);

    useEffect(() => {
        fetchAuctions();
    }, []);

    const fetchAuctions = async () => {
        try {
            const response = await fetch('http://localhost:5074/api/Auction');
            const data = await response.json();
            setAuctions(data);
        } catch (error) {
            console.error('Error fetching auctions:', error);
        }
    };

    return (
        <div className="auction-management">
            <h2>Auction Management</h2>
            <ul>
                {auctions.map(auction => (
                    <li key={auction.AuctionId}>
                        {auction.JewelryId} - {auction.StartTime} to {auction.EndTime} - {auction.AuctionStatus}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default AuctionManagement;
