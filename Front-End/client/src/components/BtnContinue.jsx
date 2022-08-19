import React from "react";
import { Link } from "react-router-dom";
import "../stylesheets/BtnContinueStylesheets/BtnContinue.css";

function BtnContinue(props) {
  return (
    <Link to={props.routeName}>
      <button>{props.textBtn}</button>
    </Link>
  );
}

export default BtnContinue;
