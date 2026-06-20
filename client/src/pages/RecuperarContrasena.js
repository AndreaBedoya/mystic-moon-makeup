import React, { useState } from "react";
import axios from "axios";
import "../styles/ForgotPassword.css";

function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Aquí deberías tener un endpoint en tu backend para enviar correo de recuperación
      const res = await axios.post("http://localhost:4000/api/forgot-password", { email });
      setMessage(res.data.message);
    } catch (err) {
      setMessage("Error al solicitar recuperación de contraseña");
    }
  };

  return (
    <div className="forgot-container">
      <h2>Recuperar contraseña</h2>
      <form onSubmit={handleSubmit}>
        <label>Correo electrónico</label>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <button type="submit">Enviar enlace de recuperación</button>
      </form>
      {message && <p>{message}</p>}
    </div>
  );
}

export default ForgotPassword;
