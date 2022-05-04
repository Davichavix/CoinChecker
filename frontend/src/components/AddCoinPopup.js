import { maxWidth } from "@mui/system";
import React from "react";

export const AddCoinPopup = ({ trigger }) => {
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
        alignItems: "center"
      }}
    >
      <div style={{
        position: "relative",
        // top: "50%",
        // left: "25%",
        width: "100%",
        maxWidth: "640px",
        backgroundColor: "#FFF"
      }}>
        <h2>Add your coin</h2>

      </div>
    </div>
  ) : (
    ""
  );
};
