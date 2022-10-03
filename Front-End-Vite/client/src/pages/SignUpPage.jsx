import React from "react";
import "../stylesheets/SignUpPageStylesheets/SignUpPage.css";
import FormSignUp from "../components/FormSignUp";
import videoBg from "../assets/video/videoBg.mp4";
import BtnGoogle from "../components/BtnGoogle";

function SignUpPage() {
  return (
    <>
      <div className="wrapper-su">
        <div className="left-side">
          <h2>Regístrate</h2>
          <BtnGoogle className="google" />
          <div className="divider">
            <p>o</p>
          </div>
          <FormSignUp />
          <div className="link-login">
            <p>
              ¿Ya tiene una cuenta? <a href="/LogIn">Inicia sesión</a>
            </p>
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
              palma de tu mano
            </h1>
          </div>
        </div>
      </div>
    </>
  );
}

export default SignUpPage;
