import { Button } from "@mui/material";
import React from "react";
import { Snapshot } from "../components/Snapshot";
import UserAvatar from "../components/UserAvatar";
import "./styles/Portfolio.css";
import DarkModeIcon from "@mui/icons-material/DarkMode";
import { HoldingsVisual } from "../components/HoldingsVisual";

export const Portfolio = () => {
  return (
    <div>
      Portfolio
      <div className="portfolio-header">
        <UserAvatar />
        <div className ="right-btns">
          <DarkModeIcon sx={{marginTop: "5px"}}/>
          <Button
            className="new-coin-btn"
            variant="contained"
            sx={{
              ":hover": { backgroundColor: "white", color: "green" },
              backgroundColor: "green ",
              color: "white",
              marginRight: "1rem",
            }}
          >
            Add new coin!
          </Button>
        </div>
      </div>
      <div className="card-snapshot">
        <Snapshot label="Total Balance" dollars="$5,000,000" />
        <Snapshot label="Day's Gain/Loss" dollars="-$500" />
        <Snapshot label="Total Profit/Loss" dollars="$500,000" />
      </div>
      <div className="visuals">
        {/* <img className="holdings-pie-chart"></img> */}
        <HoldingsVisual />
        <img className="graph"></img>

      </div>
    </div>
  );
};
