import React from "react";
import { ReactComponent as CheckLogo } from "../assets/images/check-solid.svg"
import "./CheckIcon.css"

const CheckIcon = () => {
  return (
      <div className="Check-icon">
        <div className="Check-logo">
          <CheckLogo />
        </div>
      </div>
  );
};

export default CheckIcon;