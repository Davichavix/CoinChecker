import React from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Line } from "react-chartjs-2";

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
  scales: {
    x: {
      grid: {
        display: false,
      },
    },
  },
  plugins: {
    legend: {
      display: false,
      position: "top",
    },
    title: {
      display: false,
      text: "Portfolio Performance",
    },
  },
};

const getDaysArray = function (start, end) {
  const arr = [];
  for (
    const dt = new Date(start);
    dt <= new Date(end);
    dt.setDate(dt.getDate() + 1)
  ) {
    arr.push(new Date(dt).toLocaleDateString());
  }
  return arr;
};

const currentDate = new Date(Date.now());
const sevenDaysPrior = new Date(
  currentDate.getTime() - 7 * 24 * 60 * 60 * 1000
);
// console.log(sevenDaysPrior.toLocaleDateString(), "here");

const labels = getDaysArray(sevenDaysPrior, currentDate.toLocaleDateString());

export const data = {
  labels,
  datasets: [
    {
      label: "Value",
      data: labels.map(
        (label, i) => (i + 1) * Math.floor(Math.random() * 10000)
      ),
      borderColor: "rgb(53, 162, 235)",
      backgroundColor: "rgba(53, 162, 235, 0.5)",
    },
  ],
};

export function PortfolioLineChart() {
  return (
    <div style={{ marginTop: "50px" }}>
      <Line options={options} data={data} />
    </div>
  );
}

// datalabels: {
//   formatter: function(value, context) {
//     return context.chart.data.labels[context.dataIndex];
//   },

// import "chartjs-plugin-datalabels";
