import React from "react";
import '../screens/styles/Portfolio.css'

export const Snapshot = ({ label, dollars }) => {
  return (
    <div className="snapshot">
      <div>{label}</div>
      <div>{dollars}</div>
    </div>
  );
};
