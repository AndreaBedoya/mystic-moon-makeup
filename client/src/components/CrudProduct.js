import React, { useState } from "react";
import CreateProductForm from "./CreateProductForm"; 
import EditProductForm from "./EditProductForm"; 
import ReadProduct from "./ReadProduct"; 
import EditProductList from "./EditProductList"; 
import DeleteProductList from "./DeleteProductList"; 

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
            onCreate={async (newProduct) => {
              // 🔹 Solo llamamos a onCreate del Dashboard
              await onCreate(newProduct);
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
            onUpdate={async (updated) => {
              await onUpdate(updated);
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
            onDelete={async (p) => {
              await onDelete(p);
              setActiveCrud("menu"); 
            }}
          />
        )}
      </div>
    </div>
  );
}

export default CrudProduct;
