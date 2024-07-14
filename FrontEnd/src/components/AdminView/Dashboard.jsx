import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Sidebar from './Sidebar';
import ChartView from './ChartView';
import Users from './Users';
import Histories from './Histories';
import '../Layouts/Dashboard.css';

const Dashboard = () => {
    const [sidebarOpen, setSidebarOpen] = useState(true);
    const [incomeData, setIncomeData] = useState({
        previousMonthIncome: 0,
        currentMonthIncome: 0,
        previousMonthFee: 0,
        currentMonthFee: 0,
    });

    const toggleSidebar = () => {
        setSidebarOpen(!sidebarOpen);
    };

    useEffect(() => {
        fetchTransactionData();
    }, []);

    const fetchTransactionData = async () => {
        try {
            const response = await fetch('http://localhost:5074/api/Transactions');
            const transactions = await response.json();
            calculateIncomeData(transactions);
        } catch (error) {
            console.error('Error fetching transaction data:', error);
        }
    };

    const calculateIncomeData = (transactions) => {
        const now = new Date();
        const previousMonth = new Date(now.getFullYear(), now.getMonth() - 1, 1);
        const currentMonth = new Date(now.getFullYear(), now.getMonth(), 1);

        let previousMonthIncome = 0;
        let currentMonthIncome = 0;
        let previousMonthFee = 0;
        let currentMonthFee = 0;

        transactions.forEach(transaction => {
            const transactionDate = new Date(transaction.date);
            const transactionAmount = parseFloat(transaction.amount);
            const transactionFee = parseFloat(transaction.fee);

            if (transactionDate >= previousMonth && transactionDate < currentMonth) {
                previousMonthIncome += transactionAmount;
                previousMonthFee += transactionFee;
            } else if (transactionDate >= currentMonth) {
                currentMonthIncome += transactionAmount;
                currentMonthFee += transactionFee;
            }
        });

        setIncomeData({
            previousMonthIncome,
            currentMonthIncome,
            previousMonthFee,
            currentMonthFee,
        });
    };

    return (
        <Router>
            <div className={`dashboard ${sidebarOpen ? 'sidebar-open' : 'sidebar-close'}`}>
                <Sidebar isOpen={sidebarOpen} toggleSidebar={toggleSidebar} />
                <div className="main-container">
                    <div className="income-summary">
                        <div className="income-card">
                            <h2>Previous Month Income</h2>
                            <p>Total Income: ${incomeData.previousMonthIncome.toFixed(2)}</p>
                        </div>
                        <div className="income-card">
                            <h2>Current Month Income</h2>
                            <p>Total Income: ${incomeData.currentMonthIncome.toFixed(2)}</p>
                        </div>
                    </div>
                    <div className="fee-summary">
                        <div className="fee-card">
                            <h2>Previous Month Transaction Fee</h2>
                            <p>Total Transaction Fee: ${incomeData.previousMonthFee.toFixed(2)}</p>
                        </div>
                        <div className="fee-card">
                            <h2>Current Month Transaction Fee</h2>
                            <p>Total Transaction Fee: ${incomeData.currentMonthFee.toFixed(2)}</p>
                        </div>
                    </div>
                    <Routes>
                        <Route path="/" element={<ChartView />} />
                        <Route path="/users" element={<Users />} />
                        <Route path="/histories" element={<Histories />} />
                    </Routes>
                </div>
                <div className="fee-summary">
                    <div className="fee-card">
                        <h2>Previous Month Transaction Fee</h2>
                        <p>Total Transaction Fee: ${incomeData.previousMonthFee.toFixed(2)}</p>
                    </div>
                    <div className="fee-card">
                        <h2>Current Month Transaction Fee</h2>
                        <p>Total Transaction Fee: ${incomeData.currentMonthFee.toFixed(2)}</p>
                    </div>
                </div>
                <Routes>
                    <Route path="/" element={<ChartView />} />
                    <Route path="/users" element={<Users />} />
                </Routes>
            </div>
        </Router>
    );
};

export default Dashboard;
