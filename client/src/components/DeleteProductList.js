import React from "react";
import "../styles/DeleteProductList.css";

function DeleteProductList({ products = [], onDelete }) {
  const handleDelete = (product) => {
    // Confirmación antes de eliminar
    const confirm = window.confirm(`¿Seguro que quieres eliminar "${product.name}"?`);
    if (confirm) {
      onDelete(product);
    }
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
