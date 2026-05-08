import React, { useState, useEffect } from "react";
import Swal from "sweetalert2";
import "../styles/CreateProductForm.css";

function CreateProductForm({ onCreate, onCancel }) {
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [description, setDescription] = useState("");
  const [images, setImages] = useState([]);
  const [category, setCategory] = useState("");
  const [categories, setCategories] = useState([]); // 🔹 categorías dinámicas

  // 🔹 Cargar categorías desde el backend
  useEffect(() => {
    fetch("http://localhost:4000/api/categories")
      .then(res => res.json())
      .then(data => setCategories(data))
      .catch(err => console.error("Error cargando categorías", err));
  }, []);

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
    setImages(files);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!category) {
      Swal.fire({
        title: "Categoría obligatoria ❗",
        text: "Debes seleccionar una categoría antes de crear el producto.",
        icon: "warning",
        confirmButtonColor: "#3085d6",
      });
      return;
    }

    // ✅ Usar FormData para enviar texto + imágenes
    const formData = new FormData();
    formData.append("name", name);
    formData.append("price", price);
    formData.append("description", description);
    formData.append("category", category);
    images.forEach((img) => formData.append("images", img));

    // 🔹 Pasamos el FormData al Dashboard
    onCreate(formData);

    Swal.fire({
      title: "Producto creado ✅",
      text: `El producto "${name}" fue creado con éxito.`,
      icon: "success",
      confirmButtonColor: "#3085d6",
    });

    // limpiar formulario
    setName("");
    setPrice("");
    setDescription("");
    setImages([]);
    setCategory("");
  };

  return (
    <form className="create-form" onSubmit={handleSubmit}>
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
          {categories.map(cat => (
            <option key={cat.id} value={cat.name}>
              {cat.name}
            </option>
          ))}
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
