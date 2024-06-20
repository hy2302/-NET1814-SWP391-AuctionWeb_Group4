import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import '../Layouts/Histories.css';

const Histories = () => {
    const navigate = useNavigate();
    const [transactions, setTransactions] = useState([]);

    useEffect(() => {
        fetchHistories();
    }, []);

    const fetchHistories = async () => {
        try {
            const transactionsResponse = await fetch('http://localhost:5074/api/Transactions');
            const transactionsData = await transactionsResponse.json();
            setTransactions(transactionsData);
        } catch (error) {
            console.error('Error fetching histories:', error);
        }
    };

    return (
        <div>
            <div className="histories">
                <h1>History</h1>
                <button className="back-button" onClick={() => navigate('/Dashboard')}>Back to Dashboard</button>
                <div className="history-section">
                    <h2>Transaction History</h2>
                    <table className="history-table">
                        <thead>
                            <tr>
                                <th>Date</th>
                                <th>Auction ID</th>
                                <th>User ID</th>
                                <th>Total Amount</th>
                                <th>Transaction Fee</th>
                                <th>Status</th>
                            </tr>
                        </thead>
                        <tbody>
                            {transactions.map(transaction => (
                                <tr key={transaction.id}>
                                    <td>{transaction.date}</td>
                                    <td>{transaction.auction_id}</td>
                                    <td>{transaction.user_id}</td>
                                    <td>${transaction.total_amount}</td>
                                    <td>${transaction.transaction_fee}</td>
                                    <td>{transaction.status}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default Histories;
