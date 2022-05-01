import { Button } from "@mui/material";
import React from "react";
import UserAvatar from "../components/UserAvatar";
import "./styles/Portfolio.css";
import DarkModeIcon from "@mui/icons-material/DarkMode";
import { CoinList } from "../components/CoinList";
import MyPortfolio from "../components/MyPortfolio";
import { useState } from "react";

export const Portfolio = () => {
  const [isActivePortfolio, setIsActivePortfolio] = useState(true);
  const [isActiveWatchlist, setIsActiveWatchList] = useState(false);
  const [isActiveNews, setIsActiveNews] = useState(false);

  const handlePortfolioClick = () => {
    setIsActiveWatchList(false);
    setIsActiveNews(false);
    setIsActivePortfolio(!isActivePortfolio);
  };

  const handleWatchlistClick = () => {
    setIsActiveWatchList(!isActiveWatchlist);
    setIsActiveNews(false);
    setIsActivePortfolio(false);
  };

  return (
    <div>
      Portfolio
      <div className="portfolio-header">
        <UserAvatar />
        <div className="right-btns">
          <DarkModeIcon sx={{ marginTop: "12px", marginRight: "10px" }} />
          <Button
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
      <div>
        <button className="toggle-views" onClick={handlePortfolioClick}>MY PORTFOLIO</button>
        <button className="toggle-views" onClick={handleWatchlistClick}>MY WATCHLIST</button>
        <button className="toggle-views" onClick={() => setIsActiveNews(!isActiveNews)}>
          CRYPTO NEWS
        </button>
      </div>
      <MyPortfolio active={isActivePortfolio} />
      <CoinList active={isActiveWatchlist}/>
    </div>
  );
};
