import React from "react";
import "../stylesheets/SignUpPageStylesheets/SignUpPage.css";

function SignUpPage() {
  return (
    <div className="wrapper">
      <div className="left-side">
        <img src="#" alt="Aún no lo sé" />
      </div>

      <div className="right-side">
        <svg className="logo-icon"></svg>
        <h2 className="title">Registrarse</h2>
        <form action="#" method="post">
          <label for="username" />
          <input
            type="text"
            id="username"
            name="username"
            placeholder="Nombre de usuario"
          />

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
    </div>
  );
}

export default SignUpPage;
