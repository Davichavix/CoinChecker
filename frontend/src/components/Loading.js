import React from "react";

const Loading = () => {
  return (
    <div style={{ display: "flex", justifyContent: "center" }}>
      <div>
        <img
          src="/loading-screen.gif"
          style={{
            width: "300px",
            height: "300px",
          }}
        ></img>
      </div>
    </div>
  );
};

export default Loading;
