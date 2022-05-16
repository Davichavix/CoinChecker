import { Button, Table, TableBody } from "@mui/material";
import React, { useEffect, useState } from "react";
import UserAvatar from "../components/UserAvatar";
import "./styles/Portfolio.css";
import DarkModeIcon from "@mui/icons-material/DarkMode";
import { CoinList } from "../components/CoinList";
import MyPortfolio from "../components/MyPortfolio";
import { NewsFeed } from "../components/NewsFeed";
import { AddCoinPopup } from "../components/AddCoinPopup";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Meta from "../components/Meta";

export const Portfolio = () => {
  const navigate = useNavigate();

  const [selected, setSelected] = useState("portfolio");
  const [showCoinPopup, setShowCoinPopup] = useState(false);
  const user = localStorage.getItem("userInfo");
  const coins = localStorage.getItem("coinData");
  const [coinArray, setCoinArray] = useState(
    JSON.parse(coins) ? JSON.parse(coins) : []
  );

  const [userInfo] = useState(JSON.parse(user));
  const [coinData, setCoinData] = useState([]);
  const [loading, setLoading] = useState(true);

  const [coinList, setCoinList] = useState([]);

  useEffect(() => {
    if (!userInfo || userInfo.length < 1) {
      navigate("/login");
      return;
    }

    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    const URL =
      "https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=500&page=1&sparkline=false&price_change_percentage=24h";

    const getCurrentCoinPrices = axios.get(
      "https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=50&page=1&sparkline=false&price_change_percentage=24h"
    );

    const getPortfolioHoldings = axios.get(
      `/api/portfolio/user/${userInfo._id}`,
      config
    );

    const getCoinList = axios.get(URL);

    Promise.all([getCurrentCoinPrices, getPortfolioHoldings, getCoinList]).then(
      (res) => {
        setCoinArray(res[0].data);
        setCoinData(res[1].data);
        localStorage.setItem("coinData", JSON.stringify(res[1].data));
        setCoinList(res[2].data);
        setLoading(false);
      }
    );
  }, [coins]);

  const getEverything = (coinData, coinArray) => {
    let symbol = coinData["_id"]["symbol"];
    let currentCoin = coinArray.filter((coin) => {
      // console.log(coin.symbol === symbol, coin.symbol, symbol);
      return coin.symbol === symbol;
    });
    const currentPrice = currentCoin[0].current_price;
    const coinGainLoss =
      coinData.cashSold -
      coinData.cashBought +
      currentPrice * coinData.currentCoinAmount;
    // console.log(coinGainLoss, "currentprice");
    return coinGainLoss;
  };

  let sum = 0;
  const getTotalGainLoss = (coinData, coinArray) => {
    if (coinData.length) {
      const gainLossObject = {};
      for (let coin of coinData) {
        gainLossObject[coin._id.symbol] = getEverything(coin, coinArray);
        sum += gainLossObject[coin._id.symbol];
      }

      return gainLossObject;
    }
  };

  const getCoinQtyInPortfolio = (coinData) => {
    if (coinData.length) {
      const currentCoininPortOjb = {};
      for (let coin of coinData) {
        currentCoininPortOjb[coin._id.symbol] = coin.currentCoinAmount;
      }
      return currentCoininPortOjb;
    }
  };

  const getCoinCostBasis = (coinData) => {
    if (coinData.length) {
      const coinCostBasisObj = {};
      for (let coin of coinData) {
        coinCostBasisObj[coin._id.symbol] = coin.avgCost;
      }
      return coinCostBasisObj;
    }
  };

  const gainLossObject = getTotalGainLoss(coinData, coinArray);
  const currentCoininPortOjb = getCoinQtyInPortfolio(coinData);
  const coinCostBasisObj = getCoinCostBasis(coinData);

  console.log(currentCoininPortOjb, "currentCoininPortOjb");

  const holdingsMap = {};
  coinData.forEach((coin) => {
    const ticker = coin._id.symbol;

    if (!holdingsMap[ticker]) {
      holdingsMap[ticker] = coin.currentCoinAmount;
    } else {
      holdingsMap[ticker] += coin.currentCoinAmount;
    }
  });

  const tickers = Object.keys(holdingsMap);

  const holdingsPriceMap = {};
  for (let coin of coinArray) {
    if (holdingsMap[coin.symbol]) {
      holdingsPriceMap[coin.symbol] = coin.current_price;
    }
  }

  const coinPortfolioValues = [];
  for (let coin in holdingsMap) {
    let quantity = holdingsMap[coin];
    let price = holdingsPriceMap[coin] || 0;
    let value = quantity * price;
    coinPortfolioValues.push(value);
  }
  // console.log(holdingsMap, "holdingsmap");
  const handleSelected = (selected) => {
    setSelected(selected);
  };

  return (
    <div>
      <Meta title={"My Portfolio"} />

      <div className="portfolio-header">
        <div className="right-btns">
          {/* <AddCoinPopup
            trigger={showCoinPopup}
            setTrigger={setShowCoinPopup}
            coinList={coinList}
            userInfo={userInfo}
            setCoinData={setCoinData}
            holdingsMap={holdingsMap}
          />
          <Button
            onClick={() => setShowCoinPopup(true)}
            className="new-coin-btn"
            variant="contained"
            sx={{
              ":hover": { backgroundColor: "white", color: "green" },
              backgroundColor: "green ",
              color: "white",
              marginRight: "1rem",
              height: "50px",
            }}
          >
            Record transaction
          </Button> */}
        </div>
      </div>
      <div className="portfolio-btns">
        <button
          className={
            selected === "portfolio" ? "toggle-views active" : "toggle-views"
          }
          onClick={() => handleSelected("portfolio")}
        >
          MY PORTFOLIO
        </button>
        {/* <button
          className={
            selected === "watchlist" ? "toggle-views active" : "toggle-views"
          }
          onClick={() => handleSelected("watchlist")}
        >
          MY WATCHLIST
        </button>
        <button
          className={
            selected === "newsfeed" ? "toggle-views active" : "toggle-views"
          }
          onClick={() => handleSelected("newsfeed")}
        >
          CRYPTO NEWS
        </button> */}
        <AddCoinPopup
            trigger={showCoinPopup}
            setTrigger={setShowCoinPopup}
            coinList={coinList}
            userInfo={userInfo}
            setCoinData={setCoinData}
            holdingsMap={holdingsMap}
          />
          <Button
            onClick={() => setShowCoinPopup(true)}
            className="new-coin-btn"
            variant="contained"
            sx={{
              ":hover": { backgroundColor: "white", color: "green" },
              backgroundColor: "green ",
              color: "white",
              marginRight: "1rem",
              height: "50px",
            }}
          >
            Record transaction
          </Button>
      </div>
      {selected === "portfolio" && !loading && (
        <MyPortfolio
          coinValues={coinPortfolioValues}
          coinSymbol={tickers}
          loading={loading}
          gainLoss={sum}
          coinPort={coinData}
          gainLossObject={gainLossObject}
          currentCoininPortOjb={currentCoininPortOjb}
          coinCostBasisObj={coinCostBasisObj}
        />
      )}
      {selected === "watchlist" && <CoinList />}
      {selected === "newsfeed" && <NewsFeed />}
    </div>
  );
};
