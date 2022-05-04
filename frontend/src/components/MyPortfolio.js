import React from "react";
import { Snapshot } from "./Snapshot";
import { HoldingsVisual } from "./HoldingsVisual";
import { ChartTitle } from "./ChartTitle";
import { PortfolioLineChart } from "./PortfolioLineChart";

const MyPortfolio = ({ active }) => {
  return (
    <div>
      <div>
        <div className="card-snapshot">
          <Snapshot label="Total Balance" dollars="$5,000,000" />
          <Snapshot label="Day's Gain/Loss" dollars="-$500" />
          <Snapshot label="Total Profit/Loss" dollars="$500,000" />
        </div>
        <div className="visuals">
          <div style={{ width: "30%" }}>
            <HoldingsVisual />
            <ChartTitle title="PORTFOLIO ALLOCATION" />
          </div>
          <div style={{ width: "50%" }}>
            <PortfolioLineChart />
            <ChartTitle title="PORTFOLIO PERFORMANCE" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default MyPortfolio;
