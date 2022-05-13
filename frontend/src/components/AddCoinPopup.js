import React from "react";
import { Autocomplete, Button, TextField } from "@mui/material";
import { useState } from "react";
import "./AddCoinPopup.css";
import axios from "axios";

export const AddCoinPopup = ({ trigger, setTrigger, coinList, userInfo }) => {
  const [error, setError] = useState(false);
  const [symbol, setSymbol] = useState("");
  const [quantity, setQuantity] = useState(0);
  const [cost, setCost] = useState(0);

  const validCoins = coinList.map((coin) => {
    return coin.symbol;
  });

  const config = {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${userInfo.token}`,
    },
  };

  // console.log(userInfo);

  const handleSubmit = async (e) => {
    e.preventDefault();
    // console.log(symbol, quantity, cost);

    if (symbol && quantity && cost) {
      const URL = `/api/transactions`;
      const postPackage = {
        user: userInfo._id,
        coin: symbol,
        coin_amount: quantity,
        cash_amount: cost,
        buy: true,
      };

      try {
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
            <h2 className="header-title">ADD NEW COIN</h2>

            <img
              className="close-btn"
              alt="close-button"
              src={require("./images/3082404.png")}
              onClick={() => setTrigger(false)}
            />
          </div>
          <form
            style={{ display: "flex", flexDirection: "column" }}
            onSubmit={handleSubmit}
          >
            <Autocomplete
              disabledPortal
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
              value={quantity}
              onInput={(e) => setQuantity(e.target.value)}
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
            <Button
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
              ADD
            </Button>
          </form>
        </div>
      </div>
    )
  );
};
