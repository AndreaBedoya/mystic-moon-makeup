import React, { useState } from "react";
import CreateProductForm from "./CreateProductForm"; // componente para crear productos
import EditProductForm from "./EditProductForm"; // formulario para editar productos
import ReadProduct from "./ReadProduct"; // componente para ver productos
import EditProductList from "./EditProductList"; // lista para ver productos
import DeleteProductList from "./DeleteProductList"; // componente para eliminar

import "../styles/CrudProduct.css";

function CrudProduct({ products = [], onCreate, onUpdate, onDelete }) {
  const [activeCrud, setActiveCrud] = useState("menu");
  const [selectedProduct, setSelectedProduct] = useState(null);

  return (
    <div className="edit-container">
      {activeCrud === "menu" && (
        <>
          <h2 className="edit-title">Gestionar productos</h2>
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
        </>
      )}

      <div className="crud-content">
        {/* Crear producto */}
        {activeCrud === "crear" && (
          <CreateProductForm
            onCreate={(newProduct) => {
              onCreate(newProduct);
              setActiveCrud("menu");
            }}
            onCancel={() => setActiveCrud("menu")}
          />
        )}

        {/* Ver productos */}
        {activeCrud === "ver" && <ReadProduct products={products} />}

        {/* Editar productos */}
        {activeCrud === "editar" && !selectedProduct && (
          <EditProductList
            products={products}
            onSelect={(p) => setSelectedProduct(p)}
          />
        )}


        {activeCrud === "editar" && selectedProduct && (
          <EditProductForm
            product={selectedProduct}
            onUpdate={(updated) => {
              onUpdate(updated);
              setSelectedProduct(null);
              setActiveCrud("menu");
            }}
            onCancel={() => {
              setSelectedProduct(null);
              setActiveCrud("menu");
            }}
          />
        )}

        {/* Eliminar productos */}
        {activeCrud === "eliminar" && (
          <DeleteProductList
            products={products}
            onDelete={(p) => {
              onDelete(p);
              setActiveCrud("menu"); // volver al menú después de eliminar
            }}
          />
        )}

      </div>
    </div>
  );
}

export default CrudProduct;
