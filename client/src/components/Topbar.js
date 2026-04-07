import React from "react";
import "../styles/Topbar.css";

function Topbar() {
  return (
    <div className="topbar">
      <input type="text" placeholder="Buscar..." className="search-input" />
      <div className="topbar-icons">
        <span className="bell">🔔</span>
      </div>
    </div>
  );
}

export default Topbar;
