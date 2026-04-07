import React from "react";
import "../styles/EditProduct.css";

function EditProduct() {
  return (
    <div className="edit-container">
      <div className="edit-left">
        <h2>Editar producto</h2>
        <img src="/product-placeholder.png" alt="Producto" className="edit-image" />
      </div>
      <div className="edit-right">
        <form className="edit-form">
          <label>Nombre del producto</label>
          <input type="text" placeholder="Ingresa el nombre" />

          <label>Descripción</label>
          <textarea placeholder="Ingresa la descripción"></textarea>

          <label>Precio</label>
          <input type="number" placeholder="Ingresa el precio" />

          <label>Imagen del producto</label>
          <input type="file" />

          <button type="submit">Guardar cambios</button>
        </form>
      </div>
    </div>
  );
}

export default EditProduct;
