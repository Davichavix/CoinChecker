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
    setTrigger(false);
    setQuantity(0);
    setCost(0);
    setError(false);
    setHelperText("");
  };

  const handleInputQty = (e) => {
    setQuantity(e.target.value);
    setError(false);
    setHelperText("");
  };

  const handleSubmit = async (e, type) => {
    e.preventDefault();
    // console.log(symbol, quantity, cost);

    if (!holdingsMap[symbol] && type === "sell") {
      setError(true);
      setHelperText(`Could not find ${symbol} in portfolio`);
      return;
    }

    if (quantity > holdingsMap[symbol] && type === "sell") {
      setError(true);
      setHelperText(
        `The quantity entered for ${symbol} is greater than the amount of ${symbol} in your portfolio`
      );
      return;
    }
    const cost_per_coin = cost * quantity;

    if (symbol && quantity && cost) {
      const URL = `/api/transactions`;
      const postPackage = {
        user: userInfo._id,
        coin: symbol,
        coin_amount: quantity,
        cash_amount: cost_per_coin,
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
        setCost(0);
        setQuantity(0);
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
              src="close-button.svg"
              // src={require("./images/3082404.png")}
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
              sx={{
                width: "300px",
                padding: "10px",
                backgroundColor: "white",
                borderTopLeftRadius: "5px",
                borderTopRightRadius: "5px",
              }}
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
              sx={{ width: "300px", padding: "10px", backgroundColor: "white" }}
            />
            <TextField
              value={cost}
              onInput={(e) => setCost(e.target.value)}
              id="outlined-basic"
              label="Cost"
              variant="outlined"
              sx={{
                width: "300px",
                padding: "10px",
                backgroundColor: "white",
                borderBottomLeftRadius: "5px",
                borderBottomRightRadius: "5px",
              }}
            />
            <div>
              <Button
                onClick={(e) => handleSubmit(e, "buy")}
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
                onClick={(e) => handleSubmit(e, "sell")}
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
