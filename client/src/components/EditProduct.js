import React from "react";
import "../styles/EditProduct.css";

function EditProduct() {
  return (
    <div className="edit-container">
      <h2 className="edit-title">Gestionar productos</h2>
      
      <div className="crud-options">
        <div className="crud-card">
          <h3>Crear producto</h3>
          <p>Agrega un nuevo producto al catálogo.</p>
        </div>
        
        <div className="crud-card">
          <h3>Ver productos</h3>
          <p>Consulta la lista de productos existentes.</p>
        </div>
        
        <div className="crud-card">
          <h3>Editar producto</h3>
          <p>Modifica la información de un producto.</p>
        </div>
        
        <div className="crud-card">
          <h3>Eliminar producto</h3>
          <p>Quita un producto del catálogo.</p>
        </div>
      </div>
    </div>
  );
}

export default EditProduct;
