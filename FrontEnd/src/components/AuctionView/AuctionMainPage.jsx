import React, { useState } from 'react'
import Box from '@mui/material/Box'
import Slider from '@mui/material/Slider'
import Typography from '@mui/material/Typography'
import './AuctionMainPage.css'

const MAX = 1000;
const MIN = 0;
const marks = [
    {
        value: MIN,
        label: '',
    },
    {
        value: MAX,
        label: '',
    },
];

const jewelries = [
    { id: 1, name: 'Diamond Ring', category: 'Diamond', price: 300.00, image: 'https://tse4.mm.bing.net/th?id=OIP.P0udrBXOIIMIc6KeA5qkkwAAAA&pid=Api&P=0&h=180', status: 'Ended Soon' },
    { id: 2, name: 'Ruby Ring', category: 'Ruby', price: 150.00, image: 'https://tse4.mm.bing.net/th?id=OIP.P0udrBXOIIMIc6KeA5qkkwAAAA&pid=Api&P=0&h=180', status: 'Ended Soon' },
    { id: 3, name: 'Silver Necklace', category: 'Silver', price: 250.00, image: 'https://tse4.mm.bing.net/th?id=OIP.P0udrBXOIIMIc6KeA5qkkwAAAA&pid=Api&P=0&h=180', status: 'Upcoming' },
    { id: 4, name: 'Topaz Ring', category: 'Topaz', price: 180.00, image: 'https://tse4.mm.bing.net/th?id=OIP.P0udrBXOIIMIc6KeA5qkkwAAAA&pid=Api&P=0&h=180', status: 'In Process' },
    { id: 5, name: 'Gold Pendant', category: 'Gold', price: 400.00, image: 'https://tse4.mm.bing.net/th?id=OIP.P0udrBXOIIMIc6KeA5qkkwAAAA&pid=Api&P=0&h=180', status: 'In Process' },
    { id: 6, name: 'Ruby Pendant', category: 'Ruby', price: 230.00, image: 'https://tse4.mm.bing.net/th?id=OIP.P0udrBXOIIMIc6KeA5qkkwAAAA&pid=Api&P=0&h=180', status: 'Upcoming' },
    { id: 7, name: 'Gold Bracelet', category: 'Gold', price: 280.00, image: 'https://tse4.mm.bing.net/th?id=OIP.P0udrBXOIIMIc6KeA5qkkwAAAA&pid=Api&P=0&h=180', status: 'Upcoming' },
    { id: 8, name: 'Silver Ring', category: 'Silver', price: 100.00, image: 'https://tse4.mm.bing.net/th?id=OIP.P0udrBXOIIMIc6KeA5qkkwAAAA&pid=Api&P=0&h=180', status: 'Ended Soon' },
    { id: 9, name: 'Emerald Gem', category: 'Emerald', price: 350.00, image: 'https://tse4.mm.bing.net/th?id=OIP.P0udrBXOIIMIc6KeA5qkkwAAAA&pid=Api&P=0&h=180', status: 'Upcoming' },
];

const statusOptions = ['All', 'Upcoming', 'In Process', 'Ended Soon'];

const AuctionMainPage = () => {
    const [val, setVal] = useState(MIN);
    const [visibleItems, setVisibleItems] = useState(6);
    const [selectedStatus, setSelectedStatus] = useState('All');

    const handleChange = (_, newValue) => {
        setVal(newValue);
    };

    const handleStatusChangeClick = (status) => {
        setSelectedStatus(status);
    };

    const handleLoadMore = () => {
        setVisibleItems((prevVisibleItems) => prevVisibleItems + 6);
    };

    const filteredJewelries = selectedStatus === 'All'
        ? jewelries
        : jewelries.filter(jewelries => jewelries.status === selectedStatus);

    return (
        <div className="screen-container">
            <div className="screen-header">
                <input className="search-bar" type="text" placeholder="Enter the auction keyword" />
            </div>
            <div className="screen-content">
                <div className="sort-sidebar">
                    <div className="price-range">
                        <h4>Initial price range</h4>
                        <Box sx={{ width: 200 }}>
                            <Slider
                                marks={marks}
                                step={10}
                                value={val}
                                valueLabelDisplay="auto"
                                min={MIN}
                                max={MAX}
                                onChange={handleChange}
                            />
                            <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                            <Typography
                                variant="body2"
                                onClick={() => setVal(MIN)}
                                sx={{ cursor: 'pointer' }}
                            >
                                ${MIN}
                            </Typography>
                            <Typography
                                variant="body2"
                                onClick={() => setVal(MAX)}
                                sx={{ cursor: 'pointer' }}
                            >
                                ${MAX}
                            </Typography>
                            </Box>
                        </Box>
                    </div>
                    <div className="jewelry-categories">
                        <h4>Categories</h4>
                        <div className='selection-box'>
                            <label>
                                <input type="checkbox" name="category" value="Diamond" />
                                Diamond
                            </label>
                            <label>
                                <input type="checkbox" name="category" value="Ruby" />
                                Ruby
                            </label>
                            <label>
                                <input type="checkbox" name="category" value="Silver" />
                                Silver
                            </label>
                            <label>
                                <input type="checkbox" name="category" value="Gold" />
                                Gold
                            </label>
                            <label>
                                <input type="checkbox" name="category" value="Topaz" />
                                Topaz
                            </label>
                            <label>
                                <input type="checkbox" name="category" value="Emerald" />
                                Emerald
                            </label>
                        </div>
                    </div>
                </div>
                <div className="jewelry-content">
                    <div className="jewelry-status">
                        {statusOptions.map(status => (
                            <button
                                key={status}
                                className={selectedStatus === status ? 'active' : ''}
                                onClick={() => handleStatusChangeClick(status)}
                            >
                            {status}
                            </button>
                        ))}
                    </div>
                    {filteredJewelries.slice(0, visibleItems).map((item) => (
                    <div className="item-card" key={item.id}>
                        <img className="item-image" src={item.image} alt={item.name} />
                        <div className="item-details">
                            <p>{item.name}</p>
                            <p>Current Price: ${item.price.toFixed(2)}</p>
                            <p>{item.status}</p>
                        </div>
                    </div>
                    ))}
                </div>
            </div>
            {visibleItems < filteredJewelries.length && (
            <button className="load-more-button" onClick={handleLoadMore}>Load more</button>
            )}
        </div>
    );
};

export default AuctionMainPage
