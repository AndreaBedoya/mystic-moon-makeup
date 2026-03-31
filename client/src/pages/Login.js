import React from "react";
import "../styles/Login.css";

function Login() {
  return (
    <div className="login-container">
      <div className="login-left">
        <h2>Bienvenido a</h2>
        <h1>Mystic Moon Makeup</h1>
        <img src="/logo.png" alt="Mystic Moon Makeup" className="login-logo" />
      </div>
      <div className="login-right">
        <form className="login-form">
          <label>Correo electrónico</label>
          <input type="email" />

          <label>Contraseña</label>
          <input type="password" />

          <button type="submit">Iniciar sesión</button>

          <div className="login-links">
            <a href="#">¿Olvidaste tu contraseña?</a>
          </div>
        </form>
        <div className="register-box">
          <a href="/register">¿No tienes cuenta? Regístrate aquí</a>
        </div>
      </div>
    </div>
  );
}

export default Login;
