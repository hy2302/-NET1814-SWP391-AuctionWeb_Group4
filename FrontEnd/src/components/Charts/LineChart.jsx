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
      const response = await fetch('/api/linechart-data');
      const data = await response.json();
      setChartData(data);
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
