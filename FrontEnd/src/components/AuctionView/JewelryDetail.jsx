import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import axios from 'axios'
import './JewelryDetail.css'

const JewelryDetail = () => {
    const { id } = useParams();
    const [jewelry, setJewelry] = useState(null);
    const [auction, setAuction] = useState(null);
    const [timeLeft, setTimeLeft] = useState({});

    useEffect(() => {
        const fetchJewelry = async () => {
            try {
                const response = await axios.get(`http://localhost:5074/api/Jewelry/${id}`);
                setJewelry(response.data);
            } catch (error) {
                alert('Failed to fetch jewelry details.');
                console.error('Error fetching jewelry details:', error);
            }
        };

        fetchJewelry();
    }, [id]);

    useEffect(() => {
        const fetchAuction = async () => {
            try {
                const response = await axios.get(`http://localhost:5074/api/Auction/ByJewelryId/${id}`);
                setAuction(response.data);
            } catch (error) {
                alert('Failed to fetch auction details.');
                console.error('Error fetching auction details:', error);
            }
        };

        fetchAuction();
    }, [id]);

    const handleBidChange = (amount) => {
        setBidAmount(prevBid => prevBid + amount);
    };

    const handleBidSubmit = async () => {
        const user = JSON.parse(localStorage.getItem('user'));
        const bidTime = new Date().toISOString();
        const bidData = {
            bidId: 0,
            customerId: user.customerId,
            auctionId: auction.auctionId,
            bidTime: bidTime,
            bidAmount: bidAmount,
            bidStatus: "Pending"
        };

        try {
            await axios.post('http://localhost:5074/api/Bid', bidData);
            alert('Bid submitted successfully!');
        } catch (error) {
            alert('Failed to submit bid.');
        }
    };

    useEffect(() => {
        if (auction) {
            const endTime = new Date(auction.endTime);
            const timer = setInterval(() => {
                const timeLeft = calculateTimeLeft(endTime);
                setTimeLeft(timeLeft);
            }, 1000);

            setTimeLeft(calculateTimeLeft(endTime));

            return () => clearInterval(timer);
        }
    }, [auction]);

    function calculateTimeLeft(endTime) {
        const difference = endTime - new Date();

        if (difference < 0) {
            return {
                days: 0,
                hours: 0,
                minutes: 0,
                seconds: 0
            };
        }

        let timeLeft = {
            days: Math.floor(difference / (1000 * 60 * 60 * 24)),
            hours: Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
            minutes: Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60)),
            seconds: Math.floor((difference % (1000 * 60)) / 1000),
        };

        return timeLeft;
    }

    if (!jewelry || !auction) {
        return <p>Loading...</p>;
    }

    const isAuctionEnded = timeLeft.days === 0 && timeLeft.hours === 0 && timeLeft.minutes === 0 && timeLeft.seconds === 0;

    return (
        <div className="jewelry-detail-container">
            <div className="jewelry-main">
                <img src={`data:image/jpeg;base64,${jewelry.jewelryImage}`} alt={jewelry.jewelryName} />
                <div className="jewelry-details">
                    <h2>{jewelry.jewelryName}</h2>
                    <div className="jewelry-details-info">
                        <p><strong>Description:</strong> {jewelry.jewelryDescription}</p>
                        <p><strong>Current Price:</strong> ${auction.currentBidding}</p>
                    </div>
                    {isAuctionEnded ? (
                        <p className='auction-status'>Auction Ended</p>
                    ):(
                        <div>
                            <p className='auction-status'>
                                {timeLeft.days} days {timeLeft.hours} hours {timeLeft.minutes} minutes {timeLeft.seconds} seconds left
                            </p>
                            <div className="bid-section">
                                <button onClick={() => handleBidChange(-10)}>-</button>
                                <input type="text" value={bidAmount} readOnly className="bid-input"/>
                                <button onClick={() => handleBidChange(10)}>+</button>
                                <button onClick={handleBidSubmit} className="bid-button">Bid</button>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default JewelryDetail
