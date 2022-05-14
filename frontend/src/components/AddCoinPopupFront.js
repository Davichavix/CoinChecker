import React from "react";
import { Button, TextField } from "@mui/material";
import { useState } from "react";
import "./AddCoinPopup.css";
import axios from "axios";

export const AddCoinPopupFront = ({ trigger, setTrigger, passed }) => {
  const [error, setError] = useState(false);
  const [symbol, setSymbol] = useState("");
  const [quantity, setQuantity] = useState(0);
  const [cost, setCost] = useState(0);

  const userInfo = JSON.parse(localStorage.getItem("userInfo"));

  // const config = {
  //   headers: {
  //     Type: "application/json",
  //     Authorization: `Bearer ${userInfo.token}`,
  //   },
  // };

  const handleSubmit = async (e) => {
    // e.preventDefault();
    // if (quantity) {
    //   const URL = `/api/transactions`;
    //   const cost = quantity * passed["current_price"];
    //   const postPackage = {
    //     user: userInfo._id,
    //     coin: passed["symbol"],
    //     coin_amount: quantity,
    //     cash_amount: cost,
    //     buy: true,
    //   };
    //   try {
    //     await axios.post(URL, postPackage, config);
    //     const { data } = await axios.get(
    //       `/api/portfolio/user/${userInfo._id}`,
    //       config
    //     );
    //     localStorage.setItem("coinData", JSON.stringify(data));
    //     setTrigger(false);
    //   } catch (err) {
    //     console.log(err);
    //   }
    // }
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
            <TextField
              disabled
              value={passed["name"]}
              id="outlined-basic"
              label="Coin Symbol"
              variant="outlined"
              sx={{ width: "300px", padding: "10px"}}
            />
            <TextField
              value={quantity}
              onInput={(e) => setQuantity(e.target.value)}
              id="outlined-number"
              label="Quantity"
              type="number"
              sx={{ width: "300px", padding: "10px" }}
            />
            <TextField
              disabled
              value={passed["current_price"]}
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
