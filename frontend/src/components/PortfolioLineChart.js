import React, { useEffect } from "react";
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
import axios from 'axios'

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
    const date = new Date(dt).toLocaleDateString('en-gb')
    arr.push(date.slice(0, 2) + '-' + date.slice(3, 5) + '-' + date.slice(6, 10));
  }
  return arr;
};

const currentDate = new Date(Date.now());
const sevenDaysPrior = new Date(
  currentDate.getTime() - 7 * 24 * 60 * 60 * 1000
);
// console.log(sevenDaysPrior.toLocaleDateString(), "here");

const labels = getDaysArray(sevenDaysPrior, currentDate.toLocaleDateString());
// console.log(labels, "labels");
const coinMap = {
  'btc' : 'bitcoin',
  'eth' : 'ethereum',
  'usdt': 'tether',
  'usdc': 'usd-coin',
  'bnb': 'binancecoin',
  'xrp': 'ripple',
  'ada': 'cardano',
  'dai': 'dai'
}


export function PortfolioLineChart({holdingsMap}) {
  console.log(holdingsMap, "inside line chart");
  // console.log(labels, "inside");
  useEffect(() => {
    for (const label of labels) {
      const date = label;
      for (const key in holdingsMap) {
        // console.log(date, "date");
        
        axios.get(`https://api.coingecko.com/api/v3/coins/${coinMap[key]}/history?date=${date}&localization=false`).then((res) => {
          console.log(res.data.market_data.current_price.usd, "response");
        })
      }
    }
    
  }, [])
  const data = {
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
