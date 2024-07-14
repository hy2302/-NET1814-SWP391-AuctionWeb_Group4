import React, { useState, useEffect } from 'react';

const AuctionManagement = () => {
    const [auctions, setAuctions] = useState([]);
    const [newAuction, setNewAuction] = useState({
        JewelryId: '',
        StaffId: '',
        StartTime: '',
        EndTime: '',
        AuctionStatus: '',
        StartingPrice: '',
        FinalPrice: ''
    });

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

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setNewAuction({ ...newAuction, [name]: value });
    };

    const handleAuctionCreate = async () => {
        try {
            const response = await fetch('http://localhost:5074/api/Auction', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(newAuction)
            });
            if (response.ok) {
                alert('Auction created successfully');
                fetchAuctions(); // Refresh the list of auctions
            } else {
                alert('Failed to create auction');
            }
        } catch (error) {
            console.error('Error creating auction:', error);
        }
    };

    const handleAuctionDelete = async (auctionId) => {
        try {
            const response = await fetch(`http://localhost:5074/api/Auction/${auctionId}`, {
                method: 'DELETE'
            });
            if (response.ok) {
                alert('Auction deleted successfully');
                fetchAuctions(); // Refresh the list of auctions
            } else {
                alert('Failed to delete auction');
            }
        } catch (error) {
            console.error('Error deleting auction:', error);
        }
    };

    return (
        <div className="auction-management">
            <h2>Auction Management</h2>
            <ul>
                {auctions.map(auction => (
                    <li key={auction.AuctionId}>
                        {auction.JewelryId} - {auction.StartTime} to {auction.EndTime} - {auction.AuctionStatus}
                        <button onClick={() => handleAuctionDelete(auction.AuctionId)}>Delete</button>
                    </li>
                ))}
            </ul>
            <div>
                <h3>Create New Auction</h3>
                <input
                    type="text"
                    name="JewelryId"
                    value={newAuction.JewelryId}
                    onChange={handleInputChange}
                    placeholder="Jewelry ID"
                />
                <input
                    type="text"
                    name="StaffId"
                    value={newAuction.StaffId}
                    onChange={handleInputChange}
                    placeholder="Staff ID"
                />
                <input
                    type="datetime-local"
                    name="StartTime"
                    value={newAuction.StartTime}
                    onChange={handleInputChange}
                />
                <input
                    type="datetime-local"
                    name="EndTime"
                    value={newAuction.EndTime}
                    onChange={handleInputChange}
                />
                <input
                    type="text"
                    name="AuctionStatus"
                    value={newAuction.AuctionStatus}
                    onChange={handleInputChange}
                    placeholder="Auction Status"
                />
                <input
                    type="number"
                    name="StartingPrice"
                    value={newAuction.StartingPrice}
                    onChange={handleInputChange}
                    placeholder="Starting Price"
                />
                <input
                    type="number"
                    name="FinalPrice"
                    value={newAuction.FinalPrice}
                    onChange={handleInputChange}
                    placeholder="Final Price"
                />
                <button onClick={handleAuctionCreate}>Create Auction</button>
            </div>
        </div>
    );
};

export default AuctionManagement;
