import React, { useState, useEffect } from "react";
import ModalCategoryCreate from "../components/modals/ModalCategoryCreate";
import ModalCategoryEdit from "../components/modals/ModalCategoryEdit";
import { IconEdit, IconTrash } from "@tabler/icons-react"; // ✅ íconos
import Swal from "sweetalert2"; // ✅ SweetAlert2
import "../styles/Categories.css";

function Categories() {
  const [categories, setCategories] = useState([]);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState(null);

  useEffect(() => {
    fetch("http://localhost:4000/api/categories")
      .then(res => res.json())
      .then(data => setCategories(data))
      .catch(err => console.error("Error cargando categorías", err));
  }, []);

  // 🔹 Crear categoría
  const handleCreateCategory = async ({ name, image }) => {
    const formData = new FormData();
    formData.append("name", name);
    formData.append("image", image);

    const res = await fetch("http://localhost:4000/api/categories", {
      method: "POST",
      body: formData
    });

    const newCategory = await res.json();
    setCategories([...categories, newCategory]);
    setShowCreateModal(false);
  };

  // 🔹 Editar categoría
  const handleEditCategory = async ({ id, name, image }) => {
    const formData = new FormData();
    formData.append("name", name);
    if (image) formData.append("image", image);

    const res = await fetch(`http://localhost:4000/api/categories/${id}`, {
      method: "PUT",
      body: formData
    });

    if (!res.ok) {
      Swal.fire("Error", "No se pudo editar la categoría", "error");
      return;
    }

    const updatedCategory = await res.json();
    setCategories(categories.map(cat => cat.id === id ? updatedCategory : cat));
    setShowEditModal(false);

    Swal.fire("Éxito", "La categoría fue editada con éxito", "success");
  };

  // 🔹 Eliminar categoría con confirmación
  const handleDeleteCategory = async (id) => {
    Swal.fire({
      title: "¿Seguro que quieres eliminar esta categoría?",
      text: "Esta acción no se puede deshacer",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#dc3545",
      cancelButtonColor: "#6c757d",
      confirmButtonText: "Sí, eliminar",
      cancelButtonText: "Cancelar"
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          const res = await fetch(`http://localhost:4000/api/categories/${id}`, {
            method: "DELETE"
          });

          if (!res.ok) throw new Error("Error al eliminar categoría");

          // Actualizar estado
          setCategories(categories.filter(cat => cat.id !== id));

          Swal.fire("Eliminada", "La categoría fue eliminada con éxito", "success");
        } catch (error) {
          Swal.fire("Error", "No se pudo eliminar la categoría", "error");
        }
      }
    });
  };

  return (
    <div className="categories">
      <h2 className="crud-view-title">Categorías</h2>
      <div className="crud-view-box">
        <div className="crud-view-grid">
          {categories.map(cat => (
            <div key={cat.id} className="crud-view-card">
              {cat.image_url && (
                <img
                  src={`http://localhost:4000${cat.image_url}`}
                  alt={cat.name}
                  className="crud-view-img"
                />
              )}
              <h4>{cat.name}</h4>
              <div className="crud-view-actions">
                <button
                  className="crud-btn delete-btn"
                  onClick={() => handleDeleteCategory(cat.id)}
                >
                  <IconTrash size={18} color="#fff" /> Eliminar
                </button>
                <button
                  className="crud-btn edit-btn"
                  onClick={() => {
                    setSelectedCategory(cat);
                    setShowEditModal(true);
                  }}
                >
                  <IconEdit size={18} /> Editar
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="create-category">
        <button onClick={() => setShowCreateModal(true)} className="create-btn">
          + Crear nueva categoría
        </button>
      </div>

      {showCreateModal && (
        <ModalCategoryCreate
          onConfirm={handleCreateCategory}
          onCancel={() => setShowCreateModal(false)}
        />
      )}

      {showEditModal && selectedCategory && (
        <ModalCategoryEdit
          category={selectedCategory}
          onConfirm={handleEditCategory}
          onCancel={() => setShowEditModal(false)}
        />
      )}
    </div>
  );
}

export default Categories;
