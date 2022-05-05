import React from "react";
import { Button, TextField } from "@mui/material";
import { useState } from "react";

export const AddCoinPopup = ({ trigger, setTrigger }) => {
  const [error, setError] = useState(false);

  const validCoins = {
    BTC: true,
    ETH: true,
  };

  const handleChange = (e) => {
    if (!validCoins[e.target.value.toUpperCase()] && e.target.value.length > 0) {
      setError(true);
      return;
    }
    setError(false);
  };

  return trigger ? (
    <div
      style={{
        position: "fixed",
        top: "0",
        left: "0",
        width: "100%",
        height: "100vh",
        backgroundColor: "rgba(0, 0, 0, 0.2)",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <div
        style={{
          position: "relative",
          // top: "50%",
          // left: "25%",
          width: "100%",
          maxWidth: "640px",
          backgroundColor: "#FFF",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <div style={{display: "flex", justifyContent: "flex-end", width: "100%"}}>
          <h2 style={{width: "100%"}}>ADD NEW COIN</h2>
          <span
            onClick={() => setTrigger(false)}
            style={{ cursor: "pointer", fontWeight: "bold", padding: "5px", fontSize: "20px", color: "red" }}
          >
            X
          </span>
        </div>

        <TextField
          error={error}
          helperText={
            error ? "Not a valid coin. Example - ETH for Ethereum" : ""
          }
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
  ) : (
    ""
  );
};
