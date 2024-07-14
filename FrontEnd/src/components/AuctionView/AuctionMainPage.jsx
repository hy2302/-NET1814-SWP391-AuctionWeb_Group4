import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import Box from '@mui/material/Box'
import Slider from '@mui/material/Slider'
import Typography from '@mui/material/Typography'
import axios from 'axios'
import './AuctionMainPage.css'

const MAX = 1000;
const MIN = 0;
const marks = [
    { value: MIN, label: '' },
    { value: MAX, label: '' },
];

const statusOptions = ['All', 'Upcoming', 'In Process', 'Ended Soon'];

const AuctionMainPage = () => {
    const navigate = useNavigate();
    const [val, setVal] = useState(MIN);
    const [jewelries, setJewelries] = useState([]);
    const [jewelryTypes, setJewelryTypes] = useState([]);
    const [visibleItems, setVisibleItems] = useState(6);
    const [selectedStatus, setSelectedStatus] = useState('All');
    const [selectedCategories, setSelectedCategories] = useState([]);

    useEffect(() => {
        const fetchJewelries = async () => {
            try {
                const response = await axios.get('http://localhost:5074/api/Jewelry');
                setJewelries(response.data);
            } catch (error) {
                alert('Failed to fetch jewelry data.');
            }
        };

        const fetchJewelryTypes = async () => {
            try {
                const response = await axios.get('http://localhost:5074/api/JewelryType');
                setJewelryTypes(response.data);
            } catch (error) {
                alert('Failed to fetch jewelry types.');
            }
        };

        fetchJewelries();
        fetchJewelryTypes();
    }, []);

    const handleChange = (_, newValue) => {
        setVal(newValue);
    };

    const handleStatusChangeClick = (status) => {
        setSelectedStatus(status);
    };

    const handleCategoryChange = (event) => {
        const { value, checked } = event.target;

        if (checked) {
            setSelectedCategories([...selectedCategories, value]);
        } else {
            setSelectedCategories(selectedCategories.filter(category => category !== value));
        }
    };

    const getJewelryTypeName = (typeId) => {
        const type = jewelryTypes.find(type => type.jewelryTypeId === typeId);
        return type ? type.jewelryTypeName : 'Unknown';
    };

    const handleLoadMore = () => {
        setVisibleItems(prevVisibleItems => prevVisibleItems + 6);
    };

    const filteredJewelries = selectedStatus === 'All'
        ? jewelries.filter(item => selectedCategories.length === 0 || selectedCategories.includes(getJewelryTypeName(item.jewelryTypeId)))
        : jewelries.filter(item => item.status === selectedStatus && (selectedCategories.length === 0 || selectedCategories.includes(getJewelryTypeName(item.jewelryTypeId))));

    return (
        <div className="screen-container">
            <div className="screen-header">
                <input className="search-bar" type="text" placeholder="Enter the auction keyword" />
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
                                <input type="checkbox" name="category" value="Diamond" onChange={handleCategoryChange} />
                                Diamond
                            </label>
                            <label>
                                <input type="checkbox" name="category" value="Ruby" onChange={handleCategoryChange} />
                                Ruby
                            </label>
                            <label>
                                <input type="checkbox" name="category" value="Silver" onChange={handleCategoryChange} />
                                Silver
                            </label>
                            <label>
                                <input type="checkbox" name="category" value="Gold" onChange={handleCategoryChange} />
                                Gold
                            </label>
                            <label>
                                <input type="checkbox" name="category" value="Topaz" onChange={handleCategoryChange} />
                                Topaz
                            </label>
                            <label>
                                <input type="checkbox" name="category" value="Others" onChange={handleCategoryChange} />
                                Others
                            </label>
                        </div>
                    </div>
                </div>
                <div className="jewelry-content">
                    {filteredJewelries.slice(0, visibleItems).map((item) => (
                        <div className="item-card" key={item.jewelryId} onClick={() => navigate(`/jewelrydetail/${item.jewelryId}`)}>
                            <img className="item-image" src="https://tse4.mm.bing.net/th?id=OIP.P0udrBXOIIMIc6KeA5qkkwAAAA&pid=Api&P=0&h=180" alt={item.jewelryName} />
                            <div className="item-details">
                                <p className='item-name'>{item.jewelryName}</p>
                                <p>Material: {getJewelryTypeName(item.jewelryTypeId)}</p>
                                <p>Current Price: $</p>
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
