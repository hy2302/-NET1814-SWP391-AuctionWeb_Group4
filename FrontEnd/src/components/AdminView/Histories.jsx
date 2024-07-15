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
            const response = await fetch('http://localhost:5074/api/Transaction');
            const data = await response.json();
            setTransactions(data);
        } catch (error) {
            console.error('Error fetching histories:', error);
        }
    };

    return (
        <div className='histories-container'>
            <div className="histories">
                <h1>History</h1>
                <button className="back-button" onClick={() => navigate('/Dashboard')}>Back to Dashboard</button>
                <div className="history-section">
                    <h2>Transaction History</h2>
                    <table className="history-table">
                        <thead>
                            <tr>
                                <th>Auction ID</th>
                                <th>User ID</th>
                                <th>Total Amount</th>
                                <th>Transaction Fee</th>
                            </tr>
                        </thead>
                        <tbody>
                            {transactions.map(transaction => (
                                <tr key={transaction.transactionId}>
                                    <td>{transaction.auctionId}</td>
                                    <td>{transaction.userId}</td>
                                    <td>${transaction.totalAmount}</td>
                                    <td>${transaction.transactionFee}</td>
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
