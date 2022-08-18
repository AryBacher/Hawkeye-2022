import React from 'react';

function LogInPage() {
  return (
    <div className="wrapper">
      <div className="left-side">
        <img
          src="#"
          alt="Aún no lo sé"
        />
      </div>
      <div className="right-side">
        <svg className="logo-icon"></svg>
        <h2 className="title">Iniciar sesión</h2>
        <form action="#" method="post">
          <label 
              for="username" 
            />
            <input 
              type="text"
              id="username" 
              name="username" 
              placeholder="Nombre de usuario" 
            />

            <label 
              for="password" 
            />
            <input 
              type="password" 
              id="password"
              name="password" 
              placeholder="Contraseña" 
            />
        </form>
      </div>
    </div>
  )
}

export default LogInPage;