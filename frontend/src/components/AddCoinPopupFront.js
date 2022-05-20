import React from "react";
import { Button, TextField } from "@mui/material";
import { useState } from "react";
import "./AddCoinPopup.css";
import axios from "axios";

export const AddCoinPopupFront = ({ trigger, setTrigger, passed, setCoinData}) => {
  const [error, setError] = useState(false);
  const [symbol, setSymbol] = useState("");
  const [quantity, setQuantity] = useState(0);
  const [cost, setCost] = useState(0);
  const [helperText, setHelperText] = useState("");

  const userInfo = JSON.parse(localStorage.getItem("userInfo"));

  const handleClickClose = () => {
    setTrigger(false);
    setQuantity(0);
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

    const cost = passed["current_price"];
    const cost_per_coin = cost * quantity;
    const symbol = passed["symbol"];

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
        setCoinData(data)
        
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
            <h2 className="header-title">{`ADD OR SELL ${passed["name"].toUpperCase()}`}</h2>

            <img
              className="close-btn"
              alt="close-button"
              src="close-button.svg"
              onClick={handleClickClose}
            />
          </div>
          <form style={{ display: "flex", flexDirection: "column" }}>
            <TextField
              disabled
              value={passed["name"]}
              id="outlined-basic"
              variant="outlined"
              sx={{
                width: "300px",
                padding: "10px",
                backgroundColor: "white",
                borderTopLeftRadius: "5px",
                borderTopRightRadius: "5px",
              }}
            />
            <TextField
              value={quantity}
              onInput={handleInputQty}
              id="outlined-number"
              label="Quantity"
              type="number"
              sx={{ width: "300px", padding: "10px", backgroundColor: "white" }}
            />
            <TextField
              disabled
              value={passed["current_price"]}
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
