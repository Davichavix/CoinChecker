import React from "react";
import "../screens/styles/Portfolio.css";

export const Snapshot = ({ label, dollars }) => {
  return (
    <div className="snapshot">
      <div style={{ fontSize: "1.4rem", textTransform: "uppercase" }}>
        {label}
      </div>
      <div>{dollars}</div>
    </div>
  );
};
