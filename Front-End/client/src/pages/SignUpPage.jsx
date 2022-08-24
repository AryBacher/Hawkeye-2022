import React from "react";
import "../stylesheets/SignUpPageStylesheets/SignUpPage.css";
import BtnContinueGoogle from "../components/BtnContinueGoogle";

function SignUpPage() {
  return (
    <div className="wrapper">
      <div className="left-side">
        <img src="#" alt="Aún no lo sé" />
        <svg className="logo-icon"></svg>
        <h2 className="title">Registrarse</h2>
        <form action="#" method="post">
          <label for="username" />
          <input
            type="text"
            id="email"
            name="email"
            placeholder="Email"
          />
        <BtnContinueGoogle routeName="/SignUp" textBtn="Únete gratis" />

          <label for="password" />
          <input
            type="password"
            id="password"
            name="password"
            placeholder="Contraseña"
          />

          <label for="confirmPassword" />
          <input
            type="password"
            id="confirmPassword"
            name="confirmPassword"
            placeholder="Confirmar contraseña"
          />
        </form>
      </div>

      <div className="right-side">
      <h1 className="hero-title">
            El ojo de halcón
            <br />
            en la palma de
            <br />
            tu mano.
          </h1>
      </div>
    </div>
  );
}

export default SignUpPage;
