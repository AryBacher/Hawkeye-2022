import React from "react";
import "../stylesheets/HomePageStylesheets/HomePage.css";
import logoOrt from "../assets/img/logo-ort.png";
import Navbar from "../components/Navbar";
import { Button } from "@mui/material";
import { Link } from "react-router-dom";
 
function HomePage() {
  return (
    <>
      <div className="hero-section-h">
        <Navbar className="navbar-home" />
        <div className="brand-section-container">
          <section className="brand-section">
            <div className="bar"></div>
            <div className="texts-lp">
              <h1 className="hero-title">
                Mejora como tenista <br />
                usando <span>Hawkeye</span>
              </h1>
              <p className="par-lp">Usa nuestro ojo de halcón para tener un feedback de tus entrenamientos y partidos <br /> para mejorar como tenista de manera totalmente gratuita.</p>
              <Button
                className="button-home"
                variant="contained"
                size="large"
                href="/SignUp"
              >
                Empieza ahora
              </Button>
            </div>
          </section>
        </div>
        <section className="first-footer">
          <img src={logoOrt} alt="Logo de la escula ORT" />
          Hecho por alumnos de 4°to año de la escuela secundaria ORT con
          orientación en TIC.
        </section>
      </div>
      <div className="bottom-section-h">
        <section className="features">
        </section>
        <div className="divider"></div>
        <section className="bottom benefits">
        </section>
        <div className="divider"></div>
        <section className="bottom hawkeye-team">
        </section>
        <div className="divider"></div>
        <section className="last-cta"></section>
        <section className="second-footer">
        </section>
      </div>
    </>
  );
}

export default HomePage;
