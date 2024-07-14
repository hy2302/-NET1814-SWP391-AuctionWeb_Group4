// OnGoingBiddingView.jsx
import React, { useState, useEffect } from 'react';
import apiService from './apiServiceBid';

const OnGoingBiddingView = () => {
  const [ongoingAuctions, setOngoingAuctions] = useState([]);
  const [bidAmount, setBidAmount] = useState('');
  const [selectedAuction, setSelectedAuction] = useState(null);

  useEffect(() => {
    fetchOngoingAuctions();
  }, []);

  const fetchOngoingAuctions = async () => {
    try {
      const response = await apiService.getBids();
      setOngoingAuctions(response);
    } catch (error) {
      console.error('Error fetching ongoing auctions:', error);
    }
  };

  const handleBidAmountChange = (e) => {
    setBidAmount(e.target.value);
  };

  const handleBidSubmit = async (auctionId) => {
    try {
      const bid = { AuctionId: auctionId, BidAmount: bidAmount, UserId: 1 };  // Assuming UserId = 1 for example
      const response = await apiService.createBid(bid);
      alert('Bid placed successfully');
      setBidAmount('');
      setSelectedAuction(null);
      fetchOngoingAuctions();  // Refresh the ongoing auctions list
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
            {auction.JewelryId} - Current Bid: ${auction.BidAmount}
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
