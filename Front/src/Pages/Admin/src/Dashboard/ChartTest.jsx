import React from 'react';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Pie } from 'react-chartjs-2';

ChartJS.register(ArcElement, Tooltip, Legend);

export const data = {
  labels: [
    'biscuits',
    'bubble gum',
    'caramel cookie',
    'candy',
    'cereal bars',
    'gummies',
    'chocolate',
    'lollipop',
    'tablets',
  ],
  datasets: [
    {
      label: '# of Votes',
      data: [13, 5, 15, 7, 15, 8, 35, 10],
      backgroundColor: [
        'rgba(255, 99, 132, 0.2)',
        'rgba(54, 162, 235, 0.2)',
        'rgba(255, 206, 86, 0.2)',
        'rgba(75, 192, 192, 0.2)',
        'rgba(153, 102, 255, 0.2)',
        'rgba(255, 159, 64, 0.2)',
        'rgba(0,128,0, 0.2)',
        'rgba(100,255,200, 0.2)',
        'rgba(150,0,255, 0.2)',
      ],
      borderColor: [
        'rgba(255, 99, 132, 1)',
        'rgba(54, 162, 235, 1)',
        'rgba(255, 206, 86, 1)',
        'rgba(75, 192, 192, 1)',
        'rgba(153, 102, 255, 1)',
        'rgba(255, 159, 64, 1)',
        'rgba(0,128,0, 1)',
        'rgba(100,255,200, 1)',
        'rgba(150,0,255, 1)',
      ],
      borderWidth: 1,
    },
  ],
};

export default function Chart() {
  return (
    <>
      <Pie data={data} />
    </>
  );
}
