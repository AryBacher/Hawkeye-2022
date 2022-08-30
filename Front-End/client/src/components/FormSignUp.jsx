import React from "react";
import { Link } from "react-router-dom";
import BtnContinue from "./BtnContinue";
import BtnGoogle from "./BtnGoogle";

function Form(props) {
  return (
    <form action="#" method="POST">
      <h2 className="hero-title">Registrate</h2>
      <BtnGoogle routeName={"#"} txtBtn={"Continuar con Google"} />
      <div className="divider">
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
      <input
        type="password"
        name="password-confirm"
        id="password-confirm"
        placeholder="Confirmar Contraseña"
        required
      />
      <BtnContinue routeName={"/Home"} textBtn={"Continuar"} />

      <p>
        ¿Ya tenés cuenta?
        <Link className="link-switch" to={"/LogIn"}>
          Iniciá sesión
        </Link>
      </p>
    </form>
  );
}

export default Form;
