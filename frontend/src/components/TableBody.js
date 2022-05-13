import { AddCoinPopupFront} from "./AddCoinPopupFront";
import { useState } from "react";
import { Button } from "@mui/material";
import CheckIcon from "./CheckIcon";

const TableBody = ({ tableData, columns }) => {
  const setPriceColor = (data) => {
    const priceChange = data["price_change_percentage_24h"];
    return priceChange <= 0 ? "percent-change-red" : "percent-change-green";
  };

  const [selected, setSelected] = useState("portfolio");
  const [showCoinPopup, setShowCoinPopup] = useState(false)
  const [coinData, setCoinData] = useState({});

  const handleSelected = (selected) => {
    setSelected(selected);
  };

  const [checked, setChecked] = useState([])

  const handleCheck = (value) => {
    let watchList = [...checked]
    if (!checked.includes(value)) {      
      watchList = [...checked, value]
    } else {
      watchList.splice(checked.indexOf(value), 1);
    }
    setChecked(watchList)
    console.log(watchList)
  }
  const isChecked = (item) => {
    return checked.includes(item) ? "checked-item" : "not-checked-item";
  }


  return (
    <>
     <AddCoinPopup trigger={showCoinPopup} setTrigger={setShowCoinPopup} passedData={coinData}/>
    <tbody>
      {tableData.map((data) => {
        return (
          <tr key={data.id}>
            <td key="image">
              <img className="coin-img" src={data["image"]} alt="coin"></img>
            </td>
            <td>
            <AddCoinPopupFront trigger={showCoinPopup} setTrigger={setShowCoinPopup} passed={data}/>
            <Button
            className="coin-buy"
            variant="text"
            onClick={() => {
              setCoinData(data)
              setShowCoinPopup(true)
              }
            }
            >
            Buy
            </Button>
            </td>
            <td className="coin-name" key="name">{data["name"]}</td>
            <td className="coin-symbol" key="symbol">{data["symbol"]}</td>
            <td key="price">${data["current_price"]}</td>
            <td key="market-cap">
              ${(data["market_cap"] / 1000000000).toFixed(2)}B
            </td>
            <td key="percent-move">
              <div className="percent-move">
                <div className={setPriceColor(data)}>
                  {data["price_change_percentage_24h"].toFixed(2)}%
                </div>
              </div>
            </td>
            <td key="total-volume">
              ${(data["total_volume"] / 1000000000).toFixed(2)}B
            </td>
            <td>
              <CheckIcon value={data.id} setCheck={() => handleCheck(data.id)}/>
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

export default TableBody;
