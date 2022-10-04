import React from "react";
import "../stylesheets/HomePageStylesheets/HomePage.css";
import logoOrt from "../assets/img/logo-ort.png";
import Navbar from "../components/Navbar";
import { Button } from "@mui/material";
import { motion } from "framer-motion";
import LogoSmall from "../components/LogoSmall";

function HomePage() {
  return (
    <>
      <div className="hero-section-h">
        <Navbar />
        <div className="brand-section-container">
          <section className="brand-section">
            <motion.div
              className="bar"
              animate={{
                height: "370px",
              }}
              transition={{
                delay: 0.5,
                duration: 0.5,
                ease: "easeInOut",
              }}
            ></motion.div>
            <motion.div
              className="texts-lp"
              initial={{
                x: "-110%",
              }}
              animate={{
                x: "0%",
              }}
              transition={{
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
              <p className="par-lp">
                Utilíce nuestra tecnología de ojo de halcón para analizar sus
                partidos
                <br />y entrenamientos de forma automática y gratuita.
              </p>
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
          <div className="features-content">
            <div className="features-titles">
              <p>¿Por qué usar Hawkeye?</p>
              <h3>
                Una <span>gran experiencia</span> para <br />
                vos y nuestros usuarios.
              </h3>
            </div>
            <div className="features-blocks-container">
              <div className="box-feature" id="feature-1"></div>
              <div className="box-feature" id="feature-2"></div>
              <div className="box-feature" id="feature-3"></div>
              <div className="box-feature" id="feature-4"></div>
            </div>
          </div>
        </section>
        <div className="divider"></div>
        <section className="benefits" id="benefits"></section>
        <div className="divider"></div>
        <section className="hawkeye-team" id="team">
          <div className="hawkeye-team-content">
            <div className="hawkeye-team-titles">
              <h3>
                Conoce al equipo detrás de <span>Hawkeye</span>
              </h3>
              <p>
                Quienes trabajaron día y noche para hacer este proyecto posible.
              </p>
            </div>
            <div className="team-members">
              <div className="Arotu">
                <div className="team-box" id="Arotu-background"></div>
                <h4>Ariel Alzogaray</h4>
                <p>UX/UI/Front-End</p>
              </div>
              <div className="Ary">
                <div className="team-box" id="Ary-background"></div>
                <h4>Ary Bacher</h4>
                <p>Computer Vision/Back-End</p>
              </div>
              <div className="Alan">
                <div className="team-box" id="Alan-background"></div>
                <h4>Alan Yeger</h4>
                <p>Full-Stack</p>
              </div>
              <div className="Guido">
                <div className="team-box" id="Guido-background"></div>
                <h4>Guido Zylbersztein</h4>
                <p>Computer Vision/Back-End</p>
              </div>
            </div>
          </div>
        </section>
        <div className="divider"></div>
        <section className="last-cta" id="contact">
          <div className="last-cta-content">
            <div className="last-cta-titles">
              <h3>
                La próxima cancha que pises, que sea con <span>Hawkeye</span>
              </h3>
              <p>
                El ojo de halcón al acceso de todos los tenistas, incluyéndote.
              </p>
            </div>

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
        <section className="second-footer">
          <div id="footer-left">
            <LogoSmall />
            <h3>Mantengámonos en contacto.</h3>
            <p>
              Contáctenos haciendo click en{" "}
              <a
                href="https://mail.google.com/mail/u/0/?view=cm&fs=1&to=hawkeye.tennis.app@gmail.com&tf=1"
                target="_blank"
              >
                hawkeye.tennis.app@gmail.com
              </a>{" "}
              <br/> o contáctese al +54 9 11 3056-2619.
            </p>
          </div>
          <div id="footer-right">
              
          </div>
        </section>
      </div>
    </>
  );
}

export default HomePage;
