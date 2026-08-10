import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { FaEnvelope, FaLock } from "react-icons/fa";
import "../styles/Login.css";

function Login({ onLogin }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("http://localhost:4000/api/login", {
        email,
        password,
      });

      const user = res.data.user;
      onLogin(user);

      if (user.role === "admin") {
        navigate("/dashboard");
      } else {
        alert("Acceso denegado. Solo administradores pueden entrar.");
      }
    } catch (err) {
      alert("Credenciales incorrectas o error en el servidor");
    }
  };

  return (
    <div className="login-container">
      <div className="login-left">
        <h2>Bienvenido a</h2>
        <img src="/logol.png" alt="Mystic Moon Makeup" className="login-logo" />
        <img
          src="/mystic moon.png"
          alt="Mystic Moon Makeup"
          className="login-nombre"
        />
      </div>
      <div className="login-right">
        <form className="login-form" autoComplete="off" onSubmit={handleSubmit}>
          <h3>Hola de nuevo</h3>
          <p>Inicia sesión para gestionar tu tienda</p>

          {/* Campo email con icono */}
          <label>Correo electrónico</label>
          <div className="input-wrapper">
            <FaEnvelope className="input-icon" />
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="tu@email.com"
              autoComplete="off"
            />
          </div>

          {/* Campo contraseña con icono y enlace */}
          <div className="password-label-row">
            <label>Contraseña</label>
            <a href="/RecuperarContrasena" className="forgot-link">
              ¿Olvidaste tu contraseña?
            </a>
          </div>
          <div className="input-wrapper">
            <FaLock className="input-icon" />
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              autoComplete="off"
            />
          </div>

          <button type="submit">Iniciar sesión</button>

          <div className="Contenedor-decoracion">
            <img
              src="/images/Decoracion luna.png"
              alt="Decoración lunar"
              className="decorationL"
            />
          </div>

          {/* Nota informativa */}
          <div className="login-note">
            <p>
              El inicio de sesión está habilitado únicamente para{" "}
              <strong>administradores</strong>.
            </p>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Login;
