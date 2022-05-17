import React from "react";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Doughnut } from "react-chartjs-2";

ChartJS.register(ArcElement, Tooltip, Legend);

export const HoldingsVisual = ({ coinSymbol, coinValues, loading }) => {
  // console.log(coinSymbol, "here");
  console.log(coinValues, "values");
  const colors = {
    BTC: "rgba(242, 169, 0, 0.8)",
    WBTC: "rgba(242, 169, 0, 0.8)",
    DOGE: "rgba(203,152,0, 0.8)",
    ETH: "rgba(60, 60, 61, 0.8)",
    BNB: "rgba(255, 216, 61, 0.8)",
    USDC: "rgba(39, 117, 202, 0.8)",
    Cake: "rgba(209, 136, 79, 0.8)",
    USDT: "rgba(80,175,149, 0.8)",
    XRP: "rgba(67,76,84, 0.8)",
    ADA: "rgba(0,51,173,0.8)",
    SOL: "rgba(0, 255, 163, 0.8)",
    BUSD: "rgba(255, 216, 0, 0.8)",
    DOT: "rgba(230,0,122,0.8)",
    AVAX: "rgba(232,65,66, 0.8)",
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        display: true,
        position: "left",
        labels: {
          color: "white",

          font: {
            size: 28,
            weight: "bolder",
          },
        },
      },
      title: {
        display: true,
        text: "PORTFOLIO HOLDINGS",
        color: "white",
        margin: {
          left: "20px",
        },
        font: {
          size: 28,
          weight: "bolder",
        },
      },
      datalabels: {
        display: true,
      },
    },
    cutout: 180,
  };
  const data = {
    labels: coinSymbol,
    datasets: [
      {
        label: "Portfolio performance",
        data: coinValues.filter((coin) => coin !== 0),
        backgroundColor: coinSymbol.map((holding) => colors[holding]),
        // backgroundColor: [
        //   "rgba(255, 99, 132, 0.2)",
        //   "rgba(54, 162, 235, 0.2)",
        //   "rgba(255, 206, 86, 0.2)",
        //   "rgba(75, 192, 192, 0.2)",
        //   "rgba(75, 192, 192, 0.2)",
        // ],
        borderWidth: 0.9,
      },
    ],
  };

  return (
    <div style={{ width: "580px" }}>
      <Doughnut data={data} options={options} />
    </div>
  );
};
