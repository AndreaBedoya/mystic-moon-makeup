import React from "react";
import "../styles/EditProductList.css";

function EditProductList({ products = [], onSelect }) {
  return (
    <>
      <h2 className="crud-edit-title">Editar productos existentes</h2>
      <div className="crud-edit-box">
        <div className="crud-edit-grid">
          {Array.isArray(products) && products.length > 0 ? (
            products.map((p, i) => (
              <div key={i} className="crud-edit-card">
                {p.images && p.images.length > 0 && (
                  <img
                    src={p.images[0]}
                    alt={p.name}
                    className="crud-edit-img"
                  />
                )}
                <h4>{p.name}</h4>
                <p className="category">{p.category}</p>
                <button onClick={() => onSelect(p)}>Editar</button>
              </div>
            ))
          ) : (
            <p>No hay productos disponibles para editar.</p>
          )}
        </div>
      </div>
    </>
  );
}

export default EditProductList;
