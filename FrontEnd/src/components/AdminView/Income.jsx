import React, { useState, useEffect } from 'react';

const Income = () => {
    const [incomeData, setIncomeData] = useState({
        previousMonthIncome: 0,
        currentMonthIncome: 0,
        previousMonthFee: 0,
        currentMonthFee: 0,
    });

    useEffect(() => {
        fetchTransactionData();
    }, []);

    const fetchTransactionData = async () => {
        try {
            const response = await fetch('http://localhost:5074/api/Transaction');
            const text = await response.text();
            if (!text) {
                throw new Error('Response body is empty');
            }

            const transactions = JSON.parse(text);
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
            const transactionDate = new Date(transaction.transactionDate);
            const transactionAmount = parseFloat(transaction.totalAmount);
            const transactionFee = parseFloat(transaction.transactionFee);

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
        <div>
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
        </div>
    );
}

export default Income;
