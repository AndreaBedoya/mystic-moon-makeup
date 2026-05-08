import React, { useState, useEffect } from "react";
import Swal from "sweetalert2";
import "../../styles/ModalCategoryEdit.css";

function ModalCategoryEdit({ category, onConfirm, onCancel }) {
  const [name, setName] = useState(category.name || "");
  const [image, setImage] = useState(null);

  useEffect(() => {
    setName(category.name || "");
  }, [category]);

  const handleSubmit = () => {
    if (!name.trim()) {
      Swal.fire("Atención", "El nombre no puede estar vacío", "warning");
      return;
    }

    // ✅ Enviar objeto con nombre e imagen al padre
    onConfirm({ id: category.id, name, image });

    // ✅ Mostrar alerta de éxito
    Swal.fire("Éxito", "La categoría fue editada con éxito", "success");
  };

  return (
    <div className="modal-overlay">
      <div className="modal">
        <h3>Editar categoría</h3>
        <input
          type="text"
          placeholder="Nombre de la categoría"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <input
          type="file"
          accept="image/*"
          onChange={(e) => setImage(e.target.files[0])}
        />
        <div className="modal-actions">
          <button onClick={handleSubmit} className="edit-btn">Guardar</button>
          <button onClick={onCancel} className="cancel-btn">Cancelar</button>
        </div>
      </div>
    </div>
  );
}

export default ModalCategoryEdit;
