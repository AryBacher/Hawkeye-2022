import React from "react";
import { Link } from "react-router-dom";
import BtnContinue from "./BtnContinue";
import BtnGoogle from "./BtnGoogle";

function Form(props) {
  return (
    <form action="#" method="POST">
      <h2 className="hero-title">Inicia Sesión</h2>
      <BtnGoogle routeName={"#"} txtBtn={"Continuar con Google"} />
      <div className="divider">
        <p>o</p>
      </div>
      <input
        type="email"
        name="email"
        id="email"
        required
      />
      <label className="form-label" htmlFor="email">Email</label>
      <input
        type="password"
        name="password"
        id="password"
        placeholder="Contraseña Min. 8 Caracteres"
        minLength={8}
        required
      />
      <label className="form-label" htmlFor="password">Contraseña</label>

      <Link className={"recover-link"} to={"/RecoverPassword"}>
        ¿Olvidaste la contraseña?
      </Link>

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
