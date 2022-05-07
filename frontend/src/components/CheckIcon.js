import React from "react";
import { useState } from "react";
import { ReactComponent as CheckLogo } from "../assets/images/check-solid.svg"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck } from "@fortawesome/free-solid-svg-icons";
import "./CheckIcon.css"

const CheckIcon = () => {
  return (
      <div>
        <div className="Check-icon">
        <FontAwesomeIcon
          icon={faCheck}
          size="lg"
          style={{ color: "green" }}
        />
        </div>
      </div>
  );
};

export default CheckIcon;