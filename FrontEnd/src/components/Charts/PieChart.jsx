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
      setChartData(data);
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
