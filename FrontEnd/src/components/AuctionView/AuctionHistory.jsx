import React, { useState, useEffect } from 'react';

const AuctionHistory = () => {
    const [auctionHistory, setAuctionHistory] = useState([]);

    useEffect(() => {
        fetchAuctionHistory();
    }, []);

    const fetchAuctionHistory = async () => {
        try {
            const response = await fetch('http://localhost:5074/api/Auction/history');
            const data = await response.json();
            setAuctionHistory(data);
        } catch (error) {
            console.error('Error fetching auction history:', error);
        }
    };

    return (
        <div className="auction-history">
            <h2>Auction History</h2>
            <ul>
                {auctionHistory.map(auction => (
                    <li key={auction.AuctionId}>
                        {auction.JewelryId} - {auction.StartTime} to {auction.EndTime} - {auction.FinalPrice}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default AuctionHistory;
