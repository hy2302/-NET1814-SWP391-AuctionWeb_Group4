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
            text: "Lorem ipsum dolor sit amet consectetur. Maecenas orci et lorem ipsum",
        },
        {
            image: Money,
            title: "Secure Transaction",
            text: "Lorem ipsum dolor sit amet consectetur. Maecenas orci et lorem ipsum",
        },
        {
            image: Delivery,
            title: "Fast Delivery",
            text: "Lorem ipsum dolor sit amet consectetur. Maecenas orci et lorem ipsum",
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
                        Lorem ipsum dolor sit amet consectetur. Non tincidunt magna non et
                        elit. Dolor turpis molestie dui magnis facilisis at fringilla quam.
                        </p>
                    </div>
                </div>
            </div>
            <div className="work-section-policy">
                <div className="work-section-top">
                    <h1 className="primary-heading">HOW IT WORKS</h1>
                    <p className="primary-text">
                    Lorem ipsum dolor sit amet consectetur. Non tincidunt magna non et
                    elit. Dolor turpis molestie dui magnis facilisis at fringilla quam.
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
