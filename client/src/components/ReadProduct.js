import React from "react";
import "../styles/ReadProduct.css";

function ReadProduct({ products = [] }) {
  return (
    <>
      <h2 className="crud-view-title">Productos existentes</h2>
      <div className="crud-view-box">
        <div className="crud-view-grid">
          {Array.isArray(products) && products.length > 0 ? (
            products.map((p) => (
              <div key={p.id} className="crud-view-card">
                {p.images && p.images.length > 0 && (
                  <img
                    src={`http://localhost:4000${p.images[0]}`}
                    alt={p.name}
                    className="crud-view-img"
                  />
                )}
                <h4>{p.name}</h4>
                <p className="price">{p.price}</p>
                <p className="desc">{p.description}</p>
                <p className="category">{p.category}</p>
              </div>
            ))
          ) : (
            <p>No hay productos disponibles.</p>
          )}
        </div>
      </div>
    </>
  );
}

export default ReadProduct;
