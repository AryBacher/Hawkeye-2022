import React from 'react'
import { useState, useEffect } from 'react';
import { Link } from 'react-scroll';
import '../stylesheets/NavbarStylesheets/Navbar.css'
import LogoSmall from './LogoSmall';

function Navbar() {

  // Activar sección en features.
  // Agrandar el Navbar.


  return (
    <>
      <nav>
        <div className='logo-set'>
          <LogoSmall/>
        </div>
        <ul className='links-navbar'>
          <li className='nav features-link' ><Link to="features" spy={true} smooth={true} offset={-72} duration={500} >Inicio</Link></li>
          <li className='nav benefits-link'><Link to="benefits" spy={true} smooth={true} offset={-72} duration={500}>Beneficios</Link></li>
          <li className='nav team-link'><Link to="team" spy={true} smooth={true} offset={-72} duration={500}>Equipo</Link></li>
          <li className='nav contact-link'><Link to="contact" spy={true} smooth={true} offset={-72} duration={500}>Contacto</Link></li>
        </ul>
      </nav>
    </>
  )
}

export default Navbar;