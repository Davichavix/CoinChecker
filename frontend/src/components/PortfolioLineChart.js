import React, { useEffect, useState } from "react";
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
  const unixTime = []
  for (
    const dt = new Date(start);
    dt <= new Date(end);
    dt.setDate(dt.getDate() + 1)
  ) {
    const date = new Date(dt).toLocaleDateString('en-gb')
    arr.push(date.slice(0, 2) + '-' + date.slice(3, 5) + '-' + date.slice(6, 10));
    unixTime.push(Math.round((new Date(dt)).getTime() / 1000))
    
  }
  return {arr, unixTime};
};



const currentDate = new Date(Date.now());
const sevenDaysPrior = new Date(
  currentDate.getTime() - 14 * 24 * 60 * 60 * 1000
);
// console.log(sevenDaysPrior.toLocaleDateString(), "here");

const labels = getDaysArray(sevenDaysPrior, currentDate.toLocaleDateString()).arr;
const unixTimesArr = getDaysArray(sevenDaysPrior, currentDate.toLocaleDateString()).unixTime;
// console.log(labels, "labels");
// console.log(test, "unix");
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
  const [xAxisData, setXAxisData] = useState([])
  const [loading, setLoading] = useState(true)

  console.log(holdingsMap, "inside line chart");
  // console.log(labels, "inside");
  useEffect(() => {
    const historicalPriceObj = {}
    
    for (const label of labels) {
      const date = label;
      for (const key in holdingsMap) {
        // console.log(date, "date");
        // console.log(holdingsMap, "map inside");
        axios.get(`https://api.coingecko.com/api/v3/coins/${coinMap[key]}/history?date=${date}&localization=false`).then((res) => {
          // console.log(res.data.market_data.current_price.usd, "response", date, "date", key);
          // if (!historicalPriceObj[date]) {
          //   historicalPriceObj[date] =[res.data.market_data.current_price.usd * holdingsMap[key]]
          // } else {
          //   historicalPriceObj[date].push(res.data.market_data.current_price.usd * holdingsMap[key])
          // }
          if (!historicalPriceObj[date]) {
            historicalPriceObj[date] =res.data.market_data.current_price.usd * holdingsMap[key]
          } else {
            historicalPriceObj[date] += res.data.market_data.current_price.usd * holdingsMap[key]
          }
        }).then(() => {
          setXAxisData(Object.values(historicalPriceObj))
      console.log(Object.values(historicalPriceObj, "got em"));
        })
      }
    }
    console.log(historicalPriceObj, "this one");
    // setLoading(false)
    if (Object.keys(historicalPriceObj)) {
      setXAxisData(Object.values(historicalPriceObj))
      console.log(Object.values(historicalPriceObj, "got em"));
    }
    
  }, [])

  // if (Object.keys(historicalPriceObj)) {
  //   // console.log('true');
  //   setXAxisData(Object.values(historicalPriceObj))
  //   console.log(Object.values(historicalPriceObj), "hereeee");
  //   setLoading(false)
  // }

  const data = {
    labels,
    datasets: [
      {
        label: "Value",
        data: xAxisData,
        // data: labels.map(
        //   (label, i) => (i + 1) * Math.floor(Math.random() * 10000)
        // ),
        borderColor: "rgb(53, 162, 235)",
        backgroundColor: "rgba(53, 162, 235, 0.5)",
      },
    ],
  };
  return (
    <div style={{ marginTop: "50px" }}>
      {/* {!loading && <Line options={options} data={data} />} */}
      <Line options={options} data={data} />
    </div>
  );
}

// datalabels: {
//   formatter: function(value, context) {
//     return context.chart.data.labels[context.dataIndex];
//   },

// import "chartjs-plugin-datalabels";
