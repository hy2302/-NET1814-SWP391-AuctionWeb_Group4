import React from 'react'
import './JewelryView.css'

const JewelryView = () => {
    const scrollToTop = () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    return (
        <div>
            <div className="screen-container">
                <div className="screen-header">
                    <input className="search-bar" type="text" placeholder="Enter the keyword" />
                </div>
                <div className="screen-content">
                    <div className="sort-sidebar">
                        <div className="price-range">
                            <h4>Initial price range</h4>
                            <input type="range" min="1000" max="50000" />
                        </div>
                        <div className="jewelry-categories">
                            <h4>Categories</h4>
                            <div className='selection-box'>
                                <label>
                                    <input type="checkbox" name="category" value="Necklaces" />
                                    All
                                </label>
                                <label>
                                    <input type="checkbox" name="category" value="Necklaces" />
                                    Necklaces
                                </label>
                                <label>
                                    <input type="checkbox" name="category" value="Necklaces" />
                                    Rings
                                </label>
                                <label>
                                    <input type="checkbox" name="category" value="Necklaces" />
                                    Gems
                                </label>
                            </div>
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
            <div className="scroll-btn">
                <button onClick={scrollToTop}>Up</button>
            </div>
        </div>
    );
};

export default JewelryView;
