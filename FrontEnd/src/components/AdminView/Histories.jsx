import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import '../Layouts/Histories.css';

const Histories = () => {
  const navigate = useNavigate();
  const [transactions, setTransactions] = useState([]);
  const [payouts, setPayouts] = useState([]);

  useEffect(() => {
    fetchHistories();
  }, []);

  const fetchHistories = async () => {
    try {
      const transactionsResponse = await fetch('/api/transactions');
      const transactionsData = await transactionsResponse.json();
      setTransactions(transactionsData);

      const payoutsResponse = await fetch('/api/payouts');
      const payoutsData = await payoutsResponse.json();
      setPayouts(payoutsData);
    } catch (error) {
      console.error('Error fetching histories:', error);
    }
  };

  return (
    <div>
      <div className="histories">
        <h1>History</h1>
        <button className="back-button" onClick={() => navigate('/Dashboard')}>
          Back to Dashboard
        </button>
        <div className="history-section">
          <h2>Transaction History</h2>
          <table className="history-table">
            <thead>
              <tr>
                <th>Date</th>
                <th>Amount</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {transactions.map(transaction => (
                <tr key={transaction.id}>
                  <td>{transaction.date}</td>
                  <td>${transaction.amount}</td>
                  <td>{transaction.status}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="history-section">
          <h2>Payout History</h2>
          <table className="history-table">
            <thead>
              <tr>
                <th>Date</th>
                <th>Amount</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {payouts.map(payout => (
                <tr key={payout.id}>
                  <td>{payout.date}</td>
                  <td>${payout.amount}</td>
                  <td>{payout.status}</td>
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
