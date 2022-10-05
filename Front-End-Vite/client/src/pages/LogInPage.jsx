import React from "react";
import BtnGoogle from "../components/BtnGoogle";
import FormLogIn from "../components/FormLogIn";
import videoBg from "../assets/video/videoBg.mp4";
import "../stylesheets/LogInPageStylesheets/LogInPage.css";
import { motion } from "framer-motion";

function LogInPage() {
  return (
    <>
      <div className="wrapper-li">
        <div className="left-side">
          <h2>Inicia Sesión</h2>
          <BtnGoogle className="google" />
          <div className="divider">
            <p>o</p>
          </div>
          <FormLogIn />
          <div className="link-login">
            <p>¿No tiene una cuenta? </p>
            <a href="/SignUp">Regístrate</a>
          </div>
        </div>

        <div className="right-side">
          <div className="overlay"></div>
          <video
            autoPlay
            muted
            playsInline
            loop
            src={videoBg}
            type="video/mp4"
          />
          <div className="content">
            <motion.div className="bar"
              animate={{
                height: "275px",
              }}
              transition={{
                delay: 0.5,
                duration: 0.5,
                ease: "easeInOut",
              }}
            >
            </motion.div>
            <motion.h1 className="hero-phrase"
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
              El ojo de halcón en la
              <br />
              palma de tu mano
            </motion.h1>
          </div>
        </div>
      </div>
    </>
  );
}

export default LogInPage;
