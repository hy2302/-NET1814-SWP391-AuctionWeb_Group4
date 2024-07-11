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
            const data = await response.json();
            setItems(data);
        } catch (error) {
            console.error('Error fetching items:', error);
        }
    };

    const fetchEmployees = async () => {
        try {
            const response = await fetch('http://localhost:5074/api/Employees');
            const data = await response.json();
            setEmployees(data);
        } catch (error) {
            console.error('Error fetching employees:', error);
        }
    };

    const handleItemUpdate = (updatedItem) => {
        setItems((prevItems) => prevItems.map(item => item.JewelryId === updatedItem.JewelryId ? updatedItem : item));
    };

    const handleItemDelete = async (itemId) => {
        try {
            await fetch(`http://localhost:5074/api/Jewelry/${itemId}`, {
                method: 'DELETE'
            });
            setItems((prevItems) => prevItems.filter(item => item.JewelryId !== itemId));
        } catch (error) {
            console.error('Error deleting item:', error);
        }
    };

    const handleEmployeeUpdate = (updatedEmployee) => {
        setEmployees((prevEmployees) => prevEmployees.map(emp => emp.EmployeeId === updatedEmployee.EmployeeId ? updatedEmployee : emp));
    };

    const handleEmployeeDelete = async (employeeId) => {
        try {
            await fetch(`http://localhost:5074/api/Employees/${employeeId}`, {
                method: 'DELETE'
            });
            setEmployees((prevEmployees) => prevEmployees.filter(emp => emp.EmployeeId !== employeeId));
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
