import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../Layouts/CheckoutPage.css';

const CheckoutPage = () => {
    const [transactions, setTransactions] = useState([]);
    const [selectedTransaction, setSelectedTransaction] = useState(null);
    const [checkoutMessage, setCheckoutMessage] = useState('');

    useEffect(() => {
        fetchTransactions();
    }, []);

    const fetchTransactions = async () => {
        try {
            const response = await axios.get('/api/Transaction');
            setTransactions(response.data);
        } catch (error) {
            console.error('Error fetching transactions:', error);
        }
    };

    const handleCheckout = async () => {
        if (!selectedTransaction) {
            alert('Please select a transaction to checkout.');
            return;
        }

        try {
            const response = await axios.post('/api/Transaction', {
                transactionId: selectedTransaction.transactionId
            });
            setCheckoutMessage(response.data);
            // Optionally update local state or navigate to a different page
        } catch (error) {
            console.error('Error during checkout:', error);
        }
    };

    const selectTransaction = (transaction) => {
        setSelectedTransaction(transaction);
    };

    return (
        <div className="checkout-page">
            <h2>Checkout</h2>
            <div className="transaction-list">
                {transactions.map(transaction => (
                    <div
                        key={transaction.transactionId}
                        className={`transaction-item ${selectedTransaction && selectedTransaction.transactionId === transaction.transactionId ? 'selected' : ''}`}
                        onClick={() => selectTransaction(transaction)}
                    >
                        <div>Transaction ID: {transaction.transactionId}</div>
                        <div>Auction ID: {transaction.auctionId}</div>
                        <div>User ID: {transaction.userId}</div>
                        <div>Total Amount: ${transaction.totalAmount}</div>
                        <div>Transaction Fee: ${transaction.transactionFee}</div>
                    </div>
                ))}
            </div>
            <button onClick={handleCheckout}>Checkout</button>
            {checkoutMessage && <p>{checkoutMessage}</p>}
        </div>
    );
};

export default CheckoutPage;
