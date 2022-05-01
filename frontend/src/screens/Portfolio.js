import { Button } from "@mui/material";
import React from "react";
import UserAvatar from "../components/UserAvatar";
import "./styles/Portfolio.css";
import DarkModeIcon from "@mui/icons-material/DarkMode";
import { CoinList } from "../components/CoinList";
import MyPortfolio from "../components/MyPortfolio";
import { useState } from "react";

export const Portfolio = () => {
  const [active, setActive] = useState(true)
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
        <button onClick={() => setActive(!active)}>MY PORTFOLIO</button>
        <button onClick={() => setActive(!active)}>MY WATCHLIST</button>
        <button>CRYPTO NEWS</button>
      </div>
      <MyPortfolio active={active}/>
      <div>
        <CoinList />
      </div>
    </div>
  );
};
