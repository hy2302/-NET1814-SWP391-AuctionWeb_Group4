import React, { useState } from 'react';
import './AuctionPreview.css';

const products = [
    { id: 1, name: 'Diamond Ring', category: 'Diamond', price: 30.00, image: 'https://tse4.mm.bing.net/th?id=OIP.P0udrBXOIIMIc6KeA5qkkwAAAA&pid=Api&P=0&h=180' },
    { id: 2, name: 'Ruby Ring', category: 'Ruby', price: 30.00, image: 'https://tse4.mm.bing.net/th?id=OIP.P0udrBXOIIMIc6KeA5qkkwAAAA&pid=Api&P=0&h=180' },
    { id: 3, name: 'Sliver Necklace', category: 'Sliver', price: 30.00, image: 'https://tse4.mm.bing.net/th?id=OIP.P0udrBXOIIMIc6KeA5qkkwAAAA&pid=Api&P=0&h=180' },
    { id: 4, name: 'Topaz Ring', category: 'Topaz', price: 30.00, image: 'https://tse4.mm.bing.net/th?id=OIP.P0udrBXOIIMIc6KeA5qkkwAAAA&pid=Api&P=0&h=180' },
    { id: 5, name: 'Gold Pendant', category: 'Gold', price: 30.00, image: 'https://tse4.mm.bing.net/th?id=OIP.P0udrBXOIIMIc6KeA5qkkwAAAA&pid=Api&P=0&h=180' },
    { id: 6, name: 'Ruby Pendant', category: 'Ruby', price: 30.00, image: 'https://tse4.mm.bing.net/th?id=OIP.P0udrBXOIIMIc6KeA5qkkwAAAA&pid=Api&P=0&h=180' },
    { id: 7, name: 'Gold Bracelet', category: 'Gold', price: 30.00, image: 'https://tse4.mm.bing.net/th?id=OIP.P0udrBXOIIMIc6KeA5qkkwAAAA&pid=Api&P=0&h=180' },
    { id: 8, name: 'Sliver Ring', category: 'Sliver', price: 30.00, image: 'https://tse4.mm.bing.net/th?id=OIP.P0udrBXOIIMIc6KeA5qkkwAAAA&pid=Api&P=0&h=180' },
    { id: 9, name: 'Emerald Gem', category: 'Emerald', price: 30.00, image: 'https://tse4.mm.bing.net/th?id=OIP.P0udrBXOIIMIc6KeA5qkkwAAAA&pid=Api&P=0&h=180' },
];

const categories = ['All', 'Diamond', 'Ruby', 'Sliver', 'Gold', 'Topaz', 'Emerald'];
const maxPerLine = 4;

function AuctionPreview() {
    const [selectedCategory, setSelectedCategory] = useState('All');
    const [currentSet, setCurrentSet] = useState(0);

    const handleCategoryChangeClick = (category) => {
        setSelectedCategory(category);
        setCurrentSet(0);
    };

    const filteredProducts = selectedCategory == 'All'
        ? products
        : products.filter(product => product.category == selectedCategory);

    const totalSet = Math.ceil(filteredProducts.length/4);
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
            </div>
            <div className="jewelry-list-container">
                <button onClick={handlePrevPage} disabled={currentSet == 0}>❰</button>
                <div className="jewelry-list">
                    {currentJewelries.map(product => (
                        <div key={product.id} className="jewelry-card">
                            <img src={product.image} alt={product.name} />
                            <h2>{product.name}</h2>
                            <p>{product.category}</p>
                            <p><span className="start-price">Start price: </span> ${product.price.toFixed(2)}</p>
                        </div>
                    ))}
                </div>
                <button onClick={handleNextPage} disabled={currentSet === totalSet - 1}>❱</button>
            </div>
        </div>
    );
}

export default AuctionPreview;
