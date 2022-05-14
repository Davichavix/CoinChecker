import React from "react";
import { Autocomplete, Button, TextField } from "@mui/material";
import { useState } from "react";
import "./AddCoinPopup.css";
import axios from "axios";

export const AddCoinPopup = ({
  trigger,
  setTrigger,
  coinList,
  userInfo,
  holdingsMap,
}) => {
  const [error, setError] = useState(false);
  const [symbol, setSymbol] = useState("");
  const [quantity, setQuantity] = useState(0);
  const [cost, setCost] = useState(0);
  const [helperText, setHelperText] = useState("");

  const validCoins = coinList.map((coin) => {
    return coin.symbol;
  });

  console.log(holdingsMap, "inn add coinpopup");

  const handleClickClose = () => {
    setTrigger(false)
    setQuantity(0)
    setCost(0)
    setError(false)
    setHelperText("")
  }

  const handleInputQty = (e) => {
    setQuantity(e.target.value)
    setError(false)
    setHelperText("")
  }

  const handleSubmit = async (type) => {
    // e.preventDefault();
    // console.log(symbol, quantity, cost);

    if (!holdingsMap[symbol] && type === "sell") {
      setError(true);
      setHelperText(`Could not find ${symbol} in portfolio`);
      return;
    }

    if (quantity > holdingsMap[symbol]) {
      setError(true);
      setHelperText(
        `The quantity entered for ${symbol} is greater than the amount of ${symbol} in your portfolio`
      );
      return;
    }

    if (symbol && quantity && cost) {
      const URL = `/api/transactions`;
      const postPackage = {
        user: userInfo._id,
        coin: symbol,
        coin_amount: quantity,
        cash_amount: cost,
        buy: type === "buy",
        sell: type === "sell",
      };

      try {
        const config = {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${userInfo.token}`,
          },
        };
        await axios.post(URL, postPackage, config);

        const { data } = await axios.get(
          `/api/portfolio/user/${userInfo._id}`,
          config
        );

        localStorage.setItem("coinData", JSON.stringify(data));
        setTrigger(false);
      } catch (err) {
        console.log(err);
      }
    }
  };

  return (
    trigger && (
      <div className="overall-container">
        <div className="add-coin-container">
          <div className="header-container">
            <h2 className="header-title">RECORD A NEW TRANSACTION</h2>

            <img
              className="close-btn"
              alt="close-button"
              src={require("./images/3082404.png")}
              onClick={handleClickClose}
            />
          </div>
          <form
            style={{ display: "flex", flexDirection: "column" }}
            // onSubmit={handleSubmit}
          >
            <Autocomplete
              // disabledPortal
              id="add-coin-symbol-input"
              options={validCoins}
              sx={{ width: "300px", padding: "10px" }}
              renderInput={(params) => <TextField {...params} label="Symbol" />}
              onChange={(event, value) => setSymbol(value)}
            />
            {/* <TextField
              value={symbol}
              onInput={e => setSymbol(e.target.value)}
              error={error}
              helperText={
                error && "Not a valid coin. Example - ETH for Ethereum"
              }
              id="outlined-basic"
              label="Coin Symbol"
              variant="outlined"
              sx={{ width: "300px", padding: "10px" }}
              onBlur={handleChange}
            /> */}
            <TextField
              error={error}
              helperText={helperText}
              value={quantity}
              // onInput={(e) => setQuantity(e.target.value)}
              onInput={handleInputQty}
              id="outlined-number"
              label="Quantity"
              type="number"
              sx={{ width: "300px", padding: "10px" }}
            />
            <TextField
              value={cost}
              onInput={(e) => setCost(e.target.value)}
              id="outlined-basic"
              label="Cost"
              variant="outlined"
              sx={{ width: "300px", padding: "10px" }}
            />
            <div>
              <Button
                onClick={() => handleSubmit("buy")}
                type="submit"
                variant="contained"
                sx={{
                  ":hover": { backgroundColor: "white", color: "green" },
                  backgroundColor: "green ",
                  color: "white",
                  marginRight: "1rem",
                  height: "50px",
                  width: "100px",
                  margin: "10px",
                }}
              >
                BUY
              </Button>
              <Button
                onClick={() => handleSubmit("sell")}
                variant="contained"
                sx={{
                  ":hover": { backgroundColor: "white", color: "red" },
                  backgroundColor: "red ",
                  color: "white",
                  marginRight: "1rem",
                  height: "50px",
                  width: "100px",
                  margin: "10px",
                }}
              >
                SELL
              </Button>
            </div>
          </form>
        </div>
      </div>
    )
  );
};
