import React, { useState } from "react";
import Swal from "sweetalert2"; // ✅ Importa SweetAlert2
import "../../styles/ModalCategoryCreate.css";

function ModalCategoryCreate({ onConfirm, onCancel }) {
  const [name, setName] = useState("");

  const handleSubmit = () => {
    if (!name.trim()) {
      Swal.fire("Atención", "El nombre de la categoría no puede estar vacío", "warning");
      return;
    }

    onConfirm(name); // envía el nombre al padre
    setName("");

    // ✅ Mostrar alerta de éxito
    Swal.fire("Éxito", "La categoría fue enviada para creación", "success");
  };

  return (
    <div className="modal-overlay">
      <div className="modal">
        <h3>Crear nueva categoría</h3>
        <input
          type="text"
          placeholder="Nombre de la categoría"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <div className="modal-actions">
          <button onClick={handleSubmit}>Crear</button>
          <button onClick={onCancel}>Cancelar</button>
        </div>
      </div>
    </div>
  );
}

export default ModalCategoryCreate;
