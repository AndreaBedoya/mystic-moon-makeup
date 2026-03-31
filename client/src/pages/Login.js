import React from "react";
import "../styles/Login.css";

function Login() {
  return (
    <div className="login-container">
      <div className="login-left">
        <img src="/logo.png" alt="Mystic Moon Makeup" className="login-logo" />
        <h2>Bienvenido a</h2>
        <h1>Mystic Moon Makeup</h1>
      </div>
      <div className="login-right">
        <form className="login-form">
          <label>Correo electrónico</label>
          <input type="email" placeholder="Ingresa tu correo" />

          <label>Contraseña</label>
          <input type="password" placeholder="Ingresa tu contraseña" />

          <button type="submit">Iniciar sesión</button>

          <div className="login-links">
            <a href="#">¿Olvidaste tu contraseña?</a>
            <a href="/register">¿No tienes cuenta? Regístrate aquí</a>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Login;
