import React from "react";
import "../stylesheets/HomePageStylesheets/HomePage.css";
import logoOrt from "../assets/img/logo-ort.png";
import Navbar from "../components/Navbar";
import { Button } from "@mui/material";
import { motion } from "framer-motion";
  
function HomePage() {  

  return (
    <>
      <div className="hero-section-h">
        <Navbar />
        <div className="brand-section-container">
          <section className="brand-section">
            <motion.div 
              className="bar"
              animate = {{
                height: "370px",
              }}
              transition = {{
                delay: 0.5,
                duration: 0.5,
                ease: "easeInOut",
              }}
            >
            </motion.div>
            <motion.div className="texts-lp"
              initial= {{
                x: "-110%",
              }}
              animate= {{
                x: "0%",
              }}
              transition= {{
                delay: 1,
                duration: 1,
                ease: "easeOut",
                type: "tween",
              }}
            >
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
            </motion.div>
          </section>
        </div>
        <section className="first-footer">
          <img src={logoOrt} alt="Logo de la escula ORT" />
          Hecho por alumnos de 4°to año de la escuela secundaria ORT con
          orientación en TIC.
        </section>
      </div>
      <div className="bottom-section-h">
        <section className="features" id="features">
          <div className="features-content"></div>
        </section>
        <div className="divider"></div>
        <section className="benefits" id="benefits">
        </section>
        <div className="divider"></div>
        <section className="hawkeye-team" id="team">
        </section>
        <div className="divider"></div>
        <section className="last-cta" id="contact">
        </section>
        <section className="second-footer">
        </section>
      </div>
    </>
  );
}

export default HomePage;
