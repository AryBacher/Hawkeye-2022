import React from 'react';
import '../stylesheets/WelcomePageStylesheets/WelcomePage.css';
import BtnContinue from '../components/BtnContinue';
import BtnLang from '../components/BtnLang';

function WelcomePage () {
  return (
    <>
      <header>
        <svg className="logo-conjunto">
        </svg> 
        <BtnLang/>
      </header>

      <section className="hero-section">
        <div className="hero-section-title-container">
          <div className="bar"></div>
          <h1 className="hero-title">El ojo de halcón en la palma de tu mano.</h1>
        </div>
        <BtnContinue
          routeName = "/SignUp"
          textBtn = "Únete gratis"
        />
      </section>
      
      <footer>
        <svg className="copyright-icon">
        </svg>
        <p className="footer-text">
          Hawkeye 2022
        </p>
      </footer>
  </>
  )
}

export default WelcomePage;