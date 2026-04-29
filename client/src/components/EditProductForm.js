import React, { useState } from "react";
import Swal from "sweetalert2";
import "../styles/EditProductForm.css";

function EditProductForm({ product, onUpdate, onCancel }) {
  const [editedProduct, setEditedProduct] = useState({ ...product });

  const handleImageUpload = (e) => {
    const files = Array.from(e.target.files);
    if (files.length > 5) {
      Swal.fire({
        title: "Límite de imágenes ❗",
        text: "Solo puedes subir máximo 5 imágenes.",
        icon: "warning",
        confirmButtonColor: "#3085d6",
      });
      return;
    }
    setEditedProduct({ ...editedProduct, images: files });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!editedProduct.category) {
      Swal.fire({
        title: "Categoría obligatoria ❗",
        text: "Debes seleccionar una categoría antes de guardar cambios.",
        icon: "warning",
        confirmButtonColor: "#3085d6",
      });
      return;
    }

    try {
      // Usamos FormData porque el backend espera imágenes con multer
      const formData = new FormData();
      formData.append("name", editedProduct.name);
      formData.append("price", editedProduct.price);
      formData.append("description", editedProduct.description);
      formData.append("category", editedProduct.category);

      if (editedProduct.images && editedProduct.images.length > 0) {
        editedProduct.images.forEach((file) => {
          formData.append("images", file);
        });
      }

      const res = await fetch(`http://localhost:4000/api/products/${editedProduct.id}`, {
        method: "PUT",
        body: formData,
      });

      if (!res.ok) {
        throw new Error("Error al actualizar producto");
      }

      const updated = await res.json();
      onUpdate(updated); // actualiza estado en el padre con el producto real de la BD

      Swal.fire({
        title: "Producto actualizado ✅",
        text: `El producto "${editedProduct.name}" fue actualizado con éxito.`,
        icon: "success",
        confirmButtonColor: "#3085d6",
      });

      onCancel(); // volver a la lista
    } catch (error) {
      console.error(error);
      Swal.fire({
        title: "Error ❌",
        text: "Hubo un problema al actualizar el producto.",
        icon: "error",
        confirmButtonColor: "#3085d6",
      });
    }
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
          type="number"
          step="0.01"
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
