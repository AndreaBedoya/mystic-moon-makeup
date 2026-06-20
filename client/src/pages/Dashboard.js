import React, { useState, useEffect } from "react";
import Sidebar from "../components/Sidebar";
import Topbar from "../components/Topbar";
import CrudProduct from "../components/CrudProduct";
import Categories from "../components/Categories";
import UsersList from "../components/UsersList";
import "../styles/Dashboard.css";

function Dashboard({ user }) {
  const [activeSection, setActiveSection] = useState("menu");
  const [products, setProducts] = useState([]);

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

  const handleCreate = async (formData) => {
    try {
      await fetch("http://localhost:4000/api/products", {
        method: "POST",
        body: formData,
      });
      await fetchProducts();
    } catch (error) {
      console.error("Error al crear producto", error);
    }
  };

  const handleUpdate = async (updatedProduct) => {
    try {
      await fetch(`http://localhost:4000/api/products/${updatedProduct.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(updatedProduct),
      });
      await fetchProducts();
    } catch (error) {
      console.error("Error al actualizar producto", error);
    }
  };

  const handleDelete = async (productToDelete) => {
    try {
      await fetch(`http://localhost:4000/api/products/${productToDelete.id}`, {
        method: "DELETE",
      });
      await fetchProducts();
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
            <div className="dashboard-banner">
              <h1>Hola {user?.username} </h1>
              <p>Gestiona tu tienda y descubre el poder de tu marca.</p>
            </div>
          )}
          {activeSection === "productos" && (
            <CrudProduct
              products={products}
              onCreate={handleCreate}
              onUpdate={handleUpdate}
              onDelete={handleDelete}
            />
          )}
          {activeSection === "categorias" && <Categories />}
          {activeSection === "usuarios" && <UsersList />}
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
