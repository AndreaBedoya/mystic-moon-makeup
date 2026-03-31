import React from 'react';
import '../styles/MenuBar.css';

function MenuBar({ setSelectedCategory }) {
  const categories = [
    "Todo",
    "Novedades",
    "Skincare",
    "Maquillaje",
    "Kits",
    "Promociones",
    "Cuidado facial",
    "Cuidado corporal",
    "Cuidado capilar"
  ];

  return (
    <nav className="menu-bar">
      {categories.map((cat, index) => (
        <button key={index} onClick={() => setSelectedCategory(cat)}>
          {cat}
        </button>
      ))}
    </nav>
  );
}

export default MenuBar;
