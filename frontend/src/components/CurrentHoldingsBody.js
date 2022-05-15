import { AddCoinPopupFront} from "./AddCoinPopupFront";
import { useState, useEffect } from "react";
import { Button } from "@mui/material";
import CheckIcon from "./CheckIcon";
import axios from "axios";

const CurrentHoldingsBody = ({ tableData, columns, inWatchList, handleWatchListCheck}) => {
  const [selected, setSelected] = useState("portfolio");
  const [showCoinPopup, setShowCoinPopup] = useState(false)
  const [coinData, setCoinData] = useState({});
  const [checked, setChecked] = useState([])

  const setPriceColor = (data) => {
    const priceChange = data["price_change_percentage_24h"];
    return priceChange <= 0 ? "percent-change-red" : "percent-change-green";
  };

  const setGainColor = (data) => {
    const priceChange = data["gain_loss"];
    return priceChange <= 0 ? "gain-change-red" : "gain-change-green";
  };


  return (
    <>
      <AddCoinPopupFront trigger={showCoinPopup} setTrigger={setShowCoinPopup} passed={coinData}/>
    <tbody>
      {tableData.map((data) => {
        return (
          <tr key={data.id}>
            <td key="image">
              <img className="coin-img" src={data["image"]} alt="coin"></img>
            </td>
            <td>
            <Button
            className="coin-buy"
            variant="text"
            onClick={() => {
              setCoinData(data);
              setShowCoinPopup(true)
            }}
            >
            Buy
            </Button>
            </td>
            <td className="coin-name" key="name">{data["name"]}</td>
            <td className="coin-symbol" key="symbol">{data["symbol"].toUpperCase()}</td>
            <td key="price">${data["current_price"]}</td>
            <td key="market-cap">
              ${(data["cost_basis"].toFixed(2))}
            </td>
            <td key="percent-move">
              <div className="percent-move">
                <div className={setPriceColor(data)}>
                  {data["price_change_percentage_24h"].toFixed(2)}%
                </div>
              </div>
            </td>
            <td key="total-holdings">
              <div className="total-holdings">
                <div>
              ${(data["current_coin_amount"].toFixed(0))}
                </div>
                <div>
              {(data["current_coin_qty"].toFixed(2))}
                </div>
              </div>
            </td>
            <td key="gain-loss">
            <div className="percent-move">
              <div className={setGainColor(data)}>
                ${data['gain_loss'].toFixed(0)}
              </div>
            </div>
            </td>
            {/* <td><CheckIcon value={data}/></td> */}
            {/* {columns.map(({ accessor }) => {
        const tData = data[accessor] ? data[accessor] : "——";
        return <td key={accessor}>{tData}</td>;
       })} */}
          </tr>
        );
      })}
    </tbody>
    </>
  );
};

export default CurrentHoldingsBody;