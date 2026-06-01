import React, { useState } from "react";
import "../styles/UserForm.css";
import StepProgress from "./StepProgress";

function UserForm({ onSubmit, onCancel }) {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    role: "admin",
    profile_picture: null, // ✅ archivo
    document_id: "",
    phone_number: "",
    birthdate: "",
    address: "",
    status: "active",
  });

  const [step, setStep] = useState(1);
  const totalSteps = 3;

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e) => {
    setFormData({ ...formData, profile_picture: e.target.files[0] });
  };

  const nextStep = () => setStep(step + 1);
  const prevStep = () => setStep(step - 1);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formDataToSend = new FormData();
    Object.keys(formData).forEach((key) => {
      formDataToSend.append(key, formData[key]);
    });

    await onSubmit(formDataToSend);
  };

  return (
    <div className="form-container">
      <form className="create-form" onSubmit={handleSubmit}>
        <h2 className="form-title">Registrar nuevo usuario</h2>

        <div className="progress-wrapper">
          <StepProgress step={step} totalSteps={totalSteps} />
        </div>

        {step === 1 && (
          <>
            <div>
              <label>Nombre de usuario</label>
              <input
                name="username"
                value={formData.username}
                onChange={handleChange}
                required
              />
            </div>

            <div>
              <label>Correo</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </div>

            <div>
              <label>Contraseña</label>
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                required
              />
            </div>

            <div>
              <label>Rol</label>
              <select name="role" value={formData.role} onChange={handleChange}>
                <option value="admin">Admin</option>
                <option value="lector">Lector</option>
              </select>
            </div>
          </>
        )}

        {step === 2 && (
          <>
            <div>
              <label>Foto de perfil</label>
              <input
                type="file"
                name="profile_picture"
                accept="image/*"
                onChange={handleFileChange}
              />
            </div>

            <div>
              <label>Cédula</label>
              <input
                name="document_id"
                value={formData.document_id}
                onChange={handleChange}
              />
            </div>

            <div>
              <label>Teléfono</label>
              <input
                name="phone_number"
                value={formData.phone_number}
                onChange={handleChange}
              />
            </div>

            <div>
              <label>Dirección</label>
              <input
                name="address"
                value={formData.address}
                onChange={handleChange}
              />
            </div>
          </>
        )}

        {step === 3 && (
          <>
            <div>
              <label>Fecha de nacimiento</label>
              <input
                type="date"
                name="birthdate"
                value={formData.birthdate}
                onChange={handleChange}
              />
            </div>

            <div>
              <label>Estado</label>
              <select
                name="status"
                value={formData.status}
                onChange={handleChange}
              >
                <option value="active">Activo</option>
                <option value="inactive">Inactivo</option>
              </select>
            </div>
          </>
        )}

        <div className="form-buttons">
          {step === 1 && (
            <>
              <button type="button" className="btn-secondary" onClick={onCancel}>
                Cancelar
              </button>
              <button type="button" className="btn-primary" onClick={nextStep}>
                Siguiente
              </button>
            </>
          )}

          {step > 1 && step < totalSteps && (
            <>
              <button type="button" className="btn-secondary" onClick={prevStep}>
                Anterior
              </button>
              <button type="button" className="btn-primary" onClick={nextStep}>
                Siguiente
              </button>
            </>
          )}

          {step === totalSteps && (
            <>
              <button type="button" className="btn-secondary" onClick={prevStep}>
                Anterior
              </button>
              <button type="submit" className="btn-primary">Registrar</button>
            </>
          )}
        </div>
      </form>
    </div>
  );
}

export default UserForm;
