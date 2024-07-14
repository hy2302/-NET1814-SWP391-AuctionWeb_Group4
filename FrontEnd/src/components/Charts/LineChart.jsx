import React, { useState, useEffect } from 'react';
import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  LineElement,
  PointElement,
  LinearScale,
  Title,
  Tooltip,
  Legend,
  CategoryScale,
} from 'chart.js';

ChartJS.register(
  LineElement,
  PointElement,
  LinearScale,
  Title,
  Tooltip,
  Legend,
  CategoryScale,
);

const LineChart = () => {
  const [chartData, setChartData] = useState(null);

  useEffect(() => {
    fetchLineChartData();
  }, []);

  const fetchLineChartData = async () => {
    try {
      const response = await fetch('http://localhost:5074/api/admin/dashboard');
      const data = await response.json();
      setChartData({
        labels: ['Now', 'Last Month'],
        datasets: [
          {
            label: 'Total Amount',
            data: [data.TotalAmountNow, data.TotalAmountLastMonth],
            borderColor: 'rgba(75, 192, 192, 1)',
            backgroundColor: 'rgba(75, 192, 192, 0.2)',
            fill: true,
          },
          {
            label: 'Transaction Fee',
            data: [data.TransactionFeeNow, data.TransactionFeeLastMonth],
            borderColor: 'rgba(255, 159, 64, 1)',
            backgroundColor: 'rgba(255, 159, 64, 0.2)',
            fill: true,
          },
          {
            label: 'Final Price',
            data: [data.FinalPriceNow, data.FinalPriceLastMonth],
            borderColor: 'rgba(153, 102, 255, 1)',
            backgroundColor: 'rgba(153, 102, 255, 0.2)',
            fill: true,
          },
        ],
      });
    } catch (error) {
      console.error('Error fetching line chart data:', error);
    }
  };

  return (
    <div className="chart-container">
      <h2>Line Chart</h2>
      {chartData ? <Line data={chartData} /> : <p>Loading...</p>}
    </div>
  );
};

export default LineChart;
