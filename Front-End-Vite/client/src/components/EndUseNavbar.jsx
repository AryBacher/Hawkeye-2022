import React from 'react';
import  LogoSmall from './LogoSmall';
import '../stylesheets/EndUseNavbarStylesheets/EndUseNavbar.css';

function EndUseNavbar() {
  return (
    <nav className='enduse-nav'>
      <LogoSmall/>
      <ul>
        <li>
          <a href="/Record">Grabar</a>
        </li>
        <li>
          <a href="/Analysis">Análisis</a>
        </li>
        <li>
          <a href="Help">Ayuda</a>
        </li>
      </ul>

      <div className='profile-container'>
        <div className='profile-picture'></div>
        <p id='profile-name'>Arotu</p>
      </div>
    </nav>
  )
}

export default EndUseNavbar;