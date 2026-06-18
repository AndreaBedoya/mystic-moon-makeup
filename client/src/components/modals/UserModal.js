import React from "react";
import { IconPhone, IconMail, IconCalendar, IconX } from "@tabler/icons-react";
import "../../styles/UserModal.css";

function UserModal({ user, onClose }) {
  if (!user) return null;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-box" onClick={(e) => e.stopPropagation()}>
        <button className="close-button" onClick={onClose}>
          <IconX size={30} />
        </button>
        <h2 className="modal-title">Perfil del Usuario</h2>

        <div className="modal-content">
          {/* Columna izquierda */}
          <div className="modal-left">
            <div className="modal-left-img">
              {user.profile_picture && (
                <img
                  src={`http://localhost:4000/uploads/${user.profile_picture}`}
                  alt="Foto perfil"
                  className="modal-img"
                />
              )}
              <div className="info-item">
                <span>
                  <div className="info-left">{user.username}</div>
                </span>
              </div>

              <div className="info-item-rol">
                <span>
                  <div className="info-left">{user.role}</div>
                </span>
              </div>
            </div>
            <img
              src="/images/Decoracion luna.png"
              alt="Decoración lunar"
              className="moon-decoration"
            />

            <div className="info-item">
              <IconMail size={30} className="info-icon" />
              <span>
                <strong>Cédula</strong>
                <div className="info-left">{user.document_id}</div>
              </span>
            </div>

            <div className="info-item">
              <IconPhone size={30} className="info-icon" />
              <span>
                <strong>Teléfono</strong>
                <div className="info-left">{user.phone_number}</div>
              </span>
            </div>

            <div className="info-item">
              <IconCalendar className="info-icon" />
              <div className="info-text">
                <strong>Miembro desde</strong>
                <div className="info-left">
                  {new Date(user.created_at).toLocaleDateString("es-CO", {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })}
                </div>
              </div>
            </div>
          </div>

          {/* Columna derecha */}
          <div className="modal-right">
            <h2 className="info-title">Información personal</h2>
            <div className="info-field">
              <label>Nombre de usuario</label>
              <div className="info-value">{user.username}</div>
            </div>
            <div className="info-field">
              <label>Rol</label>
              <div className="info-value">{user.role}</div>
            </div>
            <div className="info-field">
              <label>Correo</label>
              <div className="info-value">{user.email}</div>
            </div>
            <div className="info-field">
              <label>Dirección</label>
              <div className="info-value">{user.address}</div>
            </div>
            <div className="info-field">
              <label>Fecha de nacimiento</label>
              <div className="info-value">
                {new Date(user.birthdate).toLocaleDateString("es-CO", {
                  year: "numeric",
                  month: "numeric",
                  day: "numeric",
                })}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default UserModal;
