import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import './AuctionPreview.css'

const categories = ['General', 'Diamond', 'Ruby', 'Silver', 'Gold', 'Topaz', 'Emerald'];
const maxPerLine = 4;

function AuctionPreview() {
    const navigate = useNavigate();
    const [jewelries, setJewelries] = useState([]);
    const [jewelryTypes, setJewelryTypes] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState('General');
    const [currentSet, setCurrentSet] = useState(0);

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

    const getJewelryTypeName = (typeId) => {
        const type = jewelryTypes.find(type => type.jewelryTypeId === typeId);
        return type ? type.jewelryTypeName : 'Unknown';
    };

    const handleCategoryChangeClick = (category) => {
        setSelectedCategory(category);
        setCurrentSet(0);
    };

    const filteredProducts = selectedCategory === 'General'
        ? jewelries
        : jewelries.filter(jewelry => getJewelryTypeName(jewelry.jewelryTypeId) === selectedCategory);

    const totalSet = Math.ceil(filteredProducts.length / maxPerLine);
    const currentJewelries = filteredProducts.slice(currentSet * maxPerLine, (currentSet + 1) * maxPerLine);

    const handleNextPage = () => {
        if (currentSet < totalSet - 1) {
            setCurrentSet(currentSet + 1);
        }
    };

    const handlePrevPage = () => {
        if (currentSet > 0) {
            setCurrentSet(currentSet - 1);
        }
    };

    return (
        <div className="preview-content">
            <h1>JEWELRY PREVIEW</h1>
            <h2>What do we have in store?</h2>
            <div className="categories">
                {categories.map(category => (
                    <button
                        key={category}
                        className={selectedCategory === category ? 'active' : ''}
                        onClick={() => handleCategoryChangeClick(category)}
                    >
                        {category}
                    </button>
                ))}
                <button onClick={() => navigate('/auctionmain')}><span>...</span></button>
            </div>
            <div className="jewelry-list-container">
                <button onClick={handlePrevPage} disabled={currentSet === 0}>❰</button>
                <div className="jewelry-list">
                    {currentJewelries.map(jewelry => (
                        <div key={jewelry.jewelryId} className="jewelry-card">
                            <img src={`data:image/jpeg;base64,${jewelry.jewelryImage}`} alt={jewelry.jewelryName} />
                            <h2>{jewelry.jewelryName}</h2>
                            <p>{getJewelryTypeName(jewelry.jewelryTypeId)}</p>
                        </div>
                    ))}
                </div>
                <button onClick={handleNextPage} disabled={currentSet === totalSet - 1}>❱</button>
            </div>
        </div>
    );
}

export default AuctionPreview
