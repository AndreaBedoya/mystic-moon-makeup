import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
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

      // Validar rol y redirigir
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
        <form className="login-form" onSubmit={handleSubmit}>
          <h3>Hola de nuevo</h3>
          <p>Inicia sesión para gestionar tu tienda</p>
          <label>Correo electrónico</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <label>Contraseña</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <button type="submit">Iniciar sesión</button>
          <div className="Contenedor-decoracion">
            <img
            src="/images/Decoracion luna.png"
            alt="Decoración lunar"
            className="decorationL"
          />
          </div>
          

          <div className="login-links">
            <a href="/RecuperarContrasena">¿Olvidaste tu contraseña?</a>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Login;
