import React from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Bar } from 'react-chartjs-2';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

export const options = {
  indexAxis: 'y',
  elements: {
    bar: {
      borderWidth: 2,
    },
  },
  responsive: true,
  plugins: {
    legend: {
      position: 'right',
    },
    title: {
      display: true,
      text: 'Best selling products',
    },
  },
};

const labels = [
  'Ositos frutales ',
  'Chicles Trident ',
  'Alfajor Jorgito',
  'Alfajor Milka',
  'Galletitas Oreo',
  /* 'Chocolate Tofi Leche',
  'Chocolate Cofler Leche',
  'Barra Cereal Mix Yoghurt Vainilla',
  'Saladix Horneados Barbacoa',
  'Ositos frutales', */
];

export const data = {
  labels,
  datasets: [
    {
      label: 'Amount sold',
      data: [143, 120, 101, 92, 83 /* , 96, 53, 12, 32, 32 */],
      backgroundColor: 'rgba(255, 99, 132, 0.5)',
    },
  ],
};

export default function TopChart() {
  return <Bar options={options} data={data} />;
}
