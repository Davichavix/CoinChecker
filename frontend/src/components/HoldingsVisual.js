import React, { useEffect, useState } from "react";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Doughnut } from "react-chartjs-2";
import axios from "axios";

ChartJS.register(ArcElement, Tooltip, Legend);

const colors = {
  Bitcoin: "rgba(242, 169, 0, 0.8)",
  Doge: "rgba(203,152,0, 0.8)",
  Ethereum: "rgba(60, 60, 61, 0.8)",
  Luna: "rgba(255, 216, 61, 0.8)",
  USDC: "rgba(39, 117, 202, 0.8)",
  Cake: "rgba(209, 136, 79, 0.8)",
};

const holdings = ["Bitcoin", "Doge", "Ethereum", "Luna", "USDC", "Cake"];

// export const data = {
//   labels: ["Bitcoin", "Doge", "Ethereum", "Luna", "USDC", "Cake"],
//   datasets: [
//     {
//       label: "# of Votes",
//       data: [50000, 2500, 30000, 5000, 25000, 3500],
//       backgroundColor: holdings.map((holding) => colors[holding] || "rgba(255, 99, 132, 0.2"),
//       // backgroundColor: [
//       //   "rgba(255, 99, 132, 0.2)",
//       //   "rgba(54, 162, 235, 0.2)",
//       //   "rgba(255, 206, 86, 0.2)",
//       //   "rgba(75, 192, 192, 0.2)",
//       //   "rgba(153, 102, 255, 0.2)",
//       //   "rgba(255, 159, 64, 0.2)",
//       // ],
//       // borderColor: [
//       //   "rgba(255, 99, 132, 1)",
//       //   "rgba(54, 162, 235, 1)",
//       //   "rgba(255, 206, 86, 1)",
//       //   "rgba(75, 192, 192, 1)",
//       //   "rgba(153, 102, 255, 1)",
//       //   "rgba(255, 159, 64, 1)",
//       // ],
//       borderWidth: 0.5,
//     },
//   ],
// };

export const HoldingsVisual = ({ coinData }) => {
  const [coinArray, setCoinArray] = useState([]);
  const [loading, setLoading] = useState(true);
  const [chartData, setChartData] = useState({})
  useEffect(() => {
    axios
      .get(
        "https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=50&page=1&sparkline=false&price_change_percentage=24h"
      )
      .then((res) => {
        setCoinArray(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  useEffect(() => {
    if (loading) {
      return;
    }
    const holdingsMap = {};
    coinData.map((coin) => {
      const ticker = coin._id.symbol;
      // console.log(ticker, "ticker");
      // console.log(coin, "amt");
      if (!holdingsMap[ticker]) {
        holdingsMap[ticker] = coin.currentCoinAmount;
      } else {
        holdingsMap[ticker] += coin.currentCoinAmount;
      }
    });

    // console.log(holdingsMap, "MAP holdings");
    const coinSymbol = Object.keys(holdingsMap);
    
    const holdingsPriceMap = {};
    // console.log(coinArray, "HERE");

    for (let coin of coinArray) {
      // console.log(coin, "COIN");
      if (holdingsMap[coin.symbol]) {
        holdingsPriceMap[coin.symbol] = coin.current_price;
      }
    }

    // console.log(holdingsPriceMap, "Full object");

    const coinValues = [];

    for (let coin in holdingsMap) {
      let quantity = holdingsMap[coin];
      let price = holdingsPriceMap[coin];
      let value = quantity * price;
      // console.log(coin, "Coin");
      // console.log(quantity, "qty");
      // console.log(price, "price");
      coinValues.push(value);
    }
    setChartData({
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
    })
    // console.log(coinValues, "FINALLLL");
  }, [loading]);

  // let coinSymbol = [];
  // let coinAmount = [];

  // ******OLD CODE***
  // coinSymbol = coinData.map((user) => {
  //   return user._id.symbol;
  // });

  // const holdingsMap = {};
  // coinData.map((coin) => {
  //   const ticker = coin._id.symbol;
  //   if (!holdingsMap[ticker]) {
  //     holdingsMap[ticker] = coin.currentAmount;
  //   } else {
  //     holdingsMap[ticker] += coin.currentAmount;
  //   }
  // });

  // // console.log(holdingsMap, "MAP holdings");
  // const coinSymbol = Object.keys(holdingsMap);

  // const holdingsPriceMap = {};

  // if (!loading) {
  //   for (let coin of coinArray) {
  //     // console.log(coin, "COIN");
  //     if (holdingsMap[coin.symbol]) {
  //       holdingsPriceMap[coin.symbol] = coin.current_price;
  //     }
  //   }
  // }

  // // console.log(holdingsPriceMap, "Full object");

  // const coinValues = []

  // for (let coin in holdingsMap) {
  //   let quantity = holdingsMap[coin]
  //   let price = holdingsPriceMap[coin]
  //   let value = quantity * price
  //   // console.log(coin, "Coin");
  //   // console.log(quantity, "qty");
  //   // console.log(price, "price");
  //   coinValues.push(value)
  // }

  // console.log(coinValues, "FINALLLL")

  // ** OLD**//
  // coinAmount = coinData.map((user) => {
  //   return user.currentAmount;
  // });
  // const filteredArr = coinArray.filter((coin) => {
  //   return coinSymbol.includes(coin.symbol);
  // });
  // const finalArray = filteredArr.map((coin) => {
  //   return coin.current_price;
  // });
  // const coinValues = finalArray.map((coin, i) => {
  //   return coin * coinAmount[i];
  // });

  // const data = {
  //   labels: coinSymbol,
  //   datasets: [
  //     {
  //       label: "Portfolio performance",
  //       data: coinValues,
  //       backgroundColor: [
  //         "rgba(255, 99, 132, 0.2)",
  //         "rgba(54, 162, 235, 0.2)",
  //         "rgba(255, 206, 86, 0.2)",
  //         "rgba(75, 192, 192, 0.2)",
  //       ],
  //       borderWidth: 0.5,
  //     },
  //   ],
  // };
  return (
    <div style={{ width: "90%" }}>
      {!loading && Object.keys(chartData).length && <Doughnut data={chartData} options={{ cutout: 250 }} />}
      {/* <Doughnut data={chartData} options={{ cutout: 250 }} /> */}
    </div>
  );
};
