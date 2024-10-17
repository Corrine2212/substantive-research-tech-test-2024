import React from 'react';
import { Chart, registerables } from 'chart.js';
import { Line } from 'react-chartjs-2';

Chart.register(...registerables);

const ChartComponent = ({ trendData }) => {
  const chartData = {
    labels: [], 
    datasets: [], 
  };

  const yearSet = new Set();

  for (let i = 0; i < trendData.length; i++) {
    const product = trendData[i];
    const years = [];
    const amounts = [];


    for (let i = 0; i < product.years.length; i++) {
      const yearData = product.years[i];
      years.push(yearData.year);
      amounts.push(yearData.amount);
      yearSet.add(yearData.year); 
    }


    chartData.datasets.push({
      label: product.product, 
      data: amounts,
      fill: false,
      borderColor: `#${Math.floor(Math.random() * 16777215).toString(16)}`, 
      tension: 0.1,
    });
  }

  chartData.labels = Array.from(yearSet).sort((a, b) => a - b);

  for (let i = 0; i < chartData.datasets.length; i++) {
    const dataset = chartData.datasets[i];
    const data = [];

    for (let i = 0; i < chartData.labels.length; i++) {
      const year = chartData.labels[i];
      const index = trendData.find(product => product.product === dataset.label)
        .years.findIndex(yearData => yearData.year === year);
      

      if (index !== -1) {
        data.push(trendData.find(product => product.product === dataset.label).years[index].amount);
      } else {
        data.push(0);
      }
    }

    dataset.data = data; 
  }

//   chart settings
  const options = {
    responsive: true,
    scales: {
      y: {
        beginAtZero: true,
      },
    },
  };

  return (
    <div className='chart-section'>
      <h3>Product Payment Trends Year Over Year</h3>
      <Line data={chartData} options={options} />
    </div>
  );
};

export default ChartComponent;
