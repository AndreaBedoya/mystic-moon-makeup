import React, { useState } from "react";
import "../styles/CreateProductForm.css";

function CreateProductForm({ onCreate, onCancel }) {
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [description, setDescription] = useState("");
  const [images, setImages] = useState([]);
  const [category, setCategory] = useState("");

  const handleImageUpload = (e) => {
    const files = Array.from(e.target.files);
    if (files.length > 5) {
      alert("Solo puedes subir máximo 5 imágenes ❗");
      return;
    }
    setImages(files);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!category) {
      alert("La categoría es obligatoria ❗");
      return;
    }

    // ✅ Usar FormData para enviar texto + imágenes
    const formData = new FormData();
    formData.append("name", name);
    formData.append("price", price);
    formData.append("description", description);
    formData.append("category", category);
    images.forEach((img) => formData.append("images", img));

    try {
      const res = await fetch("http://localhost:4000/api/products", {
        method: "POST",
        body: formData, // no se usa headers aquí, FormData lo maneja
      });

      if (!res.ok) {
        throw new Error("Error al crear producto");
      }

      const data = await res.json();
      onCreate(data); // actualiza el estado en CrudProduct o Home
      alert("Producto creado con éxito ✅");

      // limpiar formulario
      setName("");
      setPrice("");
      setDescription("");
      setImages([]);
      setCategory("");
    } catch (error) {
      console.error(error);
      alert("Hubo un problema al crear el producto ❌");
    }
  };

  return (
    <form className="create-form" onSubmit={handleSubmit}>
      {/* Título del formulario */}
      <h2 className="form-title">Crea un nuevo producto</h2>

      <div>
        <label>Nombre del producto</label>
        <input value={name} onChange={(e) => setName(e.target.value)} />
      </div>

      <div>
        <label>Precio</label>
        <input value={price} onChange={(e) => setPrice(e.target.value)} />
      </div>

      <div className="description-field">
        <label>Descripción</label>
        <textarea value={description} onChange={(e) => setDescription(e.target.value)} />
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
        <select value={category} onChange={(e) => setCategory(e.target.value)} required>
          <option value="">Selecciona una categoría</option>
          <option value="Novedades">Novedades</option>
          <option value="Maquillaje">Maquillaje</option>
          <option value="Kits">Kits</option>
          <option value="Skincare">Skincare</option>
        </select>
      </div>

      <div className="form-buttons">
        <button type="button" className="btn-secondary" onClick={onCancel}>Cancelar</button>
        <button type="submit" className="btn-primary">Crear producto</button>
      </div>
    </form>
  );
}

export default CreateProductForm;
