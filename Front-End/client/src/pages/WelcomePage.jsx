import React from 'react';
import '../stylesheets/WelcomePage.scss';
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