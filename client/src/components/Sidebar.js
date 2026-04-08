import React from "react";
import { FaHome, FaBoxOpen, FaList, FaClipboardList, FaUser, FaSignOutAlt } from "react-icons/fa";
import "../styles/Sidebar.css";

function Sidebar({ setActiveSection }) {
  return (
    <div className="sidebar">
      <h2 className="sidebar-title">Mystic Moon <strong>Makeup</strong></h2>
      
      <div className="sidebar-content">
        <ul className="sidebar-menu">
          <li><button onClick={() => setActiveSection("inicio")}><FaHome className="icon"/> Inicio</button></li>
          <li><button onClick={() => setActiveSection("productos")}><FaBoxOpen className="icon"/> Productos</button></li>
          <li><button onClick={() => setActiveSection("categorias")}><FaList className="icon"/> Categorías</button></li>
          <li><button onClick={() => setActiveSection("usuarios")}><FaClipboardList className="icon"/> Usuarios</button></li>
        </ul>

        <ul className="sidebar-bottom">
          <li><button onClick={() => setActiveSection("perfil")}><FaUser className="icon"/> Perfil</button></li>
          <li><button onClick={() => setActiveSection("salir")}><FaSignOutAlt className="icon"/> Salir</button></li>
        </ul>
      </div>
    </div>
  );
}

export default Sidebar;
