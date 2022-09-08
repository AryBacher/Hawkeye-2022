import React from "react";
import "../stylesheets/HomePageStylesheets/HomePage.css";
import logoOrt from "../assets/img/logo-ort.png";
import Navbar from "../components/Navbar";

function HomePage() {
  return (
    <>
      <div className="hero-section-h">
        <Navbar className="navbar-home" />
        <section className="brand-section">
          <div className="bar"></div>
          <h1 className="hero-title">
            Mejora como tenista <br />
            usando <span>Hawkeye</span>
            <svg></svg>
          </h1>
        </section>
        <section className="first-footer">
          <img src={logoOrt} alt="Logo de la escula ORT" />
          Hecho por alumnos de 4°to año de la escuela secundaria ORT con
          orientación en TIC.
        </section>
      </div>
      <div className="benefits-section-h"></div>
    </>
  );
}

export default HomePage;
