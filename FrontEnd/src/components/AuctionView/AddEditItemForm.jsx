import React, { useState } from 'react';

const AddEditItemForm = ({ items, onItemUpdate, onItemDelete }) => {
    const [itemForm, setItemForm] = useState({
        JewelryId: '',
        JewelryName: '',
        JewelryDescription: '',
        JewelryStatus: '',
    });

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setItemForm({ ...itemForm, [name]: value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (itemForm.JewelryId) {
            onItemUpdate(itemForm);
        } else {
            // handle item creation logic here
        }
        setItemForm({
            JewelryId: '',
            JewelryName: '',
            JewelryDescription: '',
            JewelryStatus: '',
        });
    };

    return (
        <div className="add-edit-item-form">
            <h2>Add/Edit Item</h2>
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    name="JewelryName"
                    value={itemForm.JewelryName}
                    onChange={handleInputChange}
                    placeholder="Jewelry Name"
                    required
                />
                <input
                    type="text"
                    name="JewelryDescription"
                    value={itemForm.JewelryDescription}
                    onChange={handleInputChange}
                    placeholder="Jewelry Description"
                    required
                />
                <input
                    type="text"
                    name="JewelryStatus"
                    value={itemForm.JewelryStatus}
                    onChange={handleInputChange}
                    placeholder="Jewelry Status"
                    required
                />
                <button type="submit">Submit</button>
            </form>
            <h3>Item List</h3>
            <ul>
                {items.map((item) => (
                    <li key={item.JewelryId}>
                        {item.JewelryName}
                        <button onClick={() => onItemDelete(item.JewelryId)}>Delete</button>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default AddEditItemForm;
