import React, { useState, useEffect } from 'react';

const OnGoingBiddingView = () => {
    const [ongoingAuctions, setOngoingAuctions] = useState([]);
    const [bidAmount, setBidAmount] = useState('');
    const [selectedAuction, setSelectedAuction] = useState(null);

    useEffect(() => {
        fetchOngoingAuctions();
    }, []);

    const fetchOngoingAuctions = async () => {
        try {
            const response = await fetch('http://localhost:5074/api/OngoingAuctions');
            const data = await response.json();
            setOngoingAuctions(data);
        } catch (error) {
            console.error('Error fetching ongoing auctions:', error);
        }
    };

    const handleBidAmountChange = (e) => {
        setBidAmount(e.target.value);
    };

    const handleBidSubmit = async (auctionId) => {
        try {
            const response = await fetch(`http://localhost:5074/api/Bid`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ AuctionId: auctionId, BidAmount: bidAmount })
            });
            if (response.ok) {
                alert('Bid placed successfully');
                setBidAmount('');
                setSelectedAuction(null);
                fetchOngoingAuctions(); // Refresh the ongoing auctions list
            } else {
                alert('Failed to place bid');
            }
        } catch (error) {
            console.error('Error placing bid:', error);
        }
    };

    const handleAuctionSelect = (auction) => {
        setSelectedAuction(auction);
    };

    return (
        <div>
            <h2>Ongoing Auctions</h2>
            <ul>
                {ongoingAuctions.map((auction) => (
                    <li key={auction.AuctionId}>
                        {auction.JewelryId} - Current Bid: ${auction.CurrentBid}
                        <button onClick={() => handleAuctionSelect(auction)}>Bid</button>
                    </li>
                ))}
            </ul>
            {selectedAuction && (
                <div>
                    <h3>Place a bid on {selectedAuction.JewelryId}</h3>
                    <input
                        type="number"
                        value={bidAmount}
                        onChange={handleBidAmountChange}
                        placeholder="Enter bid amount"
                    />
                    <button onClick={() => handleBidSubmit(selectedAuction.AuctionId)}>Submit Bid</button>
                </div>
            )}
        </div>
    );
};

export default OnGoingBiddingView;
