import React from "react";
import "../screens/styles/Portfolio.css";

export const Snapshot = ({ label, dollars, gainLoss }) => {
  let sum = 0;
  if (dollars) {
    for (let dollar of dollars) {
      sum += dollar;
    }
  }

  return (
    <div className="snapshot">
      <div>
        <div
          style={{
            fontSize: "1rem",
            fontWeight: "bold",
            textTransform: "uppercase",
          }}
        >
          {label}
        </div>
        <div
          style={{
            color: (dollars < 0 || gainLoss < 0) ? "red" : "green",
            fontSize: "2rem",
          }}
        >
          {dollars &&
            `$ ${sum.toFixed(2).replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,")}`}
          {gainLoss &&
            `$${gainLoss.toFixed(2).replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,")}`}
        </div>
      </div>
      <div
        style={{
          backgroundColor: (dollars < 0 || gainLoss < 0) ? "red" : "green",
          height: "10px",
          marginTop: "10px",
        }}
      ></div>
    </div>
  );
};
