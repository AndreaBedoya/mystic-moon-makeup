import React, { useState } from 'react';
import '../styles/Home.css';
import Navbar from '../components/Navbar';
import MenuBar from '../components/MenuBar';
import ProductCard from '../components/ProductCard';

function Home() {
  const [selectedCategory, setSelectedCategory] = useState("Todo");

  const products = [
    {
      name: "Rubor MSLMILE",
      price: "15,000 COP",
      description: "Rubor en tonos rosados con acabado natural.",
      images: [
        "/products/MLSMILE 0.jpeg",
        "/products/MLSMILE 1.jpeg",
        "/products/MLSMILE 2.jpeg",
        "/products/MLSMILE 3.jpeg",
        "/products/MLSMILE 4.jpeg"
      ],
      category: "Novedades"
    },
    {
      name: "Hidrantante con color",
      price: "10,000 COP",
      description: "Hidratante de labios con color.",
      images: [
        "/products/HIDRATANTE COLOR 0.jpeg",
        "/products/HIDRATANTE COLOR 1.jpeg",
        "/products/HIDRATANTE COLOR 2.jpeg"
      ],
      category: "Maquillaje"
    },
    {
      name: "RITUAL SUPREMO DE LUNA",
      price: "100,000 COP",
      description: "Un kit diseñado para quienes desean vivir la belleza como un ritual completo",
      images: [
        "/products/KIT SUPREMO LUNA 0.jpeg",
        "/products/KIT SUPREMO LUNA 1.jpeg"
      ],
      category: "Kits"
    },
    {
      name: "Kit Bluepop",
      price: "62,000 COP",
      description: "Set azul con productos de skincare y maquillaje.",
      images: [
        "/products/KIT BIOAQUA ROSAS 0.jpeg",
        "/products/KIT BIOAQUA ROSAS 1.jpeg"
      ],
      category: "Skincare"
    },
  ];

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
