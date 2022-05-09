import React from "react";
import { useState } from "react";
import { ReactComponent as CheckLogo } from "../assets/images/check-solid.svg"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck } from "@fortawesome/free-solid-svg-icons";
import "./CheckIcon.css"

const CheckIcon = ({setCheck}) => {

  const [click, setClick] = useState(false);

  const changeColor = (click) => {
    setCheck()
    setClick(!click)
  }


  return (
      <div>
        <div className="Check-icon">
        <FontAwesomeIcon
          icon={faCheck}
          size="xl"
          style={{ color: click ? "green" : "white"}} 
          onClick={() => changeColor(click)}
        />
        </div>
      </div>
  );
};

export default CheckIcon;