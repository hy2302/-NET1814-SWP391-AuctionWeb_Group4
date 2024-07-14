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
                const mockJewelry = {
                    ...response.data,
                    auctionEndTime: new Date(new Date().getTime() + 7 * 24 * 60 * 60 * 1000).toISOString(),
                };
                setJewelry(mockJewelry);
            } catch (error) {
                alert('Failed to fetch jewelry details.');
            }
        };

        fetchJewelry();
    }, [id]);

    useEffect(() => {
        const fetchAuctions = async () => {
            try {
                const response = await axios.get('http://localhost:5074/api/Auction');
                const auctions = response.data;
                const matchingAuction = auctions.find(auction => auction.jewelryId === jewelry.jewelryId);
                setAuction(matchingAuction);
            } catch (error) {
                alert('Failed to fetch auction details.');
            }
        };

        fetchAuctions();
    }, [id]);

    useEffect(() => {
        if (auction) {
            const endTime = new Date(auction.auctionEndTime);
            setTimeLeft(calculateTimeLeft(endTime));

            const timer = setInterval(() => {
                setTimeLeft(calculateTimeLeft(endTime));
            }, 1000);

            return () => clearInterval(timer);
        }
    }, [auction]);

    function calculateTimeLeft(endTime) {
        const difference = +endTime - +new Date();
        let timeLeft = {};

        if (difference > 0) {
            timeLeft = {
                days: Math.floor(difference / (1000 * 60 * 60 * 24)),
                hours: Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
                minutes: Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60)),
                seconds: Math.floor((difference % (1000 * 60)) / 1000),
            };
        }

        return timeLeft;
    }

    if (!jewelry || !auction) {
        return <p>Loading...</p>;
    }

    return (
        <div className="jewelry-detail-container">
            <div className="jewelry-main">
                <img src={`data:image/jpeg;base64,${jewelry.jewelryImage}`} alt={jewelry.jewelryName} />
                <div className="jewelry-details">
                    <h2>{jewelry.jewelryName}</h2>
                    <p>
                        {timeLeft.days} days {timeLeft.hours} hours {timeLeft.minutes} minutes {timeLeft.seconds} seconds
                    </p>
                    <div className="jewelry-details-info">
                        <p><strong>Description:</strong> <span> {jewelry.jewelryDescription}</span></p>
                        <p><strong>Current price:</strong> <span className="jewelry-current-bid"> ${auction.startingPrice}</span></p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default JewelryDetail;
