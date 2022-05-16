import React, { useState, useEffect } from "react";
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
import axios from "axios";

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
    const date = new Date(dt).toLocaleDateString("en-gb");
    arr.push(
      date.slice(0, 2) + "-" + date.slice(3, 5) + "-" + date.slice(6, 10)
    );
    // arr.push(new Date(dt).toLocaleDateString()); OLD
  }
  return arr;
};

const currentDate = new Date(Date.now());
const sevenDaysPrior = new Date(
  currentDate.getTime() - 7 * 24 * 60 * 60 * 1000
);

const labels = getDaysArray(sevenDaysPrior, currentDate.toLocaleDateString());
console.log(labels, "labels");

const coinMap = {
  btc: "bitcoin",
  eth: "ethereum",
  usdt: "tether",
  usdc: "usd-coin",
  bnb: "binancecoin",
  xrp: "ripple",
  ada: "cardano",
  dai: "dai",
};

export function PortfolioLineChart({ holdingsMap }) {
  const [yAxisData, setYAxisData] = useState([]);
  const data = {
    labels,
    datasets: [
      {
        label: "Value",
        data: yAxisData,
        borderColor: "rgb(53, 162, 235)",
        backgroundColor: "rgba(53, 162, 235, 0.5)",
      },
    ],
  };
  

  useEffect(() => {
    const historicalPriceObj = {};
    for (const label of labels) {
      const date = label;
      for (const key in holdingsMap) {
        axios
          .get(
            `https://api.coingecko.com/api/v3/coins/${coinMap[key]}/history?date=${date}&localization=false`
          )
          .then((res) => {
            if (!historicalPriceObj[date]) {
              historicalPriceObj[date] =
                res.data.market_data.current_price.usd * holdingsMap[key];
            } else {
              historicalPriceObj[date] +=
                res.data.market_data.current_price.usd * holdingsMap[key];
            }
            console.log(historicalPriceObj, "got em i think");
          })
          .then(() => {
            setYAxisData(Object.values(historicalPriceObj));
          });
      }
    }
  }, []);
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
