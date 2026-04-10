import React, { useState } from "react";
import CreateProductForm from "./CreateProductForm";
import "../styles/EditProduct.css";

function EditProduct({ onCreate, products }) {
  const [activeCrud, setActiveCrud] = useState("menu");

  return (
    <div className="edit-container">
      {/* Mostrar título solo en el menú */}
      {activeCrud === "menu" && (
        <h2 className="edit-title">Gestionar productos</h2>
      )}

      {activeCrud === "menu" && (
        <div className="crud-options">
          <div className="crud-card" onClick={() => setActiveCrud("crear")}>
            <h3>Crear producto</h3>
          </div>
          <div className="crud-card" onClick={() => setActiveCrud("ver")}>
            <h3>Ver productos</h3>
          </div>
          <div className="crud-card" onClick={() => setActiveCrud("editar")}>
            <h3>Editar producto</h3>
          </div>
          <div className="crud-card" onClick={() => setActiveCrud("eliminar")}>
            <h3>Eliminar producto</h3>
          </div>
        </div>
      )}

      <div className="crud-content">
        {activeCrud === "crear" && (
          <CreateProductForm
            onCreate={(newProduct) => {
              onCreate(newProduct);
              setActiveCrud("menu");
            }}
            onCancel={() => setActiveCrud("menu")}
          />
        )}
        {activeCrud === "ver" && (
          <ul>
            {products.map((p, i) => (
              <li key={i}>{p.name} - {p.category}</li>
            ))}
          </ul>
        )}
        {activeCrud === "editar" && <p>Selecciona un producto para editar...</p>}
        {activeCrud === "eliminar" && <p>Selecciona un producto para eliminar...</p>}
      </div>
    </div>
  );
}

export default EditProduct;
