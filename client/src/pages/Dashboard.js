import React, { useState } from "react";
import Sidebar from "../components/Sidebar";
import Topbar from "../components/Topbar";
import CrudProduct from "../components/CrudProduct";
import "../styles/Dashboard.css";

function Dashboard() {
  const [activeSection, setActiveSection] = useState("inicio");

  // Estado central de productos
  const [products, setProducts] = useState([
    {
      name: "Rubor MSLMILE",
      price: "15,000 COP",
      description: "Rubor en tonos rosados con acabado natural.",
      images: ["/products/MLSMILE 0.jpeg"],
      category: "Novedades"
    },
    {
      name: "Hidratante con color",
      price: "10,000 COP",
      description: "Hidratante de labios con color.",
      images: ["/products/HIDRATANTE COLOR 0.jpeg"],
      category: "Maquillaje"
    },
    {
      name: "RITUAL SUPREMO DE LUNA",
      price: "100,000 COP",
      description: "Un kit diseñado para quienes desean vivir la belleza como un ritual completo",
      images: [
        "/products/KIT SUPREMO LUNA 0.jpeg",
        "/products/KIT SUPREMO LUNA 1.jpeg"
      ],
      category: "Kits"
    },
    {
      name: "Kit Bluepop",
      price: "62,000 COP",
      description: "Set azul con productos de skincare y maquillaje.",
      images: [
        "/products/KIT BIOAQUA ROSAS 0.jpeg",
        "/products/KIT BIOAQUA ROSAS 1.jpeg"
      ],
      category: "Skincare"
    },
  ]);

  // Funciones CRUD
  const handleCreate = (newProduct) => {
    setProducts([...products, newProduct]);
  };

  const handleUpdate = (updatedProduct) => {
    setProducts(products.map((p) =>
      p.name === updatedProduct.name ? updatedProduct : p
    ));
  };

  const handleDelete = (productToDelete) => {
    setProducts(products.filter((p) => p.name !== productToDelete.name));
  };

  return (
    <div className="dashboard-container">
      <Sidebar setActiveSection={setActiveSection} />
      <div className="dashboard-main">
        <Topbar />
        <div className="dashboard-content">
          {activeSection === "inicio" && (
            <>
              <h1>Bienvenida a Mystic Moon Makeup</h1>
              <p>Aquí podrás gestionar productos, categorías y más.</p>
            </>
          )}
          {activeSection === "productos" && (
            <CrudProduct
              products={products}
              onCreate={handleCreate}
              onUpdate={handleUpdate}
              onDelete={handleDelete}
            />
          )}
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
