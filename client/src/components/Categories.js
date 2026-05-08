import React, { useState, useEffect } from "react";
import ModalCategoryCreate from "../components/modals/ModalCategoryCreate";

function Categories() {
  const [categories, setCategories] = useState([]);
  const [showCreateModal, setShowCreateModal] = useState(false);

  useEffect(() => {
    fetch("http://localhost:4000/api/categories")
      .then(res => res.json())
      .then(data => setCategories(data))
      .catch(err => console.error("Error cargando categorías", err));
  }, []);

  const handleCreateCategory = async (name) => {
    const res = await fetch("http://localhost:4000/api/categories", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name })
    });
    const newCategory = await res.json();
    setCategories([...categories, newCategory]); // agrega al estado
    setShowCreateModal(false);
  };

  return (
    <div>
      <h2>Categorías</h2>
      <div className="categories-grid">
        {categories.map(cat => (
          <div key={cat.id} className="category-card">
            <p>{cat.name}</p>
            {/* Aquí irían los botones de editar y eliminar */}
          </div>
        ))}
      </div>

      <button onClick={() => setShowCreateModal(true)}>
        + Crear nueva categoría
      </button>

      {showCreateModal && (
        <ModalCategoryCreate
          onConfirm={handleCreateCategory}
          onCancel={() => setShowCreateModal(false)}
        />
      )}
    </div>
  );
}

export default Categories;
