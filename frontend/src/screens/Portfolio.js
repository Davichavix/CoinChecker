import React from "react";
import { Snapshot } from "../components/Snapshot";
import UserAvatar from "../components/UserAvatar";
import "./styles/Portfolio.css"

export const Portfolio = () => {
  return (
    <div>
      Portfolio
      <div className="portfolio-header">
        <UserAvatar />
      </div>
      <div className="card-snapshot">
        <Snapshot label="Total Balance" dollars="$5,000,000" />
        <Snapshot label="Day's Gain/Loss" dollars="-$500" />
        <Snapshot label="Total Profit/Loss" dollars="$500,000" />
      </div>
    </div>
  );
};
