import React from "react";
import { Link } from "react-router-dom";
import BtnContinue from "./BtnContinue";
import BtnGoogle from "./BtnGoogle";

function Form(props) {
  return (
    <form action="#" method="POST">
      <h2 className="hero-title">{props.heroTitle}</h2>
      <BtnGoogle />
      <div className="divisor">
        <p>O</p>
      </div>
      <input
        type="text"
        name="nickname"
        id="nickname"
        placeholder="Nombre de usuario"
        required
      />
      <input
        type="password"
        name="password"
        id="password"
        placeholder="Contraseña Min. 8 Caracteres"
        minlength="8"
        required
      />
      <Link to="#" display={props.display} />
      <input
        type="password"
        name="password-confirm"
        id="password-confirm"
        placeholder="Confirmar Contraseña"
        display={props.display}
        required
      />
      <BtnContinue />

      <p>
        {props.textAccount}
        <Link to={props.routeName}>{props.linkText}</Link>
      </p>
    </form>
  );
}

export default Form;
