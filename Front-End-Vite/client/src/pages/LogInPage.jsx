import React from "react";
import FooterLogo from "../components/FooterLogo";
import BtnGoogle from "../components/BtnGoogle";
import FormLogIn from "../components/FormLogIn";
import videoBg from "../assets/video/videoBg.mp4";
import "../stylesheets/LogInPageStylesheets/LogInPage.css";

function LogInPage() {
  return (
    <>
      <div className="wrapper-li">
        <div className="left-side">
          <h2>Inicia Sesión</h2>
          <BtnGoogle className="google" />
          <div className="divider">
            <p>o</p>
          </div>
          <FormLogIn />
          <div className="link-login">
            <p>¿Ya tenes cuenta? </p>
            <a href="/">Registrate</a>
          </div>
        </div>

        <div className="right-side">
          <div className="overlay"></div>
          <video
            autoPlay
            muted
            playsInline
            loop
            src={videoBg}
            type="video/mp4"
          />
          <div className="content">
            <div className="bar"></div>
            <h1 className="hero-phrase">
              El ojo de halcón en la
              <br />
              palma de tu mano.
            </h1>
          </div>
        </div>
      </div>
    </>
  );
}

export default LogInPage;
