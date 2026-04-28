import React, { useState, useEffect } from "react";
import Sidebar from "../components/Sidebar";
import Topbar from "../components/Topbar";
import CrudProduct from "../components/CrudProduct";
import "../styles/Dashboard.css";

function Dashboard() {
  const [activeSection, setActiveSection] = useState("menu");
  const [products, setProducts] = useState([]);

  // 🔹 Cargar productos desde el backend
  const fetchProducts = async () => {
    try {
      const res = await fetch("http://localhost:4000/api/products");
      const data = await res.json();
      setProducts(data);
    } catch (error) {
      console.error("Error al cargar productos", error);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  // 🔹 Crear producto (recibe FormData)
  const handleCreate = async (formData) => {
    try {
      await fetch("http://localhost:4000/api/products", {
        method: "POST",
        body: formData, // ✅ aquí usamos el FormData
      });
      await fetchProducts(); // refrescar lista
    } catch (error) {
      console.error("Error al crear producto", error);
    }
  };

  // 🔹 Editar producto
  const handleUpdate = async (updatedProduct) => {
    try {
      await fetch(`http://localhost:4000/api/products/${updatedProduct.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(updatedProduct),
      });
      await fetchProducts(); // refrescar lista
    } catch (error) {
      console.error("Error al actualizar producto", error);
    }
  };

  // 🔹 Eliminar producto
  const handleDelete = async (productToDelete) => {
    try {
      await fetch(`http://localhost:4000/api/products/${productToDelete.id}`, {
        method: "DELETE",
      });
      await fetchProducts(); // refrescar lista
    } catch (error) {
      console.error("Error al eliminar producto", error);
    }
  };

  return (
    <div className="dashboard-container">
      <Sidebar setActiveSection={setActiveSection} />
      <div className="dashboard-main">
        <Topbar />
        <div className="dashboard-content">
          {activeSection === "menu" && (
            <>
              <h1>Panel de administración</h1>
              <p>Gestiona productos, categorías y más.</p>
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
