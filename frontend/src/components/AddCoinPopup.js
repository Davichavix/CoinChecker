import React from "react";
import { Button, TextField } from "@mui/material";
import { useState } from "react";

export const AddCoinPopup = ({ trigger }) => {
  const [error, setError] = useState(false);

  const validCoins = {
    BTC: true,
    ETH: true,
  };

  const handleChange = (e) => {
    if (!validCoins[e.target.value.toUpperCase()]) {
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
        <h2>ADD NEW COIN</h2>
        <TextField
          error={error}
          helperText="Not a valid coin"
          id="outlined-basic"
          label="Coin Symbol"
          variant="outlined"
          sx={{ maxWidth: "150px", padding: "10px" }}
          onBlur={handleChange}
        />
        <TextField
          id="outlined-number"
          label="Quantity"
          type="number"
          sx={{ maxWidth: "150px", padding: "10px" }}
        />
        <TextField
          id="outlined-basic"
          label="Cost"
          variant="outlined"
          sx={{ maxWidth: "150px", padding: "10px" }}
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
