import React, { useState } from "react";
import axios from "axios";
import "../styles/ForgotPassword.css"

function ForgotPassword() {
  const [step, setStep] = useState(1); // controla el paso actual
  const [email, setEmail] = useState("");
  const [code, setCode] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [message, setMessage] = useState("");

  // Paso 1: enviar correo
  const handleSendCode = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("http://localhost:4000/forgot-password", { email });
      setMessage(res.data.message);
      setStep(2);
    } catch (err) {
      setMessage("Error al enviar el código.");
    }
  };

  // Paso 2: verificar código
  const handleVerifyCode = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("http://localhost:4000/verify-code", { email, code });
      setMessage(res.data.message);
      setStep(3);
    } catch (err) {
      setMessage("Código inválido o expirado.");
    }
  };

  // Paso 3: resetear contraseña
  const handleResetPassword = async (e) => {
    e.preventDefault();
    if (newPassword !== confirmPassword) {
      setMessage("Las contraseñas no coinciden.");
      return;
    }
    try {
      const res = await axios.post("http://localhost:4000/reset-password", {
        email,
        newPassword,
      });
      setMessage(res.data.message);
      setStep(1); // opcional: reinicia flujo
    } catch (err) {
      setMessage("Error al actualizar la contraseña.");
    }
  };

  return (
    <div className="forgot-container">
      <h2>Recuperar contraseña</h2>

      {step === 1 && (
        <form onSubmit={handleSendCode}>
          <label>Correo electrónico</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <button type="submit">Enviar código</button>
        </form>
      )}

      {step === 2 && (
        <form onSubmit={handleVerifyCode}>
          <label>Ingresa el código recibido</label>
          <input
            type="text"
            value={code}
            onChange={(e) => setCode(e.target.value)}
            required
          />
          <button type="submit">Verificar código</button>
        </form>
      )}

      {step === 3 && (
        <form onSubmit={handleResetPassword}>
          <label>Nueva contraseña</label>
          <input
            type="password"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            required
          />
          <label>Confirmar contraseña</label>
          <input
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
          />
          <button type="submit">Guardar contraseña</button>
        </form>
      )}

      {message && <p>{message}</p>}
    </div>
  );
}

export default ForgotPassword;
