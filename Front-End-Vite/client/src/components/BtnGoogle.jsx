import React from "react";
import "../stylesheets/BtnGoogleStylesheets/BtnGoogle.css";
import google from '../assets/img/google.png';

function BtnGoogle() {
  return (
    <>
      <button className="google-button">
        <div id="icon-container">
          <img src={google} alt="Logotipo de Google" />
        </div>
        <span>Continuar con Google</span>
      </button>
    </>
  );
}

export default BtnGoogle;

