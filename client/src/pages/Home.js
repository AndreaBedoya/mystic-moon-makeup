import React, { useState, useEffect } from 'react';
import '../styles/Home.css';
import Navbar from '../components/Navbar';
import MenuBar from '../components/MenuBar';
import ProductCard from '../components/ProductCard';

function Home() {
  const [selectedCategory, setSelectedCategory] = useState("Todo");
  const [products, setProducts] = useState([]);

  // 🚀 Traer productos del backend al cargar el Home
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

  // Filtrar por categoría
  const filteredProducts = selectedCategory === "Todo"
    ? products
    : products.filter(p => p.category === selectedCategory);

  return (
    <div className="home">
      <Navbar />
      <MenuBar setSelectedCategory={setSelectedCategory} />
      <main className="catalogo">
        <h2>Catálogo de productos</h2>
        <div className="grid">
          {filteredProducts.map((product, index) => (
            <ProductCard
              key={index}
              name={product.name}
              price={product.price}
              description={product.description}
              images={product.images}
              category={product.category}
            />
          ))}
        </div>
      </main>
      <footer className="footer">
        <p>© 2026 Mystic Moon Makeup 🌙</p>
      </footer>
    </div>
  );
}

export default Home;
