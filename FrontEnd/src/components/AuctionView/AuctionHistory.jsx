import React, { useState, useEffect } from 'react';

const AuctionHistory = () => {
    const [auctionHistory, setAuctionHistory] = useState([]);

    useEffect(() => {
        fetchAuctionHistory();
    }, []);

    const fetchAuctionHistory = async () => {
        try {
            const response = await fetch('http://localhost:5074/api/Auction');
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
                        Jewelry ID: {auction.JewelryId} | 
                        Start Time: {new Date(auction.StartTime).toLocaleString()} | 
                        End Time: {new Date(auction.EndTime).toLocaleString()} | 
                        Final Price: {auction.FinalPrice}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default AuctionHistory;
