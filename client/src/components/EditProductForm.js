import React, { useState } from "react";
import "../styles/EditProductForm.css";

function EditProductForm({ product, onUpdate, onCancel }) {
  const [editedProduct, setEditedProduct] = useState({ ...product });

  const handleImageUpload = (e) => {
    const files = Array.from(e.target.files);
    if (files.length > 5) {
      alert("Solo puedes subir máximo 5 imágenes ❗");
      return;
    }
    setEditedProduct({ ...editedProduct, images: files });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!editedProduct.category) {
      alert("La categoría es obligatoria ❗");
      return;
    }
    onUpdate(editedProduct); // ahora actualiza estado local, luego será API call
    alert("Producto actualizado con éxito ✅");
    onCancel(); // volver a la lista
  };

  return (
    <form className="create-form" onSubmit={handleSubmit}>
      <h2 className="form-title">Editar producto</h2>

      <div>
        <label>Nombre del producto</label>
        <input
          value={editedProduct.name}
          onChange={(e) =>
            setEditedProduct({ ...editedProduct, name: e.target.value })
          }
        />
      </div>

      <div>
        <label>Precio</label>
        <input
          value={editedProduct.price}
          onChange={(e) =>
            setEditedProduct({ ...editedProduct, price: e.target.value })
          }
        />
      </div>

      <div className="description-field">
        <label>Descripción</label>
        <textarea
          value={editedProduct.description}
          onChange={(e) =>
            setEditedProduct({ ...editedProduct, description: e.target.value })
          }
        />
      </div>

      <div>
        <label>Subir imágenes (máx. 5)</label>
        <input
          type="file"
          multiple
          accept="image/*"
          onChange={handleImageUpload}
        />
      </div>

      <div>
        <label>Categoría *</label>
        <select
          value={editedProduct.category}
          onChange={(e) =>
            setEditedProduct({ ...editedProduct, category: e.target.value })
          }
          required
        >
          <option value="">Selecciona una categoría</option>
          <option value="Novedades">Novedades</option>
          <option value="Maquillaje">Maquillaje</option>
          <option value="Kits">Kits</option>
          <option value="Skincare">Skincare</option>
        </select>
      </div>

      <div className="form-buttons">
        <button type="button" className="btn-secondary" onClick={onCancel}>
          Cancelar
        </button>
        <button type="submit" className="btn-primary">
          Guardar cambios
        </button>
      </div>
    </form>
  );
}

export default EditProductForm;
