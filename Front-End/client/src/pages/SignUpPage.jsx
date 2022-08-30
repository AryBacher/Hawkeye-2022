import React from "react";
import "../stylesheets/SignUpPageStylesheets/SignUpPage.css";
import FooterLogo from "../components/FooterLogo";
import Form from "../components/FormSignUp";

function SignUpPage() {
  return (
    <>
      <div className="wrapper">
        <div className="left-side">
          <Form />
          <FooterLogo />
        </div>

        <div className="right-side">
          <div className="bar"></div>
          <h1 className="hero-phrase">
            El ojo de halcón en la
            <br />
            palma de tu mano.
          </h1>
        </div>
      </div>
    </>
  );
}

export default SignUpPage;
