import React from 'react';
import '../stylesheets/WelcomePageStylesheets/WelcomePage.css';
import BtnContinue from '../components/BtnContinue';

function WelcomePage () {
  return (
    <>
      <BtnContinue
        routeName = "/SignUp"
        textBtn = "Únete gratis"
      />
  </>
  )
}

export default WelcomePage;