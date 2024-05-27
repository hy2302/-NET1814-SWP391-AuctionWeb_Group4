import React, { useState } from 'react';
import Header from '../Header & Footer/Header';
import Footer from '../Header & Footer/Footer';
import '../Layouts/Histories.css';

const Histories = () => {
  // Mock data for transactions and payouts
  const [transactions] = useState([
    { id: 1, date: '2023-01-01', amount: 100, status: 'Completed' },
    { id: 2, date: '2023-01-05', amount: 150, status: 'Pending' },
  ]);

  const [payouts] = useState([
    { id: 1, date: '2023-02-01', amount: 80, status: 'Completed' },
    { id: 2, date: '2023-02-10', amount: 120, status: 'Pending' },
  ]);

  return (
    <div>
      <Header />
      <div className="histories">
        <h1>History</h1>
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
      <Footer />
    </div>
  );
};

export default Histories;
