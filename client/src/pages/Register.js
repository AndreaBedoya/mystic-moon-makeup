import React from "react";
import "../styles/Register.css";

function Register() {
  return (
    <div className="register-container">
      <div className="register-left">
        <img src="/logo.png" alt="Mystic Moon Makeup" className="register-logo" />
        <h2>Únete a</h2>
        <h1>Mystic Moon Makeup</h1>
      </div>
      <div className="register-right">
        <form className="register-form">
          <label>Correo electrónico</label>
          <input type="email" placeholder="Ingresa tu correo" />

          <label>Contraseña</label>
          <input type="password" placeholder="Crea tu contraseña" />

          <label>Confirmar contraseña</label>
          <input type="password" placeholder="Repite tu contraseña" />

          <button type="submit">Registrarse</button>

          <div className="register-links">
            <a href="/login">¿Ya tienes cuenta? Inicia sesión</a>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Register;
