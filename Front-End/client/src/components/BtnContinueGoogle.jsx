import React from "react";
import { Link } from "react-router-dom";
import "../stylesheets/BtnContinueGoogleStylesheets/BtnContinueGoogle.css";

function BtnContinueGoogle(props) {
  return (
    <Link to={props.routeName}>
      <button>{props.textBtn}</button>
    </Link>
  );
}

export default BtnContinueGoogle;