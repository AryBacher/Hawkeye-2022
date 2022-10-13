import React from 'react'
import '../stylesheets/HelpPageStylesheets/HelpPage.css';
import EndUseNavbar from '../components/EndUseNavbar';

function HelpPage() {
  return (
    <>
      <div className='wrapper-hp'>
        <EndUseNavbar
          grabarId = ''
          análisisId = ''
          ayudaId = 'ayuda'
        />
        <div className='header'>
          <h1>
            FAQs (Preguntas Frecuentes)
          </h1>
          <p>Las respuestas y hasta tutoriales para las dudas más comunes de nuestros usuarios.</p>
        </div>
      </div>
    </>
  )
}

export default HelpPage;
