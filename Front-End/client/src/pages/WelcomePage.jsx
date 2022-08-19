import React from "react";
import "../stylesheets/WelcomePageStylesheets/WelcomePage.css";
import BtnContinue from "../components/BtnContinue";
import BtnLang from "../components/BtnLang";
import LogoConjunto from "../components/LogoConjunto";

function WelcomePage() {
  return (
    <>
      <header>
        <LogoConjunto className="logo-conjunto"/>
        <BtnLang />
      </header>

      <section className="hero-section">
        <div className="hero-section-title-container">
          <div className="bar"></div>
          <h1 className="hero-title">
            El ojo de halcón
            <br />
            en la palma de
            <br />
            tu mano.
          </h1>
        </div>
        <BtnContinue routeName="/SignUp" textBtn="Únete gratis" />
      </section>

      <footer>
        <p className="footer-text"></p>
      </footer>
    </>
  );
}

export default WelcomePage;
