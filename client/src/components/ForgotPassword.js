import React, { useState } from "react";
import axios from "axios";
import { IconMailForward, IconLock, IconKey } from "@tabler/icons-react";
import "../styles/ForgotPassword.css";

function ForgotPassword() {
  const [step, setStep] = useState(1);
  const [email, setEmail] = useState("");
  const [code, setCode] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [message, setMessage] = useState("");

  const handleSendCode = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(
        "http://localhost:4000/api/forgot-password",
        { email },
      );
      setMessage(res.data.message);
      setStep(2);
    } catch {
      setMessage("Error al enviar el código.");
    }
  };

  const handleVerifyCode = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("http://localhost:4000/api/verify-code", {
        email,
        code,
      });
      setMessage(res.data.message);
      setStep(3);
    } catch {
      setMessage("Código inválido o expirado.");
    }
  };

  const handleResetPassword = async (e) => {
    e.preventDefault();
    if (newPassword !== confirmPassword) {
      setMessage("Las contraseñas no coinciden.");
      return;
    }
    try {
      const res = await axios.post("http://localhost:4000/api/reset-password", {
        email,
        newPassword,
      });
      setMessage(res.data.message);
      setStep(1);
    } catch {
      setMessage("Error al actualizar la contraseña.");
    }
  };

  return (
    <div className="forgot-wrapper">
      {/* Columna izquierda */}
      <div className="forgot-left">
        <div className="Contenedor-Contrasena">
          <img
            src="/logoHD.png"
            alt="Mystic Moon Makeup"
            className="contrasena-logo"
          />
        </div>
      </div>

      {/* Columna derecha */}
      <div className="forgot-right">
        <h1>Recuperar contraseña</h1>
        <p>Sigue los siguientes pasos para restablecer tu contraseña.</p>

        {/* Barra de progreso */}
        <div className="barra-contrasena" style={{ "--step": step }}>
          <div
            className={`barra-contrasena-step ${step >= 1 ? "contrasena-active" : ""}`}
          >
            1
          </div>
          <div
            className={`barra-contrasena-step ${step >= 2 ? "contrasena-active" : ""}`}
          >
            2
          </div>
          <div
            className={`barra-contrasena-step ${step >= 3 ? "contrasena-active" : ""}`}
          >
            3
          </div>
        </div>

        {/* Pasos */}
        <div className="steps-row">
          {/* Paso 1 */}
          <form
            onSubmit={handleSendCode}
            className={`step-box ${step === 1 ? "step-active" : ""}`}
          >
            <IconMailForward className="Contrasena-icon" />
            <h2>Paso 1</h2>
            <h3>Ingresa tu correo</h3>
            <p>
              Ingresa el correo electrónico asociado a tu cuenta y te enviaremos
              un código de verificación.
            </p>
            <label>Correo electrónico</label>
            <input
              type="email"
              placeholder="tu@email.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              disabled={step !== 1}
            />
            <button type="submit" disabled={step !== 1}>
              Enviar código
            </button>
          </form>

          {/* Paso 2 */}
          <form
            onSubmit={handleVerifyCode}
            className={`step-box ${step === 2 ? "step-active" : ""}`}
          >
            <IconLock className="Contrasena-icon" />
            <h2>Paso 2</h2>
            <h3>Ingresa el código</h3>
            <p>Hemos enviado un código de 6 dígitos a tu correo electrónico.</p>
            <label>Código de verificación</label>
            <input
              type="text"
              value={code}
              onChange={(e) => setCode(e.target.value)}
              required
              disabled={step !== 2}
            />
            <button type="submit" disabled={step !== 2}>
              Verificar código
            </button>
          </form>

          {/* Paso 3 */}
          <form
            onSubmit={handleResetPassword}
            className={`step-box ${step === 3 ? "step-active" : ""}`}
          >
            <IconKey className="Contrasena-icon" />
            <h2>Paso 3</h2>
            <h3>Crea tu nueva contraseña</h3>
            <p>Ingresa tu nueva contraseña y confírmala para restablecerla.</p>
            <label>Nueva contraseña</label>
            <input
              type="password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              required
              disabled={step !== 3}
            />
            <label>Confirmar contraseña</label>
            <input
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
              disabled={step !== 3}
            />
            <button type="submit" disabled={step !== 3}>
              Restablecer contraseña
            </button>
          </form>
        </div>

        {message && <p className="message">{message}</p>}
      </div>
    </div>
  );
}

export default ForgotPassword;
