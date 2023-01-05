import React from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Line } from 'react-chartjs-2';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

export const options = {
  responsive: true,
  plugins: {
    legend: {
      position: 'top',
    },
    title: {
      display: true,
      text: 'Last 6 Month sales',
    },
  },
};

const labels = [
  'August',
  'September',
  'October',
  'November',
  'December',
  'January',
];

export const data = {
  labels,
  datasets: [
    {
      label: 'Sales per Month',
      data: [590, 603, 749, 900, 1402, 96],
      borderColor: 'rgb(255, 99, 132)',
      backgroundColor: 'rgba(255, 99, 132, 0.5)',
    },
  ],
};

export default function App() {
  return <Line options={options} data={data} />;
}
