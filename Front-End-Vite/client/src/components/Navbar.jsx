import React from 'react'
import { useState, useEffect } from 'react';
import { Link } from 'react-scroll';
import '../stylesheets/NavbarStylesheets/Navbar.css'
import Logo from './LogoNavbar';

function Navbar() {

  /*
  V1
  
  const [show, setShow] = useState(true)
  const changeNavbar = () => {
      if (window.scrollY > 72) {
          setShow(false)
      } else {
          setShow(true)
      }
  }

  useEffect(() => {
      window.addEventListener('scroll', changeNavbar)
      return () => {
          window.removeEventListener('scroll', changeNavbar)
      }
  }, [])

  className={show ? 'scroll-up' : 'scroll-down'}
  */

  
  /*
  V2 

  const [show, setShow] = useState(true)
  const changeNavbar = () => {

    let currentScroll = window.scrollY; 
    let lastScroll = 0;

    if (currentScroll > lastScroll) {  
        setShow(false) 
    } 
    
    if (currentScroll < lastScroll) {
        setShow(true)
    }

    lastScroll += currentScroll
  }

  window.addEventListener('scroll', changeNavbar);
  
  className={show ? 'scroll-up' : 'scroll-down'}
  */

    
  return (
    <>
      <nav>
        <div className='logo-set'>
          <Logo/>
        </div>
        <ul className='links-navbar'>
          <li className='nav features-link'><Link to="features" spy={true} smooth={true} offset={-72} duration={500} >Inicio</Link><div></div></li>
          <li className='nav benefits-link'><Link to="benefits" spy={true} smooth={true} offset={-72} duration={500}>Beneficios</Link></li>
          <li className='nav team-link'><Link to="team" spy={true} smooth={true} offset={-72} duration={500}>Equipo</Link></li>
          <li className='nav contact-link'><Link to="contact" spy={true} smooth={true} offset={-72} duration={500}>Contacto</Link></li>
        </ul>
      </nav>
    </>
  )
}

export default Navbar;