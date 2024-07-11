import React from 'react'
import './JewelryView.css'

const JewelryView = () => {
    return (
        <div>
            <div className="screen-container">
                <div className="screen-header">
                    <input className="search-bar" type="text" placeholder="Enter the auction keyword" />
                </div>
                <div className="screen-content">
                    <div className="sort-sidebar">
                        <div className="price-range">
                            <h4>Initial price range</h4>
                            <input type="range" min="1000" max="50000" />
                        </div>
                        <div className="jewelry-categories">
                            <h4>Categories</h4>
                            <ul>
                                <li>General</li>
                                <li>Rings</li>
                                <li>Necklaces</li>
                                <li>Bracelets</li>
                                <li>Watches</li>
                            </ul>
                        </div>
                    </div>
                    {/*<div className="jewelry-content">
                    {{Array.from({ length: 2 }).map((_, index) => (
                        <div className="item-card" key={index}>
                        <img className="item-image" src="path_to_image" alt="Pearl Necklace" />
                        <div className="item-details">
                            <p>Pearl Necklace</p>
                        </div>
                        </div>
                    ))}
                    </div>*/}
                </div>
            <button className="load-more-button">Load more</button>
            </div>
        </div>
    );
};

export default JewelryView;
