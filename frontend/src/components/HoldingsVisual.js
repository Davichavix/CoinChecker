import React from "react";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Doughnut } from "react-chartjs-2";

ChartJS.register(ArcElement, Tooltip, Legend);

const colors = {
  Bitcoin: "rgba(242, 169, 0, 0.8)",
  Doge: "rgba(203,152,0, 0.8)",
  Ethereum: "rgba(60, 60, 61, 0.8)",
  Luna: "rgba(255, 216, 61, 0.8)",
  USDC: "rgba(39, 117, 202, 0.8)",
  Cake: "rgba(209, 136, 79, 0.8)",
};

export const HoldingsVisual = ({
  coinSymbol,
  coinValues,
  loading,
}) => {
  console.log(coinSymbol, "here");
  console.log(coinValues, "values");
  const data = {
    labels: coinSymbol,
    datasets: [
      {
        label: "Portfolio performance",
        data: coinValues,
        backgroundColor: [
          "rgba(255, 99, 132, 0.2)",
          "rgba(54, 162, 235, 0.2)",
          "rgba(255, 206, 86, 0.2)",
          "rgba(75, 192, 192, 0.2)",
        ],
        borderWidth: 0.5,
      },
    ],
  };

  return (
    <div style={{ width: "90%" }}>
      { <Doughnut data={data} options={{ cutout: 250 }} />}
      
    </div>
  );
};
