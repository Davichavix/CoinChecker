import React from "react";
import { Button, TextField } from "@mui/material";
import { useState } from "react";
import "./AddCoinPopup.css";

export const AddCoinPopup = ({ trigger, setTrigger, passedData }) => {
  const [error, setError] = useState(false);
  const validCoins = {
    BTC: true,
    ETH: true,
  };

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

          <TextField
            defaultValue={passedData["name"]}
            error={error}
            helperText={error && "Not a valid coin. Example - ETH for Ethereum"}
            id="outlined-basic"
            label="Coin Symbol"
            variant="outlined"
            sx={{ width: "300px", padding: "10px" }}
            onBlur={handleChange}
          />
          <TextField
            id="outlined-number"
            label="Quantity"
            type="number"
            sx={{ width: "300px", padding: "10px" }}
          />
          <TextField
            defaultValue={passedData["current_price"]}
            id="outlined-basic"
            label="Cost"
            variant="outlined"
            sx={{ width: "300px", padding: "10px" }}
          />
          <Button
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
        </div>
      </div>
    )
  );
};
