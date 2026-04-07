import React from "react";
import { FaHome, FaBoxOpen, FaList, FaClipboardList, FaQuestionCircle, FaUser, FaSignOutAlt } from "react-icons/fa";
import "../styles/Sidebar.css";

function Sidebar() {
  return (
    <div className="sidebar">
      <h2 className="sidebar-title">Mystic Moon <strong>Makeup</strong></h2>
      
      <div className="sidebar-content">
        <ul className="sidebar-menu">
          <li><button><FaHome className="icon"/> Inicio</button></li>
          <li><button><FaBoxOpen className="icon"/> Productos</button></li>
          <li><button><FaList className="icon"/> Categorías</button></li>
          <li><button><FaClipboardList className="icon"/> Usuarios</button></li>
        </ul>

        {/* Bloque inferior */}
        <ul className="sidebar-bottom">
          <li><button><FaUser className="icon"/> Perfil</button></li>
          <li><button><FaSignOutAlt className="icon"/> Salir</button></li>
        </ul>
      </div>
    </div>
  );
}

export default Sidebar;
