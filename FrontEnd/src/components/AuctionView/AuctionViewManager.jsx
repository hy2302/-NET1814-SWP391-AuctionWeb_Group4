import React, { useState, useEffect } from 'react';
import AddEditItemForm from './AddEditItemForm';
import EmployeeManagement from './EmployeeManagement';
import AuctionManagement from './AuctionManagement';
import OnGoingBiddingView from './OnGoingBiddingView';
import AuctionHistory from './AuctionHistory';
import '../Layouts/ManagerAuctionPage.css';

const AuctionViewManager = () => {
    const [items, setItems] = useState([]);
    const [employees, setEmployees] = useState([]);

    useEffect(() => {
        fetchItems();
        fetchEmployees();
    }, []);

    const fetchItems = async () => {
        try {
            const response = await fetch('http://localhost:5074/api/Jewelry');
            if (!response.ok) {
                throw new Error('Failed to fetch items');
            }
            const data = await response.json();
            setItems(data);
        } catch (error) {
            console.error('Error fetching items:', error);
        }
    };

    const fetchEmployees = async () => {
        try {
            const response = await fetch('http://localhost:5074/api/Admin/users');
            if (!response.ok) {
                throw new Error('Failed to fetch employees');
            }
            const data = await response.json();
            setEmployees(data);
        } catch (error) {
            console.error('Error fetching employees:', error);
        }
    };

    const handleItemUpdate = async (updatedItem) => {
        try {
            const response = await fetch(`http://localhost:5074/api/Jewelry/${updatedItem.JewelryId}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(updatedItem),
            });
            if (!response.ok) {
                throw new Error('Failed to update item');
            }
            setItems((prevItems) =>
                prevItems.map((item) =>
                    item.JewelryId === updatedItem.JewelryId ? updatedItem : item
                )
            );
        } catch (error) {
            console.error('Error updating item:', error);
        }
    };

    const handleItemDelete = async (itemId) => {
        try {
            const response = await fetch(`http://localhost:5074/api/Jewelry/${itemId}`, {
                method: 'DELETE',
            });
            if (!response.ok) {
                throw new Error('Failed to delete item');
            }
            setItems((prevItems) => prevItems.filter((item) => item.JewelryId !== itemId));
        } catch (error) {
            console.error('Error deleting item:', error);
        }
    };

    const handleEmployeeUpdate = async (updatedEmployee) => {
        try {
            const response = await fetch(`http://localhost:5074/api/Admin/users/${updatedEmployee.UserId}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(updatedEmployee),
            });
            if (!response.ok) {
                throw new Error('Failed to update employee');
            }
            setEmployees((prevEmployees) =>
                prevEmployees.map((emp) =>
                    emp.UserId === updatedEmployee.UserId ? updatedEmployee : emp
                )
            );
        } catch (error) {
            console.error('Error updating employee:', error);
        }
    };

    const handleEmployeeDelete = async (userId) => {
        try {
            const response = await fetch(`http://localhost:5074/api/Admin/users/${userId}`, {
                method: 'DELETE',
            });
            if (!response.ok) {
                throw new Error('Failed to delete employee');
            }
            setEmployees((prevEmployees) =>
                prevEmployees.filter((emp) => emp.UserId !== userId)
            );
        } catch (error) {
            console.error('Error deleting employee:', error);
        }
    };

    return (
        <div className="manager-auction-container">
            <header className="manager-auction-header">
                <h1>Auction Management</h1>
            </header>
            <main className="manager-auction-main">
                <AddEditItemForm items={items} onItemUpdate={handleItemUpdate} onItemDelete={handleItemDelete} />
                <EmployeeManagement employees={employees} onEmployeeUpdate={handleEmployeeUpdate} onEmployeeDelete={handleEmployeeDelete} />
                <AuctionManagement />
                <OnGoingBiddingView />
                <AuctionHistory />
            </main>
        </div>
    );
};

export default AuctionViewManager;
