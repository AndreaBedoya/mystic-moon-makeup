import React, { useState } from "react";
import {FaIdCard, FaEnvelope, FaPhone, FaCalendar, FaLock,} from "react-icons/fa";
import "../styles/Perfil.css";

function Perfil({ user }) {
  const [formData, setFormData] = useState({
    nombreCompleto: user.full_name || "",
    username: user.username || "",
    email: user.email || "",
    telefono: user.phone_number || "",
    birthdate: user.birthdate || "",
    password: "",
    confirmPassword: "",
    document_id: user.document_id || "", // ✅ añadimos la cédula
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Datos actualizados:", formData);
  };

  return (
    <div className="perfil-container">
      {/* Columna izquierda */}
      <div className="perfil-left">
        <div className="perfil-left-img">
          {user.profile_picture && (
            <img
              src={`http://localhost:4000/uploads/${user.profile_picture}`}
              alt="Foto perfil"
              className="perfil-img"
            />
          )}
          <div className="perfil-info-username">
            <span className="info-left">@{formData.username}</span>
          </div>
          <div className="perfil-info-rol">
            <span className="info-left">{user.role}</span>
          </div>
        </div>

        <img
          src="/images/Decoracion luna.png"
          alt="Decoración lunar"
          className="moon-decoration"
        />

        {/* Bloque de cédula */}
        <div className="perfil-info">
          <FaIdCard className="perfil-icon" />
          <span>
            <strong>Cédula</strong>
            <div className="info-left">{formData.document_id}</div>
          </span>
        </div>

        <div className="perfil-info">
          <FaPhone className="perfil-icon" />
          <span>
            <strong>Teléfono</strong>
            <div className="info-left">{formData.telefono}</div>
          </span>
        </div>

        <div className="perfil-info">
          <FaCalendar className="perfil-icon" />
          <span>
            <strong>Miembro desde</strong>
            <div className="info-left">
              {new Date(user.created_at).toLocaleDateString("es-CO", {
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
            </div>
          </span>
        </div>
      </div>

      {/* Columna derecha */}
      <div className="perfil-right">
        <h2 className="perfil-title">Información personal</h2>
        <form onSubmit={handleSubmit}>
          <div className="perfil-field">
            <label>Nombre completo</label>
            <input
              type="text"
              name="nombreCompleto"
              value={formData.nombreCompleto}
              onChange={handleChange}
            />
          </div>
          {/* Correo en la columna derecha */}
          <div className="perfil-field">
            <label>Correo electrónico</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
            />
          </div>
          <div className="perfil-field">
            <label>Cédula</label>
            <input
              type="text"
              name="document_id"
              value={formData.document_id}
              onChange={handleChange}
            />
          </div>

          <div className="info-colum-perfil">
            <div className="perfil-field">
              <label>Teléfono</label>
              <input
                type="text"
                name="telefono"
                value={formData.telefono}
                onChange={handleChange}
              />
            </div>
            <div className="perfil-field">
              <label>Fecha de nacimiento</label>
              <input
                type="date"
                name="birthdate"
                value={formData.birthdate}
                onChange={handleChange}
              />
            </div>
          </div>

          <div className="info-colum-perfil">
            <div className="perfil-field">
              <label>Contraseña nueva</label>
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
              />
            </div>
            <div className="perfil-field">
              <label>Confirmar contraseña</label>
              <input
                type="password"
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChange}
              />
            </div>
          </div>

          <div className="perfil-actions">
            <button type="button" className="btn-cancel">
              Cancelar
            </button>
            <button type="submit" className="btn-save">
              Guardar cambios
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Perfil;
