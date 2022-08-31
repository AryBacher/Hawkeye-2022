import React from "react";
import FooterLogo from "../components/FooterLogo";
import Form from "../components/FormLogIn";

function LogInPage() {
  return (
    <>
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
    </>
  );
}

export default LogInPage;
