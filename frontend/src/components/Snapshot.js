import React from "react";
import "../screens/styles/Portfolio.css";

export const Snapshot = ({ label, dollars }) => {
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
            color: dollars.includes("-") ? "red" : "green",
            fontSize: "2rem",
          }}
        >
          {`$${sum.toFixed(2)}`}
        </div>
      </div>
      <div
        style={{
          backgroundColor: dollars.includes("-") ? "red" : "green",
          height: "10px",
          marginTop: "10px",
        }}
      ></div>
    </div>
  );
};
