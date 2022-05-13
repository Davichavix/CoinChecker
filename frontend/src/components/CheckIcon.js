import React from "react";
import { useState } from "react";
import { ReactComponent as CheckLogo } from "../assets/images/check-solid.svg"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck } from "@fortawesome/free-solid-svg-icons";
import "./CheckIcon.css"

const CheckIcon = ({setCheck, isWatchList}) => {
  return (
      <div>
        <div className="Check-icon">
        <FontAwesomeIcon
          icon={faCheck}
          size="xl"
          style={{ color: isWatchList ? "green" : "white"}} 
          onClick={setCheck}
        />
        </div>
      </div>
  );
};

export default CheckIcon;