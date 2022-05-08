import { AddCoinPopup } from "./AddCoinPopup";
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

  const handleSelected = (selected) => {
    setSelected(selected);
  };

  const [checked, setChecked] = useState([])

  const handleCheck = (e) => {
    let watchList = [...checked];
    if (e.target.checked) {
      watchList = [...checked, e.target.value];
    } else {
      watchList.splice(checked.indexOf(e.target.value), 1);
    }
    setChecked(watchList);
    console.log(watchList)
  }

  const isChecked = (item) => {
    return checked.includes(item) ? "checked-item" : "not-checked-item";
  }

  return (
    <tbody>
      {tableData.map((data, index) => {
        return (
          <tr key={data.id}>
            <td key="image">
              <img className="coin-img" src={data["image"]} alt="coin"></img>
            </td>
            <td>
            <AddCoinPopup trigger={showCoinPopup} setTrigger={setShowCoinPopup}/>
            <Button
            className="coin-buy"
            variant="text"
            onClick={() => setShowCoinPopup(true)}
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
              <div key={index}>
              <span>{data.id}</span>
              <input value={data.id} type="checkbox" onChange={handleCheck}/>
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
  );
};

export default TableBody;
