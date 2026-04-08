import React from "react";
import "../styles/Topbar.css";
import { FaBell, FaUserCircle } from "react-icons/fa";

function Topbar() {
  return (
    <div className="topbar">
      <input type="text" placeholder="Buscar..." className="search-input" />
      <div className="topbar-icons">
        <FaBell className="icon bell" />
        <FaUserCircle className="icon user" />
      </div>
    </div>
  );
}

export default Topbar;
