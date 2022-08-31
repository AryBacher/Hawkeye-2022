import React from "react";
import "../stylesheets/SignUpPageStylesheets/SignUpPage.css";
import FooterLogo from "../components/FooterLogo";
import Form from "../components/FormSignUp";
import videoBg from "../assets/video/videoBg.mp4";

function SignUpPage() {
  return (
    <>
      <div className="wrapper">
        <div className="left-side">
          <Form />
          <FooterLogo />
        </div>

        <div className="right-side">
          <div className="overlay"></div>
          <video autoPlay muted playsInline loop src={videoBg} type="video/mp4"/>
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

export default SignUpPage;
