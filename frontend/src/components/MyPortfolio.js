import { Snapshot } from "./Snapshot";
import { HoldingsVisual } from "./HoldingsVisual";
import { ChartTitle } from "./ChartTitle";
import { PortfolioLineChart } from "./PortfolioLineChart";

const MyPortfolio = ({ coinSymbol, coinValues, loading }) => {
  return (
    <div>
      <div>
        <div className="card-snapshot">
          <Snapshot label="Total Balance" dollars="$500000" />
          <Snapshot label="Day's Gain/Loss" dollars="-$500" />
          <Snapshot label="Total Profit/Loss" dollars="$500,000" />
        </div>
        <div className="visuals">
          <div style={{ width: "30%" }}>
            <HoldingsVisual coinSymbol={coinSymbol} coinValues={coinValues} loading={loading}/>
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
