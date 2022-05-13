import React from "react";
import { Button, TextField } from "@mui/material";
import { useState } from "react";
import "./AddCoinPopup.css";
import axios from "axios";

export const AddCoinPopupFront = ({ trigger, setTrigger, passed }) => {
  const [error, setError] = useState(false);
  const [symbol, setSymbol] = useState('')
  const [quantity, setQuantity] = useState(0)
  const [cost, setCost] = useState(0)

  const validCoins = {
    "Bitcoin": true,
    "Ethereum": true,
  }

  const handleChange = (e) => {
    if (
      !validCoins[e.target.value.toUpperCase()] &&
      e.target.value.length > 0
    ) {
      setError(true);
      return;
    }
    setError(false);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(passed["name"], quantity, passed["current_price"])
    setTrigger(false)
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
          <form style={{display: "flex", flexDirection: "column"}} onSubmit={handleSubmit}>
            <TextField
              disabled
              value={passed["name"]}
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
            />
            <TextField
              value={quantity}
              onInput={e => setQuantity(e.target.value)}
              id="outlined-number"
              label="Quantity"
              type="number"
              sx={{ width: "300px", padding: "10px" }}
            />
            <TextField
              disabled
              value={passed["current_price"]}
              onInput={e => setCost(e.target.value)}
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
