import React from "react";
import { Link } from "react-router-dom";
import BtnContinue from "./BtnContinue";
import BtnGoogle from "./BtnGoogle";

function Form(props) {
  return (
    <form action="#" method="POST">
      <h2 className="hero-title">Inicia Sesión</h2>
      <BtnGoogle routeName={"#"} txtBtn={"Continuar con Google"} />
      <div className="divisor">
        <p>o</p>
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
      <BtnContinue routeName={"/Home"} textBtn={"Continuar"} />

      <p>
        ¿No tenés cuenta?
        <Link className="link-switch" to={"/SignUp"}>
          Registrate
        </Link>
      </p>
    </form>
  );
}

export default Form;
