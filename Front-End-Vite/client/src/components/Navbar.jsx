import React from "react";
import { useState, useEffect } from "react";
import { Link } from "react-scroll";
import "../stylesheets/NavbarStylesheets/Navbar.css";
import LogoSmall from "./LogoSmall";

function Navbar() {
  // Activar sección en features.

  return (
    <>
      <nav>
        <div className="logo-set">
          <LogoSmall />
        </div>
        <ul className="links-navbar">
          <li className="nav" id="inicio">
            <Link
              activeClass="active"
              to="features"
              spy={true}
              smooth={true}
              offset={-72}
              duration={500}
            >
              Beneficios
            </Link>
          </li>
          <li className="nav" id="beneficios">
            <Link
              activeClass="active"
              to="benefits"
              spy={true}
              smooth={true}
              offset={-72}
              duration={500}
            >
              Accesibilidad
            </Link>
          </li>
          <li className="nav" id="Equipo">
            <Link
              activeClass="active"
              to="team"
              spy={true}
              smooth={true}
              offset={-72}
              duration={500}
            >
              Equipo
            </Link>
          </li>
          <li className="nav" id="Contacto">
            <Link
              activeClass="active"
              to="contact"
              spy={true}
              smooth={true}
              offset={-72}
              duration={500}
            >
              Contacto
            </Link>
          </li>
        </ul>
      </nav>
    </>
  );
}

export default Navbar;
