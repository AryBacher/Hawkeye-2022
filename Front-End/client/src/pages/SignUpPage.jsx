import React from "react";
import "../stylesheets/SignUpPageStylesheets/SignUpPage.css";
import FooterLogo from "../components/FooterLogo";
import Form from "../components/Form";

function SignUpPage() {
  return (
    <>
      <div className="left-side">
        <Form
          heroTitle ={"Regístrate"}
        />
        <FooterLogo/>
      </div>

      <div className="right-side">
        <h1 className="hero-phrase">
          El ojo de halcón en la
          <br />
          palma de tu mano.
        </h1>
      </div>
    </>
  );
}

export default SignUpPage;
