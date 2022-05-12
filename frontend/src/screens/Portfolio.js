import { Button } from "@mui/material";
import React, { useEffect } from "react";
import UserAvatar from "../components/UserAvatar";
import "./styles/Portfolio.css";
import DarkModeIcon from "@mui/icons-material/DarkMode";
import { CoinList } from "../components/CoinList";
import MyPortfolio from "../components/MyPortfolio";
import { useState } from "react";
import { NewsFeed } from "../components/NewsFeed";
import { AddCoinPopup } from "../components/AddCoinPopup";
import axios from "axios";

export const Portfolio = () => {
  const [selected, setSelected] = useState("portfolio");
  const [showCoinPopup, setShowCoinPopup] = useState(false);
  const user = localStorage.getItem("userInfo");

  const [userInfo, setUserInfo] = useState(JSON.parse(user));
  const [coinData, setCoinData] = useState([]);
  const [loading, setLoading] = useState(true);

  const [coinList, setCoinList] = useState([]);

  const config = {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${userInfo.token}`,
    },
  };

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("userInfo"));
    const URL =
      "https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=500&page=1&sparkline=false&price_change_percentage=24h";

    axios.get(`/api/portfolio/user/${userInfo._id}`, config).then((res) => {
      setCoinData(res.data);
      setLoading(false);
    });

    axios.get(URL).then(({ data }) => {
      setCoinList(data);
    });
  }, []);

  const handleSelected = (selected) => {
    setSelected(selected);
  };

  return (
    <div>
      Portfolio
      <div className="portfolio-header">
        <UserAvatar />
        <div className="right-btns">
          <DarkModeIcon sx={{ marginTop: "12px", marginRight: "10px" }} />
          <AddCoinPopup
            trigger={showCoinPopup}
            setTrigger={setShowCoinPopup}
            coinList={coinList}
            userInfo={userInfo}
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
            Add new coin!
          </Button>
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
        <button
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
        </button>
      </div>
      {selected === "portfolio" && !loading && (
        <MyPortfolio coinData={coinData} />
      )}
      {selected === "watchlist" && <CoinList />}
      {selected === "newsfeed" && <NewsFeed />}
      {/* <MyPortfolio active={isActivePortfolio} />
      <CoinList active={isActiveWatchlist} />
      <NewsFeed active={isActiveNews}/> */}
    </div>
  );
};
