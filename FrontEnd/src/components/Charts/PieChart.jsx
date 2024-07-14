import React, { useEffect, useState } from 'react';
import { Pie } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
} from 'chart.js';

ChartJS.register(ArcElement, Tooltip, Legend);

const PieChart = () => {
  const [chartData, setChartData] = useState(null);

  useEffect(() => {
    fetchPieChartData();
  }, []);

  const fetchPieChartData = async () => {
    try {
      const response = await fetch('http://localhost:5074/api/admin/dashboard');
      const data = await response.json();
      setChartData({
        labels: ['Users', 'Jewelries'],
        datasets: [
          {
            label: 'Counts',
            data: [data.UserCount, data.JewelryCount],
            backgroundColor: [
              'rgba(255, 99, 132, 0.6)',
              'rgba(54, 162, 235, 0.6)',
            ],
          },
        ],
      });
    } catch (error) {
      console.error('Error fetching pie chart data:', error);
    }
  };

  return (
    <div className="chart-container">
      <h2>Pie Chart</h2>
      {chartData ? <Pie data={chartData} /> : <p>Loading...</p>}
    </div>
  );
};

export default PieChart;
