import React, { useState, useEffect } from 'react';
import '../styles/MenuBar.css';

function MenuBar({ setSelectedCategory }) {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    fetch("http://localhost:4000/api/categories")
      .then(res => res.json())
      .then(data => setCategories(data))
      .catch(err => console.error("Error cargando categorías", err));
  }, []);

  return (
    <nav className="menu-bar">
      {/* Siempre mostrar "Todo" */}
      <button onClick={() => setSelectedCategory("Todo")}>Todo</button>

      {/* Renderizar categorías dinámicas */}
      {categories.map(cat => (
        <button key={cat.id} onClick={() => setSelectedCategory(cat.name)}>
          {cat.name}
        </button>
      ))}
    </nav>
  );
}

export default MenuBar;
