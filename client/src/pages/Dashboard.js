import React, { useState, useEffect } from "react";
import Sidebar from "../components/Sidebar";
import Topbar from "../components/Topbar";
import CrudProduct from "../components/CrudProduct";
import "../styles/Dashboard.css";

function Dashboard() {
  const [activeSection, setActiveSection] = useState("inicio");

  // Estado central de productos
  const [products, setProducts] = useState([]);

  // 🔹 Cargar productos desde el backend
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await fetch("http://localhost:4000/api/products");
        const data = await res.json();
        setProducts(data);
      } catch (error) {
        console.error("Error al cargar productos", error);
      }
    };

    fetchProducts();
  }, []);

  // Funciones CRUD
  const handleCreate = (newProduct) => {
    setProducts([...products, newProduct]);
  };

  const handleUpdate = (updatedProduct) => {
    setProducts(products.map((p) =>
      p.id === updatedProduct.id ? updatedProduct : p
    ));
  };

  const handleDelete = (productToDelete) => {
    setProducts(products.filter((p) => p.id !== productToDelete.id));
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
