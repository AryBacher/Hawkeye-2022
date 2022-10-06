import React from "react";
import "../stylesheets/HomePageStylesheets/HomePage.css";
import logoOrt from "../assets/img/logo-ort.png";
import trackIcon from "../assets/img/TrackIcon.png";
import analyzeIcon from "../assets/img/ArbitrateIcon.png";
import arbitrateIcon from "../assets/img/AnalyzeIcon.png";
import playIcon from "../assets/img/PlayIcon.png";
import Navbar from "../components/Navbar";
import { Button } from "@mui/material";
import { motion } from "framer-motion";
import { useState } from "react";
import LogoSmall from "../components/LogoSmall";
import LogoBig from "../components/LogoBig";
import Mockups from "../assets/img/mockups.png";
import BtnBackToTop from "../components/BtnBackToTop";

function HomePage() {
  /*
  const [show, setShow] = useState(false);

  const observer = new IntersectionObserver((entries)=>{
    entries.forEach((entry)=>{
      console.log(entry);
      if(entry.isIntersecting){
        setShow(true)
      }
      else{
        setShow(false)
      }
    })
  });
  
  const hiddenElements = document.querySelectorAll('.hidden');
  hiddenElements.forEach((element)=>{
    observer.observe(element);
  });
  */
  return (
    <>
      <BtnBackToTop />
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
        <motion.section
          className="first-footer"
          initial={{
            y: "100%",
          }}
          animate={{
            y: "0%",
          }}
          transition={{
            duration: 1,
            ease: "easeOut",
            type: "tween",
          }}
        >
          <img src={logoOrt} alt="Logo de la escula ORT" />
          Hecho por alumnos de 4°to año de la escuela secundaria ORT con
          orientación en TIC.
        </motion.section>
      </div>
      <div className="bottom-section-h">
        <section className="features" id="features">
          <div className="features-content">
            <div className="features-titles">
              <p>¿Por qué usar Hawkeye?</p>
              <h3>
                Una <span>gran experiencia</span> para nuestros usuarios.
              </h3>
            </div>
            <div className="features-blocks-container">
              <div className="rowf-1">
                <div className="box-feature" id="feature-1">
                  <img src={trackIcon} alt="Icono de detección de pelota" />
                  <h4>Detección de la pelota</h4>
                  <p>
                    Nuestra tecnología permite detectar la posición y velocidad
                    de la pelota en todo momento.
                  </p>
                </div>
                <div className="box-feature" id="feature-2">
                  <img src={analyzeIcon} alt="Icono de análisis de videos" />
                  <h4>Análisis de video</h4>
                  <p>
                    Hawkeye puede analizar tanto videos pregrabados así como
                    también videos en vivo.
                  </p>
                </div>
              </div>

              <div className="rowf-2">
                <div className="box-feature" id="feature-3">
                  <img src={arbitrateIcon} alt="Icono de arbitraje" />
                  <h4>Arbitra tus partidos</h4>
                  <p>
                    Hawkeye puede arbitrar partidos con el ojo de halcón y
                    seguimiento de puntaje para dar con un mapa de calor.
                  </p>
                </div>
                <div className="box-feature" id="feature-4">
                  <img src={playIcon} alt="Icono de reproducción de videos" />
                  <h4>Guarda tus análisis</h4>
                  <p>
                    Puedes ver todos tus análisis ya sean partidos o
                    entrenamientos desde cualquier dispositivo.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>
        <div className="divider"></div>
        <section className="benefits" id="benefits">
          <img src={Mockups} alt="Hawkeye en distintos dispositivos" />
          <h3>
            <span>Hawkeye</span> siempre contigo en todo lugar al que vayas.
          </h3>
          <p>Disponibilidad y accesibilidad para todos los dispositivos.</p>
        </section>
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
              <div className="row-1">
                <div className="card-member Arotu">
                  <div className="team-box" id="Arotu-background"></div>
                  <h4>Ariel Alzogaray</h4>
                  <p>UX/UI/Front-End</p>
                </div>
                <div className="card-member Ary">
                  <div className="team-box" id="Ary-background"></div>
                  <h4>Ary Bacher</h4>
                  <p>Computer Vision/Back-End</p>
                </div>
              </div>
              <div className="row-2">
                <div className="card-member Alan">
                  <div className="team-box" id="Alan-background"></div>
                  <h4>Alan Yeger</h4>
                  <p>Full-Stack</p>
                </div>
                <div className="card-member Guido">
                  <div className="team-box" id="Guido-background"></div>
                  <h4>Guido Zylbersztein</h4>
                  <p>Computer Vision/Back-End</p>
                </div>
              </div>
            </div>
          </div>
        </section>
        <div className="divider"></div>
        <section className="last-cta">
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
        <section className="second-footer" id="contact">
          <div className="footer-content">
            <LogoBig />
            <h3>Mantengámonos en contacto.</h3>
            <p>
              Contáctenos haciendo click en{" "}
              <a
                href="https://mail.google.com/mail/u/0/?view=cm&fs=1&to=hawkeye.tennis.app@gmail.com&tf=1"
                target="_blank"
              >
                hawkeye.tennis.app@gmail.com
              </a>{" "}
              o visitando alguna de nuestras redes.
            </p>
          </div>
          <div className="social-networks">
            <div className="button-sn-instagram">
              <div className="icon">
                <svg
                  className="instagram-icon"
                  width="26"
                  height="26"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M11.997 7.9983C9.79351 7.9983 7.99529 9.79651 7.99529 12C7.99529 14.2035 9.79351 16.0017 11.997 16.0017C14.2005 16.0017 15.9987 14.2035 15.9987 12C15.9987 9.79651 14.2005 7.9983 11.997 7.9983ZM23.9991 12C23.9991 10.3429 24.0141 8.70077 23.9211 7.04665C23.828 5.12536 23.3897 3.4202 21.9847 2.01525C20.5768 0.607302 18.8746 0.172009 16.9533 0.0789456C15.2962 -0.0141172 13.6541 0.000892936 12 0.000892936C10.3429 0.000892936 8.70077 -0.0141172 7.04665 0.0789456C5.12536 0.172009 3.4202 0.610305 2.01525 2.01525C0.607303 3.42321 0.172008 5.12536 0.0789456 7.04665C-0.0141172 8.70377 0.000892936 10.3459 0.000892936 12C0.000892936 13.6541 -0.0141172 15.2992 0.0789456 16.9533C0.172008 18.8746 0.610305 20.5798 2.01525 21.9847C3.42321 23.3927 5.12536 23.828 7.04665 23.9211C8.70377 24.0141 10.3459 23.9991 12 23.9991C13.6571 23.9991 15.2992 24.0141 16.9533 23.9211C18.8746 23.828 20.5798 23.3897 21.9847 21.9847C23.3927 20.5768 23.828 18.8746 23.9211 16.9533C24.0171 15.2992 23.9991 13.6571 23.9991 12V12ZM11.997 18.1572C8.5897 18.1572 5.83984 15.4073 5.83984 12C5.83984 8.5927 8.5897 5.84284 11.997 5.84284C15.4043 5.84284 18.1542 8.5927 18.1542 12C18.1542 15.4073 15.4043 18.1572 11.997 18.1572ZM18.4063 7.02864C17.6108 7.02864 16.9684 6.38621 16.9684 5.59067C16.9684 4.79513 17.6108 4.1527 18.4063 4.1527C19.2019 4.1527 19.8443 4.79513 19.8443 5.59067C19.8445 5.77957 19.8075 5.96667 19.7353 6.14124C19.6631 6.31581 19.5572 6.47442 19.4237 6.608C19.2901 6.74157 19.1315 6.84748 18.9569 6.91967C18.7823 6.99185 18.5952 7.02888 18.4063 7.02864V7.02864Z"
                    fill="#151F27"
                  />
                </svg>
              </div>
            </div>
            <div className="button-sn-linkedin">
              <div className="icon">
                <svg
                  className="linkedin-icon"
                  width="23"
                  height="23"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fill-rule="evenodd"
                    clip-rule="evenodd"
                    d="M8.9148 8.3628H13.3716V10.5828C14.0136 9.306 15.66 8.1588 18.1332 8.1588C22.8744 8.1588 24 10.7004 24 15.3636V24H19.2V16.4256C19.2 13.77 18.558 12.2724 16.9236 12.2724C14.6568 12.2724 13.7148 13.8864 13.7148 16.4244V24H8.9148V8.3628ZM0.684 23.796H5.484V8.1588H0.684V23.796ZM6.1716 3.06C6.17178 3.46233 6.09199 3.86068 5.93686 4.2319C5.78174 4.60313 5.55438 4.93982 5.268 5.2224C4.68768 5.79915 3.90217 6.12198 3.084 6.12C2.26727 6.11945 1.48357 5.79744 0.9024 5.2236C0.617054 4.94006 0.390463 4.60299 0.235612 4.23172C0.0807618 3.86045 0.000694958 3.46227 0 3.06C0 2.2476 0.324 1.47 0.9036 0.8964C1.48426 0.32179 2.26829 -0.000359053 3.0852 3.00317e-07C3.9036 3.00317e-07 4.6884 0.3228 5.268 0.8964C5.8464 1.47 6.1716 2.2476 6.1716 3.06Z"
                    fill="#151F27"
                  />
                </svg>
              </div>
            </div>
            <div className="button-sn-twitter">
              <div className="icon">
                <svg
                  className="twitter-icon"
                  width="30"
                  height="24"
                  viewBox="0 0 20 16"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M19.6817 1.89789C18.958 2.21861 18.1804 2.43531 17.363 2.53326C18.2064 2.0286 18.8374 1.23432 19.1383 0.298631C18.3459 0.769299 17.4786 1.1006 16.5742 1.27812C15.9661 0.628768 15.1605 0.198364 14.2827 0.0537355C13.4048 -0.0908933 12.5038 0.0583448 11.7195 0.47828C10.9351 0.898215 10.3114 1.56535 9.94502 2.37611C9.57869 3.18688 9.49028 4.0959 9.69352 4.96206C8.08792 4.88144 6.51721 4.46412 5.08333 3.73718C3.64945 3.01023 2.38445 1.98991 1.37042 0.742437C1.0237 1.34053 0.824335 2.03398 0.824335 2.7725C0.823948 3.43734 0.98767 4.09199 1.30097 4.67838C1.61428 5.26477 2.06748 5.76476 2.62036 6.13398C1.97916 6.11358 1.35211 5.94032 0.791396 5.62863V5.68064C0.791331 6.6131 1.11388 7.51687 1.7043 8.23859C2.29473 8.96031 3.11667 9.45553 4.03066 9.64022C3.43584 9.8012 2.81222 9.82491 2.20689 9.70957C2.46477 10.5119 2.96708 11.2135 3.64351 11.7162C4.31995 12.2188 5.13663 12.4974 5.97924 12.5128C4.54886 13.6357 2.78236 14.2448 0.963891 14.2421C0.641768 14.2422 0.319918 14.2234 0 14.1858C1.84585 15.3726 3.99455 16.0024 6.18901 16C13.6176 16 17.6786 9.84739 17.6786 4.51132C17.6786 4.33796 17.6742 4.16286 17.6664 3.9895C18.4563 3.41825 19.1382 2.71087 19.68 1.90049L19.6817 1.89789Z" />
                </svg>
              </div>
            </div>
          </div>
          <div className="last">
            <p>Copyright © 2022 Hawkeye - Todos los derechos reservados</p>
          </div>
        </section>
      </div>
    </>
  );
}

export default HomePage;
