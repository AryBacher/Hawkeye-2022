import React from "react";
import { Link } from "react-router-dom";
import BtnContinue from "./BtnContinue";
import BtnGoogle from "./BtnGoogle";
import "../stylesheets/FormSignUpStylesheets/Form.css";

function Form(props) {
  return (
    <form action="#" method="POST">
      <h2 className="hero-title">Registrate</h2>
      <BtnGoogle routeName={"#"} txtBtn={"Continuar con Google"} />
      <div className="divider">
        <p>o</p>
      </div>
      <div className="inp">
        <input
          type="email"
          name="email"
          id="email"
          placeholder="Email"
          required
        />
        <label className="form-label" htmlFor="email">Email</label>
        <div className="bg"></div>
      </div>

      <div className="inp">
        <input
          type="password"
          name="password"
          id="password"
          placeholder="Contraseña Min. 8 Caracteres"
          minLength={8}
          required
        />
        <label className="form-label" htmlFor="password">Contraseña Min. 8 Caracteres</label>
        <div className="bg"></div>
      </div>
      
      <div className="inp">
        <input
          type="password"
          name="password-confirm"
          id="password-confirm"
          placeholder="Confirmar contraseña"
          required
        />
        <label className="form-label" htmlFor="password-confirm">Confirmar contraseña</label>
        <div className="bg"></div>
      </div>

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
