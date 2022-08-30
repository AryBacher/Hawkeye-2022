import React from 'react';
import BtnContinue from '../components/BtnContinue';

function LandingPage() {
  return (
    <>
        <p>LandingPage</p>
        <BtnContinue
          routeName={"/SignUp"}
          textBtn={"Únete gratis"}
        />
    </>
  )
}

export default LandingPage;
