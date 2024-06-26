import React from 'react'
import Delivery from '../../assets/delivery.png'
import Auction from '../../assets/auction.png'
import Money from '../../assets/coin.png'
import PolicyBg from '../../assets/policy-bg.jpg'
import './Policy.css'

function Policy (){

    const workInfoData = [
        {
            image: Auction,
            title: "Live Auction",
            text: "Experience the excitement of our live jewelry auctions, where treasures find new homes.",
        },
        {
            image: Money,
            title: "Secure Transaction",
            text: "Shop with confidence knowing that all transactions are securely encrypted.",
        },
        {
            image: Delivery,
            title: "Fast Delivery",
            text: "Enjoy swift and reliable delivery, ensuring your jewelry reaches you promptly.",
        },
    ];

    return (
        <div className="work-section-wrapper" id="policy">
            <div className="policy-section">
                <div className="policy-container">
                    <div className="policy-section-img">
                        <img src={PolicyBg}></img>
                    </div>
                    <div className="policy-section-bottom">
                        <h1 className="primary-heading">OUR PRIVATE POLICY</h1>
                        <p className="primary-text">
                        At our website, we protect your personal information with a strict privacy policy and advanced security measures. 
                        Your data is always safe with us.
                        </p>
                    </div>
                </div>
            </div>
            <div className="work-section-policy">
                <div className="work-section-top">
                    <h1 className="primary-heading">HOW IT WORKS</h1>
                    <p className="primary-text">
                    Join our live auctions to bid on stunning jewelry pieces in real-time, connecting with 
                    fellow enthusiasts and finding your next treasure.
                    </p>
                </div>
                <div className="work-section-bottom">
                    {workInfoData.map((data) => (
                        <div className="work-section-info" key={data.title}>
                            <div className="info-boxes-img-container">
                                <img src={data.image} alt="" />
                            </div>
                            <h2>{data.title}</h2>
                            <p>{data.text}</p>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}

export default Policy