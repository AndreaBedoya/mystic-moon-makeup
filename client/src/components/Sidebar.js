import React from "react";
import { FaHome, FaBoxOpen, FaList, FaClipboardList, FaUser, FaSignOutAlt } from "react-icons/fa";
import "../styles/Sidebar.css";

function Sidebar({ setActiveSection, activeSection }) {
  return (
    <div className="sidebar">
      <div className="sidebar-header">
        <img src="/Logo Nuevo.png" alt="Mystic Moon Makeup Logo" className="sidebar-logo"/>
      </div>

      <div className="sidebar-content">
        {/* Menú principal */}
        <ul className="sidebar-menu">
          <li><button className={activeSection === "inicio" ? "active" : ""} onClick={() => setActiveSection("inicio")}><FaHome className="icon"/> Inicio</button></li>
          <li><button className={activeSection === "productos" ? "active" : ""} onClick={() => setActiveSection("productos")}><FaBoxOpen className="icon"/> Productos</button></li>
          <li><button className={activeSection === "categorias" ? "active" : ""} onClick={() => setActiveSection("categorias")}><FaList className="icon"/> Categorías</button></li>
          <li><button className={activeSection === "usuarios" ? "active" : ""} onClick={() => setActiveSection("usuarios")}><FaClipboardList className="icon"/> Usuarios</button></li>
        </ul>

        {/* Sección inferior */}
        <div>
          <div className="sidebar-divider"></div>

          {/* Tarjeta decorativa */}
          <div className="sidebar-card">
            <p>Tu magia comienza aquí.</p>
          </div>

          <ul className="sidebar-bottom">
            <li><button className={activeSection === "perfil" ? "active" : ""} onClick={() => setActiveSection("perfil")}><FaUser className="icon"/> Perfil</button></li>
            <li><button className={activeSection === "salir" ? "active" : ""} onClick={() => setActiveSection("salir")}><FaSignOutAlt className="icon"/> Salir</button></li>
          </ul>
        </div>
      </div>
    </div>
  );
}

export default Sidebar;
