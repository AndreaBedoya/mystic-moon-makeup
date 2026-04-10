import React, { useState } from "react";
import CreateProductForm from "./CreateProductForm";
import EditProductForm from "./EditProductForm";
import ReadProduct from "./ReadProduct"; // componente para ver productos
import EditProductList from "./EditProductList";
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
          <div className="crud-list">
            {Array.isArray(products) && products.length > 0 ? (
              products.map((p, i) => (
                <div key={i} className="crud-card-item">
                  {p.images && p.images.length > 0 && (
                    <img
                      src={p.images[0]}
                      alt={p.name}
                      className="crud-card-img"
                    />
                  )}
                  <h4>{p.name}</h4>
                  <p>{p.category}</p>
                  <button
                    style={{ backgroundColor: "#e74c3c" }}
                    onClick={() => onDelete(p)}
                  >
                    Eliminar
                  </button>
                </div>
              ))
            ) : (
              <p>No hay productos disponibles para eliminar.</p>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

export default CrudProduct;
