import React from "react";
import Swal from "sweetalert2";
import "../styles/DeleteProductList.css";

function DeleteProductList({ products = [], onDelete }) {
  const handleDelete = (product) => {
    Swal.fire({
      title: "¿Estás segura?",
      text: `El producto "${product.name}" se eliminará permanentemente`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6", // azul
      cancelButtonColor: "#d33",     // rojo
      confirmButtonText: "Sí, eliminar",
      cancelButtonText: "Cancelar"
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          // 🔹 Llamada al backend para eliminar
          await fetch(`http://localhost:4000/api/products/${product.id}`, {
            method: "DELETE",
          });

          // 🔹 Actualizar estado en el Dashboard
          onDelete(product);

          // 🔹 Mostrar alerta de éxito
          Swal.fire({
            title: "Eliminado",
            text: "El producto fue eliminado con éxito",
            icon: "success",
            confirmButtonColor: "#3085d6",
          });
        } catch (error) {
          console.error("Error al eliminar producto", error);
          Swal.fire({
            title: "Error",
            text: "Hubo un problema al eliminar el producto ❌",
            icon: "error",
            confirmButtonColor: "#3085d6",
          });
        }
      }
    });
  };

  return (
    <>
      <h2 className="crud-delete-title">Eliminar productos existentes</h2>
      <div className="crud-delete-box">
        <div className="crud-delete-grid">
          {Array.isArray(products) && products.length > 0 ? (
            products.map((p, i) => (
              <div key={i} className="crud-delete-card">
                {p.images && p.images.length > 0 && (
                  <img
                    src={`http://localhost:4000${p.images[0]}`}
                    alt={p.name}
                    className="crud-delete-img"
                  />
                )}
                <h4>{p.name}</h4>
                <p className="category">{p.category}</p>
                <button
                  className="btn-delete"
                  onClick={() => handleDelete(p)}
                >
                  Eliminar
                </button>
              </div>
            ))
          ) : (
            <p>No hay productos disponibles para eliminar.</p>
          )}
        </div>
      </div>
    </>
  );
}

export default DeleteProductList;
