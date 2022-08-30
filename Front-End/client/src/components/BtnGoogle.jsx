import React from "react";
import { Link } from "react-router-dom";

function BtnGoogle(props) {
  return (
    <Link to={props.routeName}>
      <button>
        <img src="#" alt="Logo de Google" />
        {props.textBtn}
      </button>
    </Link>
  );
}

export default BtnGoogle;
