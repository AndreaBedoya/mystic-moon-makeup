import React from "react";
import "../styles/Register.css";

function Register() {
  return (
    <div className="register-container">
      <div className="register-left">
        <h2>Únete a</h2>
        <h1>Mystic Moon Makeup</h1>
        <img src="/logo.png" alt="Mystic Moon Makeup" className="register-logo" />
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

        </form>

        {/* Bloque azul oscuro separado */}
        <div className="register-box">
          <a href="/login">¿Ya tienes cuenta? Inicia sesión</a>
        </div>
      </div>
    </div>
  );
}

export default Register;
