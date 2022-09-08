import React from 'react'
import '../stylesheets/NavbarStylesheets/Navbar.css'

function Navbar() {
  return (
    <>
      <nav className='navbar'>
        <div className='logo-set'>Logo</div>
        <ul className='links-navbar'>
          <li className='home-link'>Home</li>
          <li className='analysis-link'>Análisis</li>
          <li className='record-link'>Grabar</li>
          <li className='help-link'>Ayuda</li>
        </ul>
        <div className='profile-container-button'>Perfil</div>
      </nav>
    </>
  )
}

export default Navbar;